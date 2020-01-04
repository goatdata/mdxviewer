import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PivotalgridComponent } from './pivotalgrid/pivotalgrid.component';
//import { Pivotalgrid2Component } from './pivotalgrid2/pivotalgrid2.component';

const routes: Routes = [
  
  { 
    path: 'pivotalgrid',
    component: PivotalgridComponent,
    pathMatch: 'full'
  }/*,
  { 
    path: 'pivotalgrid',
    component: PivotalgridComponent,
    pathMatch: 'full'
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewerRoutingModule { }
