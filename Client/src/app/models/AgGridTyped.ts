import { Member } from './CellSet';

export class AxisMember{

    
    public AxisMemberParentUniquePath: string = "";   //parent of Axis Member. if we have multiple dimensions on an axis, this will be the uniquename of a parent
    
    constructor(public headerName:string, public UniqueName: string,public children:AxisMember[], public parentUniqueName: string,public UniquePath :string,public TupleOrdinal:number, public HierarchyLevel:number,public ChildCount: number, public DrilledDown:Boolean){
        
    }

    public GetAgCol() : any{
        var newAgCol : Object={
            "headerName":this.headerName ,
            "headerClass": "rowheader"           
        }

        if (this.children.length>0){
            newAgCol["children"] =[];
            this.children.forEach(c=>{                
                newAgCol["children"].push(c.GetAgCol());                
            });
        }else{
            if (Number(this.ChildCount)>0){
                if (this.DrilledDown){
                    newAgCol["Expanded"]=true;
                }else{
                    newAgCol["Expanded"]=false;
                }    
            }            
            newAgCol["field"] = this.TupleOrdinal.toString();            
        }

        if (newAgCol["headerName"]==""){
            newAgCol["headerClass"]="groupEmptyHeader";
        }else{
            if (this.ChildCount>0){
                if (this.DrilledDown){
                    newAgCol["headerComponentParams"]={
                        Expanded:true
                    };
                }else{
                    newAgCol["headerComponentParams"]={
                        Expanded:false
                    };
                }    
            }            
            newAgCol["headerGroupComponent"]="customHeaderGroupComponent";            
        }
        return newAgCol;
    }

    public CheckAndInsertLevel(){
        var incorrectLevel = this.children.filter(s=>s.HierarchyLevel>this.HierarchyLevel+1);
        var correctLevel = this.children.filter(s=>s.HierarchyLevel==this.HierarchyLevel+1);
        if (incorrectLevel.length>0){            
            this.children = [];            
            this.children.push(new AxisMember("","",incorrectLevel,"","",this.TupleOrdinal,this.HierarchyLevel+1,this.ChildCount,this.DrilledDown));
            correctLevel.forEach(s=>this.children.push(s));
        }        
        this.children.forEach(s=>s.CheckAndInsertLevel());
    }
}
