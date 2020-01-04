define("ace/theme/mdx",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-mdx";
exports.cssText = ".ace-mdx .ace_gutter {\
background: #ebebeb;\
color: #333;\
overflow: hidden;\
}\
.ace-mdx .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-mdx {\
background-color: #FFFFFF;\
color: black;\
}\
.ace-mdx .ace_identifier {\
color: black;\
}\
.ace-mdx .ace_keyword {\
   color: #0000FF;\
}\
.ace-mdx .ace_numeric {\
color: black;\
}\
.ace-mdx .ace_storage {\
color: #11B7BE;\
}\
.ace-mdx .ace_keyword.ace_operator,\
.ace-mdx .ace_lparen,\
.ace-mdx .ace_rparen,\
.ace-mdx .ace_punctuation {\
color: #808080;\
}\
.ace-mdx .ace_set.ace_statement {\
color: #0000FF;\
text-decoration: underline;\
}\
.ace-mdx .ace_cursor {\
color: black;\
}\
.ace-mdx .ace_invisible {\
color: rgb(191, 191, 191);\
}\
.ace-mdx .ace_constant.ace_buildin {\
color: rgb(88, 72, 246);\
}\
.ace-mdx .ace_constant.ace_buildin {\
    color: rgb(88, 72, 246);\
}\
.ace-mdx .ace_function.ace_buildin {\
color: #7D3608;\
}\
.ace-mdx .ace_constant.ace_library {\
color: rgb(6, 150, 14);\
}\
.ace-mdx .ace_invalid {\
background-color: rgb(153, 0, 0);\
color: white;\
}\
.ace-mdx .ace_support.ace_function {\
color: #FF00FF;\
}\
.ace-mdx .ace_support.ace_constant {\
color: rgb(6, 150, 14);\
}\
.ace-mdx .ace_class {\
color: #008080;\
}\
.ace-mdx .ace_support.ace_other {\
color: #6D79DE;\
}\
.ace-mdx .ace_variable.ace_parameter {\
font-style: italic;\
color: #FD971F;\
}\
.ace-mdx .ace_comment {\
color: #008000;\
}\
.ace-mdx .ace_constant.ace_numeric {\
color: black;\
}\
.ace-mdx .ace_support.ace_other {\
    color: #3F647F;\
}\
.ace-mdx .ace_variable {\
color: rgb(49, 132, 149);\
}\
.ace-mdx .ace_xml-pe {\
color: rgb(104, 104, 91);\
}\
.ace-mdx .ace_support.ace_storedprocedure {\
color: #800000;\
}\
.ace-mdx .ace_heading {\
color: rgb(12, 7, 255);\
}\
.ace-mdx .ace_list {\
color: rgb(185, 6, 144);\
}\
.ace-mdx .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-mdx .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-mdx .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-mdx .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-mdx .ace_marker-layer .ace_active-line {\
background: rgba(0, 0, 0, 0.07);\
}\
.ace-mdx .ace_gutter-active-line {\
background-color: #dcdcdc;\
}\
.ace-mdx .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-mdx .ace_meta.ace_tag {\
color: #0000FF;\
}\
.ace-mdx .ace_string.ace_regex {\
color: #FF0000;\
}\
.ace-mdx .ace_string {\
color: #FF0000;\
}\
.ace-mdx .ace_entity.ace_other.ace_attribute-name {\
color: #994409;\
}\
.ace-mdx .ace_indent-guide {\
background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;\
}\
";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    window.require(["ace/theme/mdx"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            