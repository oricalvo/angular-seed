import * as cli from "build-utils/cli";
import {deleteDirectory} from "build-utils/fs";
import {exec} from "build-utils/process";

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

    console.log("Running AOT");
    await exec("node_modules/.bin/ngc -p tsconfig-aot-phase1.json");

    console.log();
    console.log("Compiling typescript");
    await exec("node_modules/.bin/tsc -p tsconfig-aot-phase2.json");

    console.log();
    console.log("Bundling");
    await exec("node_modules/.bin/webpack");
}
