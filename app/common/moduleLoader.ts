import {Injectable, NgModuleFactory, SystemJsNgModuleLoader, Compiler} from "@angular/core";

@Injectable()
export class ModuleLoader extends SystemJsNgModuleLoader {
    constructor(private compiler: Compiler) {
        super(compiler);
    }

    load(path: string): Promise<NgModuleFactory<any>> {
        var offlineMode = this.compiler instanceof Compiler;
        if(!offlineMode) {
            return super.load(path);
        }

        let parts = path.split("#");
        let url = parts[0];
        let moduleName = parts[1];
        //return loadModule(moduleName);

        console.log("ModuleLoader.load: " + path);

        return new Promise((resolve, reject)=> {
            let parts = path.split("#");
            let url = parts[0];
            const ngModuleName = parts[1];

            if(offlineMode) {
                parts = url.split("/");
                if(parts[0]=="") {
                    parts.shift();
                }

                if (parts[0] == "app") {
                    parts.shift();
                }

                if(parts[parts.length-1]=="module") {
                    parts.pop();
                }

                url = "dist/" + parts.join(".") + ".bundle.js";
            }

            return SystemJS.import(url).then(m => {
                if(globals.modules[ngModuleName]) {
                    globals.modules[ngModuleName].then(factory => {
                        resolve(factory);
                    });
                }
            });
        });
    }

    static notifyLoaded(moduleName: string, moduleFactory: any) {
        globals.modules[moduleName] = Promise.resolve(moduleFactory);
    }
}

// function loadModule(name: string) {
//     return new Promise((resolve, reject)=> {
//         if (name == "HomeModule") {
//             (<any>require).ensure(["../../aot/phase1/app/home/module.ngfactory"], function () {
//                 const factory = require("../../aot/phase1/app/home/module.ngfactory");
//                 resolve(factory[name + "NgFactory"]);
//             }, "home");
//         }
//         else if (name == "AdminModule") {
//             (<any>require).ensure(["../../aot/phase1/app/admin/module.ngfactory"], function () {
//                 const factory = require("../../aot/phase1/app/admin/module.ngfactory");
//                 resolve(factory[name + "NgFactory"]);
//             }, "admin");
//         }
//         else if (name == "AboutModule") {
//             (<any>require).ensure(["../../aot/phase1/app/about/module.ngfactory"], function () {
//                 const factory = require("../../aot/phase1/app/about/module.ngfactory");
//                 resolve(factory[name + "NgFactory"]);
//             }, "about");
//         }
//     });
// }
