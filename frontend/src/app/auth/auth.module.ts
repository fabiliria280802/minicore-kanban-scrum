import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { MaterialModule } from "../material/material.module";

import { LayoutPageComponent } from "./views/layout-page/layout-page.component";
import { LoginPageComponent } from "./views/login-page/login-page.component";
import { RegisterPageComponent } from "./views/register-page/register-page.component";

@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class AuthModule {}
