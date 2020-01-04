import {Component, ViewChild, ElementRef} from '@angular/core';


@Component({
    selector: 'app-loading-overlay',
    template: `<span>  
    {{this.params.displayName}}
    <i *ngIf="IsExpanded!=null && IsExpanded==false" class="fas fa-angle-right"></i>
    <i *ngIf="IsExpanded!=null && IsExpanded==true" class="fas fa-angle-down"></i>
</span>`,
    styles: [
        `
        {
            width:100%;
        }        
        
        .customHeaderMenuButton,         
        {            
            margin: 0 0 0 3px;
        }
    `
    ],

})
export class CustomGroupHeader {
    private params: any;

    private ascSort: string;
    private descSort: string;
    private noSort: string;    
    
    private IsExpanded : boolean = null;

    agInit(params): void {
        this.params = params;
        if (params!=null && 
            params.columnGroup !==undefined && 
            params.columnGroup.originalColumnGroup !==undefined &&
            params.columnGroup.originalColumnGroup.colGroupDef !==undefined && 
            params.columnGroup.originalColumnGroup.colGroupDef.headerComponentParams !==undefined && 
            params.columnGroup.originalColumnGroup.colGroupDef.headerComponentParams.Expanded!==undefined)
            {
                this.IsExpanded = params.columnGroup.originalColumnGroup.colGroupDef.headerComponentParams.Expanded==true;
            }   

    }

    
    expandChanged(){
        let currentState = this.params.params.columnGroup.getOriginalColumnGroup().isExpanded();        
        this.params.setExpanded(!currentState);        
        if (!currentState){
            this.params.state = "expandable";
        }else{
            this.params.state = "expanded";
        }
    }


}