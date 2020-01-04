import { AxisMember } from './AgGridTyped';
import { stringify } from 'querystring';

export class CellSet{    

    public Axes :Axis[];
    public Cells:Array<Array<string>>;

    constructor(private fromRaw: any){
        Object.assign(this,fromRaw);
    }
    
    public AgGridData(): any[]{
        var rows : any[] =[];
        
        var rowAxis = this.Axes.find(s=>s.Name=="Axis1");

        var rowNum :number =0;
        var ColMatch = [];
        var rowSpan = [];
        var SpanIndex =[];
        var MinHLevel =[];

        this.Cells.forEach(row =>{            
            var rowObject : Object={};
            
            var memberPath =[];
            for (var h=0;h<rowAxis.Set.Hierarchies.length;h++){  
                memberPath.push(rowAxis.Set.Tuples[rowNum].Members[h].Name);                
                if (!ColMatch[h] || ColMatch[h]!=memberPath.join(":")){                    
                    ColMatch[h]=memberPath.join(":");
                    rowObject["H"+h]=
                        {
                            Value:rowAxis.Set.Tuples[rowNum].Members[h].Caption,
                            Level : rowAxis.Set.Tuples[rowNum].Members[h].LevelDepth,
                            Expanded :rowAxis.Set.Tuples[rowNum].Members[h].DrilledDown,
                            ChildCount : rowAxis.Set.Tuples[rowNum].Members[h].ChildCount
                        };                        
                    if (rowSpan[h] && Number(rowSpan[h])!=1){
                        rows[Number(SpanIndex[h])]["H"+h+"-Span"]=rowSpan[h];
                    }
                    if (!MinHLevel[h]){MinHLevel[h]=rowAxis.Set.Tuples[rowNum].Members[h].LevelDepth;}
                    if (MinHLevel[h]>rowAxis.Set.Tuples[rowNum].Members[h].LevelDepth){
                        MinHLevel[h]=rowAxis.Set.Tuples[rowNum].Members[h].LevelDepth;
                    }
                    rowSpan[h]=1;
                    SpanIndex[h] = null;
                }else{
                    rowSpan[h]+=1;
                    if (SpanIndex[h]==null){
                        SpanIndex[h]=rowNum-1;
                    }
                }                                 
            }
            

            for(var i=0;i<row.length;i++){
                if (row[i]!=null){
                    rowObject[i.toString()]=row[i];
                }                
            }       
            rows.push(rowObject);
            rowNum+=1;
        });

        //clean up 
        for(var h in SpanIndex){
            if (SpanIndex[h]!=null && rowSpan[h] && Number(rowSpan[h])>1){
                rows[Number(SpanIndex[h])]["H"+h+"-Span"]=rowSpan[h];
            }
        }
        //realign levels 
        for (var minLev in MinHLevel){
            rows.forEach(r=>{
                if (r[minLev] && r[minLev].Level && r[minLev].Level!=0){
                    r[minLev].Level = Number(r[minLev].Level) - Number(MinHLevel[minLev])+1;
                }
            });
        }

        return rows;
    }

