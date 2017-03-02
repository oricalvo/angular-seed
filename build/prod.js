const shelljs = require("shelljs");
const path = require("path");
const fs = require("build-utils/fs");
const process = require("build-utils/process");

Promise.resolve()
    .then(()=> {
        console.log("Running AOT");
        return process.exec(path.resolve("node_modules/.bin/ngc") + " -p tsconfig-aot-phase1.json")
    })
    .then(()=> {
        console.log();
        console.log("Compiling typescript");
        return process.exec(path.resolve("node_modules/.bin/tsc") + " -p tsconfig-aot-phase2.json")
    })
    .then(()=> {
        console.log();
        console.log("Bundling");
        return process.exec(path.resolve("node_modules/.bin/webpack"))
    })
// .then(()=> {
//     console.log("Bundling");
//     return process.exec(path.resolve("node_modules/.bin/rollup") + " -c rollup.config.js")
// })
