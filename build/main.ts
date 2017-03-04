import * as cli from "build-utils/cli";
import * as path from "path";
import {deleteDirectory, appendFile} from "build-utils/fs";
import {exec} from "build-utils/process";
import {appRoutes} from "../app/routes";

cli.command("dev", dev);
cli.command("prod", prod);

cli.run();

export async function dev() {
    await exec("node_modules/.bin/tsc");
    await exec("node_modules/.bin/node-sass --recursive ./app --output ./app");
    await exec("node_modules/.bin/sjs");
}

export async function prod() {
    await deleteDirectory("./aot");
    await deleteDirectory("./dist");

    console.log();
    console.log("Running AOT");
    await exec("node_modules/.bin/ngc -p tsconfig-aot-phase1.json");

    console.log();
    console.log("Fix AOT factories");
    await fixAOT();

    console.log();
    console.log("Compiling typescript");
    await exec("node_modules/.bin/tsc -p tsconfig-aot-phase2.json");

    console.log();
    console.log("Bundling");
    await exec("node_modules/.bin/webpack");
}

function fixNgFactory(route) {
    const parts = route.loadChildren.split("#");
    const modulePath = parts[0];
    const moduleName = parts[1];

    console.log(modulePath, moduleName);

    const moduleFactoryPath = "./aot/phase1" + modulePath + ".ngfactory.ts";
    const moduleFactoryDirPath = path.dirname(moduleFactoryPath);
    const moduleLoaderPath = "./app/common/moduleLoader";
    const moduleFactoryPathRel = path.posix.relative(moduleFactoryDirPath, moduleLoaderPath);

    const template = `
            import {ModuleLoader} from "${moduleFactoryPathRel}";
            ModuleLoader.notifyLoaded("${moduleName}", ${moduleName}NgFactory);`;

    return appendFile(moduleFactoryPath, template);
}

async function fixAOT() {
    return Promise.all(appRoutes.map(route => fixNgFactory(route)));
}