    public AgGridColDefs() : any[]{
        var cols :AxisMember[] =[];
        var allColRef : AxisMember[] =[];

        var colAxis = this.Axes.find(s=>s.Name=="Axis0");

        var hierCount = colAxis.Set.Hierarchies.length;
        var hierLevel=-1;

        for(var i=0;i<hierCount;i++){
            var LevelDepths = this.GetUniqueLevels(colAxis.Set.Tuples,i);
            var hierColArray: AxisMember[][] = [];
            for (var ld =0;ld<LevelDepths.length;ld++){
                hierLevel+=1;
                if (!hierColArray[ld]){
                    hierColArray[ld] = [];
                }
                colAxis.Set.Tuples.forEach(t=>{
                    if (t.Members[i].LevelDepth==LevelDepths[ld]){
                        var memberUniquePath = this.GetUniquePath(t,i);
                        if (hierColArray[ld].find(col=>col.UniquePath==memberUniquePath)==null){
                            var newcol = new AxisMember(t.Members[i].Caption,t.Members[i].UniqueName,[],(t.Members[i].ParentUniqueName ? t.Members[i].ParentUniqueName:""),this.GetUniquePath(t,i),Number(t.TupleOrdinal),hierLevel,Number(t.Members[i].ChildCount),t.Members[i].DrilledDown);
                            if (i>0){
                                newcol.AxisMemberParentUniquePath = this.GetUniquePath(t,i-1);
                            }
                            hierColArray[ld].push(newcol);
                            allColRef.push(newcol);                            
                        }
                    }
                });
            }
            for (var l =hierColArray.length-1;l>=1;l--){
                hierColArray[l].forEach(hiercols=>{
                    var findParent = hierColArray[l-1].find(s=>s.UniqueName==hiercols.parentUniqueName && s.AxisMemberParentUniquePath==hiercols.AxisMemberParentUniquePath);
                    if (findParent){
                        findParent.children.push(hiercols);
                        findParent.DrilledDown=true;
                    }                    
                });                
            }

            console.log(hierColArray);
            if (i==0){
                hierColArray[0].forEach(h=>cols.push(h));
            }else{
                hierColArray[0].forEach(h=>{
                    var findMemberParent = allColRef.find(s=>s.UniquePath==h.AxisMemberParentUniquePath);
                    if (findMemberParent){
                        findMemberParent.children.push(h);
                    }
                });                
            }            
        }

        var returnCols : any[] =[];
        cols.forEach(c=>c.CheckAndInsertLevel());
        cols.forEach(c=>returnCols.push(c.GetAgCol()));

        // lets add row columns, we need one column for each member on the axis
        var rowAxis = this.Axes.find(s=>s.Name=="Axis1");
        for (var h=rowAxis.Set.Hierarchies.length-1;h>=0;h--){
            var newHcol = new Object();
            newHcol["headerName"]=rowAxis.Set.Hierarchies[h].Caption;
            newHcol["headerClass"]="rowheader";
            if (hierLevel>1){
                newHcol["children"]=[];     
                          
                this.CreateEmptyChildren(hierLevel,newHcol,"H"+h);
            }else{                
                newHcol["field"]="H"+h;
                newHcol["cellRenderer"]="rowhierRender";
            }           

            returnCols.unshift(newHcol);
        }


        return returnCols;
    }

    private CreateEmptyChildren(depth :number, object:any, field:string){
        var newObj = new Object();                    
        object["children"].push(newObj);
        newObj["headerName"] ="";        
        newObj["headerClass"]="groupEmptyHeader";  
        newObj["headerComponentParams"] = { state:""};


        if (depth>1){            
            newObj["children"] = [];
            this.CreateEmptyChildren(depth-1,newObj,field);
            return;
        }else{            
            newObj["field"]=field;        
            newObj["cellRenderer"]="rowhierRender";
            newObj["rowSpan"]=function(params){
                if (params.data[params.column.colId] && params.data[params.column.colId+"-Span"]){                    
                    return Number(params.data[params.column.colId+"-Span"]);
                }else{
                    return 1;
                }                
            };
            
            newObj["cellClassRules"] =  {
                "cellSpanned": "value !== undefined"
            };
            
        }
        
        return;
    }

    private GetUniquePath(tuple: Tuple, memberLevel:number) : string {
        var path:String[] = [];
        for (var i=memberLevel;i>=0;i--){
            path.push(tuple.Members[i].UniqueName);
        }
        return path.reverse().join(":");
    }

    private GetUniqueLevels(tuples: Tuple[],memberLevel:number) : number[]{
        var output : number[] = [];
        tuples.forEach(s=>{
            if (output.find(n=>n==s.Members[memberLevel].LevelDepth)==null){
                output.push(s.Members[memberLevel].LevelDepth);
            }            
        });
        return output.sort();
    }
}


export class Axis{
    constructor(public Name: string,public Set:Set){

    }
}

export class Set{
    constructor(public Hierarchies:Hierarchy[],public Tuples:Tuple[]){}
}

export class Hierarchy{
    constructor(public Name: string, public DefaultMember:string,public Caption: string){

    }
}

export class Tuple{
    constructor(public TupleOrdinal:string,public Members: Member[]){}
}

export class Member{
    constructor(
        public  Name:string,
        public UniqueName: string,
        public LevelDepth: number,
        public  LevelName:string,
        public Caption: string,
        public DrilledDown:Boolean,
        public ParentUniqueName : string,
        public ChildCount : boolean
    ){}
}

