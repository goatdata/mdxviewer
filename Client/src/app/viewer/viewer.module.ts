import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';

import { PivotalgridComponent } from './pivotalgrid/pivotalgrid.component';
import { CustomGroupHeader } from './pivotalgrid/customgroupheader.component';
import { CustomHeader } from './pivotalgrid/customheader.component';
import { AgGridModule } from 'ag-grid-angular';

import { FormsModule } from "@angular/forms"; // <-- NgModel lives here
import { RowHierarchyRenderComponent } from './pivotalgrid/rowhierarchyrender.component';
import { AceEditorModule } from 'ng2-ace-editor';

@NgModule({
  declarations: [PivotalgridComponent,CustomHeader,CustomGroupHeader,RowHierarchyRenderComponent],  
  imports: [
    CommonModule,
    ViewerRoutingModule,
    FormsModule,  
    AceEditorModule,
    AgGridModule.withComponents([CustomHeader,CustomGroupHeader,RowHierarchyRenderComponent]),    
  ]  
})
export class ViewerModule { }
