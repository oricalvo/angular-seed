import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import {enableProdMode} from "@angular/core";

if(globals.isProduction) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
