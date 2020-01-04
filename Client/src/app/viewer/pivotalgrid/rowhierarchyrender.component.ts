import {Component} from "@angular/core";
import {ICellRendererAngularComp} from "ag-grid-angular";
import {HierarchyValue} from 'src/app/models/HierarchyValue'

// both this and the parent component could be folded into one component as they're both simple, but it illustrates how
// a fuller example could work
/*
<span class='level{{this.hierarchyvalue.l}}'>
            <i *ngIf="!hierarchyvalue.e" class="fas fa-angle-right"></i>
            <i *ngIf="hierarchyvalue.e" class="fas fa-angle-down"></i>  {{this.hierarchyvalue.v}}
        </span>       
*/
@Component({
    selector: 'row-hierarchy-cell',
    template: `
    <span class='level{{this.hierarchyvalue.Level}}'>
            <i *ngIf="hierarchyvalue.ChildCount>0 && !hierarchyvalue.Expanded" class="fas fa-angle-right"></i>
            <i *ngIf="hierarchyvalue.ChildCount>0 && hierarchyvalue.Expanded" class="fas fa-angle-down"></i>  
            {{this.hierarchyvalue.Value}}
        </span>`,
    styles: [`
        .level0 {
            padding-left:0px;
        }
        .level1 {
            padding-left:0px;
        }
        .level2 {
            padding-left:7px;
        }
        .level3 {
            padding-left:14px;
        }
        .level4 {
            padding-left:18px;
        }
        .level5 {
            padding-left:25px;
        }
        .level6 {
            padding-left:30px;
        }
        .level7 {
            padding-left:35px;
        }
        .level8 {
            padding-left:40px;
        }
    `]
})
export class RowHierarchyRenderComponent implements ICellRendererAngularComp {
    public params: any;
    public level : number;


    public hierarchyvalue : HierarchyValue = new HierarchyValue("",0,false,0);

    agInit(params: any): void {
        this.params = params;
        if (this.params.colDef && this.params.colDef.field){
            if (this.params.data[this.params.colDef.field]){
                var cellValue = this.params.data[this.params.colDef.field];
                this.hierarchyvalue = cellValue as HierarchyValue;                
            }            
        }
        
    }

    refresh(): boolean {
        return false;
    }
}