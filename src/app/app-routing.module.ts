import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { CrossTab1Component } from './cross-tab1/cross-tab1.component';
import { CrossTab2Component } from './cross-tab2/cross-tab2.component';

const routes: Routes = [{path:'grid',component:GridComponent},{path:'crossTab1',component:CrossTab1Component},{path:'crossTab2',component:CrossTab2Component}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
