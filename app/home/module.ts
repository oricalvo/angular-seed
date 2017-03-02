import {NgModule}      from '@angular/core';
import {MainComponent}  from './components/main.component';
import {Routes, RouterModule} from "@angular/router";

const routes: Routes = [
    { path: '',  component: MainComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [
        MainComponent,
    ],
})
export class HomeModule {
}
