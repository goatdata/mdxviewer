import {Component, ViewChild, ElementRef} from '@angular/core';

/*
    <div class="d-flex headerdiv" (click)="expandChanged()">
        <div class="p-2">       
            <i *ngIf="params.state=='expandable'" class="fas fa-angle-right"></i>
            <i *ngIf="params.state=='expanded'" class="fas fa-angle-down"></i>            
        </div>    
        <div class="p-2">{{params.displayName}}</div>        
    </div>*/

@Component({
    selector: 'app-loading-overlay',
    template: `<span>  
            {{this.params.displayName}}
            <i *ngIf="params.column.userProvidedColDef && params.column.userProvidedColDef.Expanded!==undefined && params.column.userProvidedColDef.Expanded==true" class="fas fa-angle-right"></i>
            <i *ngIf="params.column.userProvidedColDef && params.column.userProvidedColDef.Expanded!==undefined && params.column.userProvidedColDef.Expanded==false" class="fas fa-angle-down"></i>
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
export class CustomHeader {
    private params: any;

    private ascSort: string;
    private descSort: string;
    private noSort: string;   
    

    agInit(params): void {
        this.params = params;
    }

    expandChanged(){
        let currentState = this.params.columnGroup.getOriginalColumnGroup().isExpanded();        
        this.params.setExpanded(!currentState);        
        if (!currentState){
            this.params.state = "expandable";
        }else{
            this.params.state = "expanded";
        }
    }


}