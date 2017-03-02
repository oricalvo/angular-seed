import {
    NgModule, NgModuleFactoryLoader
}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent}  from './components/app.component';
import {ClockComponent} from "./components/clock.component";
import {FormsModule} from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home.component";
import {ModuleLoader} from "./moduleLoader";

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'admin',
        loadChildren: "/app/admin/module#AdminModule",
    },
    {
        path: 'about',
        loadChildren: "/app/about/module#AboutModule",
    },
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        ClockComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: ModuleLoader }
    ]
})
export class AppModule {
}
