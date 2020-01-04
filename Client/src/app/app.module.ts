import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicationService } from './service/application.service';
import { AgGridModule } from 'ag-grid-angular';
import { Papa } from 'ngx-papaparse';
import { CustomGroupHeader } from './viewer/pivotalgrid/customgroupheader.component';
import { CustomHeader } from './viewer/pivotalgrid/customheader.component';
import { RowHierarchyRenderComponent } from './viewer/pivotalgrid/rowhierarchyrender.component';
import { MDXApiService } from './service/mdxapi.service';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './service/errorhandler.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent
  ],
  exports : [MatSnackBarModule],
  imports: [    
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,    
    CoreModule, NoopAnimationsModule    
  ],
  providers: [
      ApplicationService,       
      MDXApiService, 
      {provide:"ServerURL",useValue:"http://localhost:53023/"},
      {provide: ErrorHandler, useClass: GlobalErrorHandler}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
