import {NgModule} from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { SignupComponent} from "./signup/signup.component";

const routes: Routes = [];

let route:any;

route = {
    path:"login",
    component: LoginComponent
}
routes.push(route);

route = {
    path: 'signup',
    component: SignupComponent
}
routes.push(route);

@NgModule ({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

class RouteModule {
    constructor(){

    }
};

export { RouteModule };
