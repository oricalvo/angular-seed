import {Routes} from "@angular/router";

export const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: "/app/home/module#HomeModule",
    },
    {
        path: 'admin',
        loadChildren: "/app/admin/module#AdminModule",
    },
    {
        path: 'about',
        loadChildren: "/app/about/module#AboutModule",
    },
];
