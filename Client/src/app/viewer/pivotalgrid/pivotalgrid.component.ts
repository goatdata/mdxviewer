import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomGroupHeader } from './customgroupheader.component';
import { Column } from 'ag-grid-community';
import { CustomHeader } from './customheader.component';
import { RowHierarchyRenderComponent } from './rowhierarchyrender.component';
import { CellSet } from 'src/app/models/CellSet';
import { MDXApiService } from 'src/app/service/mdxapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pivotalgrid',
  templateUrl: './pivotalgrid.component.html',
  styleUrls: ['./pivotalgrid.component.scss']
})
export class PivotalgridComponent implements OnInit {
  @ViewChild('editor',  {static: false}) editor;
  
  private frameworkComponents;
  private defaultColDef;
  private columnDefs;
  private rowData;
  private gridApi;
  private gridColumnApi;
  private cellSet : CellSet = null;
  public query : string = new SampleMdxQueries().Sample1;
  options:any = { printMargin: true};

  public IsExecuting : boolean = false;

  constructor(
    public mdxapi :  MDXApiService,
    private _snackBar: MatSnackBar
  ) {
    
    this.frameworkComponents = { agColumnHeader: CustomHeader,customHeaderGroupComponent: CustomGroupHeader,
      rowhierRender: RowHierarchyRenderComponent
    };

    this.defaultColDef = {
      width: 100,
      headerComponentParams: { menuIcon: "fa-bars" },
      sortable: true,
      resizable: true,
      filter: true
    };

    
   }


   getRowNodeId(data) {
    // return data.id;
  };

  onGridReady(params) {
    this.gridApi = params.api;    
    this.gridColumnApi = params.columnApi;    
  }

  ngOnInit() {
    this.Execute();
  }

  Execute(){
    this.IsExecuting=true;    
    this.mdxapi.Query(this.query).then(r=>{
      this.cellSet  = new CellSet(r as any);
      this.columnDefs = this.cellSet.AgGridColDefs();
      this.rowData = this.cellSet.AgGridData(); 
      this.IsExecuting=false;
      this.gridApi.hideOverlay();
    }).catch(ex=>{
      this.IsExecuting=false;
      this.gridApi.hideOverlay();
      throw ex;
    });

    this.gridApi.showLoadingOverlay();
  }


  Cancel(){
    this._snackBar.open("Query Cancelation not yet supported","Puph",{duration:3000});    
  }
}


export class SampleMdxQueries{
  public Sample1 : string =`SELECT 
	NON EMPTY

	HIERARCHIZE(
		NONEMPTYCROSSJOIN
		(
			DrillDownMember(	
				HIERARCHIZE(
					[Date].[Calendar].[Calendar Year]
				),
				HIERARCHIZE({
					[Date].[Calendar].[Calendar Year].&[2010]
				})
			),
			
			NONEMPTY((HIERARCHIZE(
					DrillDownMember(
						{[Sales Territory].[Sales Territory].[Group]},
						{
							[Sales Territory].[Sales Territory].[Group].&[Europe]
						}
					)
				),					
			{
				[Measures].[Internet Sales Amount],[Measures].[Internet Order Quantity]
			}))
		)
	) DIMENSION PROPERTIES PARENT_UNIQUE_NAME  ON COLUMNS,
	NONEMPTYCROSSJOIN
		(
			NONEMPTY(HIERARCHIZE([Source Currency].[Source Currency].[Source Currency])) 
			,
			DrillDownMember(
				NONEMPTY(HIERARCHIZE([Product].[Product Categories].[Category])),
				HIERARCHIZE({
					{	[Product].[Product Categories].[Category].&[3],
						[Product].[Product Categories].[Category].&[4],
						[Product].[Product Categories].[Category].&[5]
					}
				})
			)
	)  DIMENSION PROPERTIES PARENT_UNIQUE_NAME ON ROWS
FROM [Adventure Works]`;
}