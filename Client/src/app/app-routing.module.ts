import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './core/main/main.component';


const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  },
  { 
    path: 'viewer',
    loadChildren: 'src/app/viewer/viewer.module#ViewerModule',    
  },
  { path: '', redirectTo: '/viewer/pivotalgrid', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
