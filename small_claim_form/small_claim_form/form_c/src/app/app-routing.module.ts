import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { navbarRoute } from "./layouts/navbar/navbar.route";
import { NavbarComponent } from "./layouts/navbar/navbar.component";

const routes: Routes = [
  navbarRoute,
  { path: "**", component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
