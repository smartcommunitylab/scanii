import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { navbarRoute } from './layouts/navbar/navbar.route';

const routes: Routes = [navbarRoute]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
