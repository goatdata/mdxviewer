define("ace/mode/mdx_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var MdxHighlightRules = function() {

    var keywords = (
        "SELECT|FROM|WHERE|AND|OR|CASE|WHEN|ELSE|END|NOT|NON|EMPTY|ROWS|COLUMNS|DIMENSION|PROPERTIES|SCOPE|IF|DRILLTHROUGH|WITH|AS|ON"
    );

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "avg|count|AddCalculatedMembers|Aggregate|BottomCount|BottomCount|BottomPercent|BottomSum|CalculationCurrentPass|CalculationPassValue|Count|Distinct|DistinctCount|Except|" + 
        "ifnull|isnull|nvl|DrillDownMember|NONEMPTY|PARENT_UNIQUE_NAME|HIERARCHIZE|NONEMPTYCROSSJOIN|CROSSJOIN|DrilldownLevel|DrilldownLevelBottom|DrilldownLevelTop|DrilldownMember|DrilldownMemberBottom|DrilldownMemberTop|DrillupLevel|DrillupMember|"+
        "Divide|Error|Exists|LinkMember|LinRegIntercept|LinRegPoint|LinRegR2|LinRegSlope|LinRegVariance|LookupCube|"+
        "KPIGoal|KPIStatus|KPITrend|KPIWeight|KPICurrentTimeMember|KPIValue|MemberToStr|Max|MeasureGroupMeasures|Median|Min|Mtd|Name|NameToSet|NextMember|NonEmpty|NonEmptyCrossjoin|Order|Ordinal"+
        "Qtd|Rank|RollupChildren|Root|SetToArray|SetToStr|Siblings|Stddev|StddevP|Stdev|StdevP|StripCalculatedMembers|StrToMember|"+
        "StrToSet|StrToTuple|StrToValue|Subset|Sum|Tail|This|ToggleDrillState|TopCount|TopPercent|TopSum|TupleToStr|Union|UniqueName|"+
        "UnknownMember||Unorder|UserName|ValidMeasure|Var|Variance|VarianceP|VarP|VisualTotals|Wtd|Ytd"
    );
    
    var mdxFunctions = ( "Currentmember|Hierarchy|AllMembers|Ancestor|Ancestors|Ascendants|Avg|Axis|Children|ClosingPeriod|"+
        "CoalesceEmpty|Correlation|Cousin|Covariance|CovarianceN|Current|CurrentMember|CurrentOrdinal|CustomData|DataMember|DefaultMember|Descendants|Dimension|Dimensions|" +
        "Extract|Filter|Generate|IIf|Instr|Intersect|IsAncestor|IsEmpty|IsGeneration|IsLeaf|IsSibling|" + 
        "FirstChild|FirstSibling|Head|Hierarchy|Item|Lag|LastChild|LastPeriods|LastSibling|Lead|Leaves|Level|Levels|Members|MemberValue|" +
        "OpeningPeriod|ParallelPeriod|Parent|PeriodsToDate|Predict|PrevMember|Properties|Value"
    );

    var dataTypes = (
        "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
        "money|real|number|integer"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "function.buildin" : mdxFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.type": dataTypes
    }, "identifier", true);

    this.$rules = {
        "start" : [            
            {
                token : "comment",
                regex : "--.*$"
            },  {
                token : "comment",
                start : "/\\*",
                end : "\\*/"
            },
            {
                token : "string",           // " string
                regex : '".*?"'
            }, {
                token : "string",           // ' string
                regex : "'.*?'"
            }, {
                token : "string",           // ` string (apache drill)
                regex : "`.*?`"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token : "paren.lparen",
                regex : "[\\(]"
            }, {
                token : "paren.rparen",
                regex : "[\\)]"
            }, {
                token : "text",
                regex : "\\s+"
            },
            {
                token : "support.other",
                regex : "\\[(.*?)\\]"
            }
    ]

    };
    this.normalizeRules();
};

oop.inherits(MdxHighlightRules, TextHighlightRules);

exports.MdxHighlightRules = MdxHighlightRules;
});

define("ace/mode/mdx",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/Mdx_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var MdxHighlightRules = require("./mdx_highlight_rules").MdxHighlightRules;

var Mode = function() {
    this.HighlightRules = MdxHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/mdx";
}).call(Mode.prototype);

exports.Mode = Mode;

});                (function() {
                    window.require(["ace/mode/mdx"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            