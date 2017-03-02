import "reflect-metadata";
import { platformBrowser } from '@angular/platform-browser';
import {AppModuleNgFactory} from "../aot/phase1/app/app.module.ngfactory";

platformBrowser().bootstrapModuleFactory (AppModuleNgFactory);
