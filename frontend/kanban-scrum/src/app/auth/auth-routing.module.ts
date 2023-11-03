import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutPageComponent } from "./views/layout-page/layout-page.component";
import { LoginPageComponent } from "./views/login-page/login-page.component";
import { RegisterPageComponent } from "./views/register-page/register-page.component";

// localhost:4200/auth/
const routes: Routes = [
  {
    path: "",
    component: LayoutPageComponent,
    children: [
      { path: "login", component: LoginPageComponent },
      { path: "new-account", component: RegisterPageComponent },
      { path: "**", redirectTo: "login" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
