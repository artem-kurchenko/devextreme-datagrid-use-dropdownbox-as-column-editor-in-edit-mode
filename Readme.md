<!-- default file list -->
*Files to look at*:

<!-- default file list end -->
# DataGrid - How to use DropDownBox as a column editor in edit mode


<p>This example illustrates how to use <a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDropDownBox/">dxDropDownBox</a> with an embedded <a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/">dxDataGrid</a> for editing data. Run the example and check the State column to see this approach in action.<br><br>Click the "Show Implementation Details" link to see step-by-step instructions.<br><br><strong>See also<br></strong><a href="https://www.devexpress.com/Support/Center/p/T576412">DataGrid - How to use DropDownBox as a column editor in edit mode</a><strong><br></strong></p>


<h3>Description</h3>

<p>Perform the following steps to complete this task:&nbsp;<br><br>1. Define the&nbsp;<a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onEditorPreparing">onEditorPreparing</a>&nbsp;handler and change the editorName and editorOptions parameters to specify dxDropDownBox settings</p>
<code lang="js">onEditorPreparing: function (e) {
            if (e.dataField == "StateID" &amp;&amp; e.parentType == "dataRow") {
                e.editorName = "dxDropDownBox";                
                e.editorOptions.dropDownOptions = {                
                    height: 500
                };
                e.editorOptions.contentTemplate = function (args, container) { 
                    //custom template
                }
            }
},
</code>
<p>&nbsp;</p>
<p>2. Implement the contentTemplate&nbsp;function to define dxDataGrid&nbsp;and handle its&nbsp;<a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onSelectionChanged">selectionChanged</a>&nbsp;event to pass selected keys to dxDropDownBox. In addition, handle the&nbsp;<a href="https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDropDownBox/Configuration/#onValueChanged">dxDropDownBox.valueChanged</a>&nbsp;event&nbsp;to adjust dxDataGrid selection</p>
<code lang="js">                e.editorOptions.contentTemplate = function (args, container) {
                     var value = args.component.option("value"),
                        $dataGrid = $("&lt;div&gt;").dxDataGrid({                           
                            dataSource: args.component.option("dataSource"),
                            keyExpr: "ID",
                           .....
                            selection: { mode: "multiple" },
                            selectedRowKeys: value,
                            onSelectionChanged: function (selectedItems) {
                                var keys = selectedItems.selectedRowKeys;
                                args.component.option("value", keys);
                            }
                        });
                     var dataGrid = $dataGrid.dxDataGrid("instance");
                     args.component.on("valueChanged", function (args) {
                        var value = args.value;
                        dataGrid.selectRows(value, false);
                    });
                    container.append($dataGrid);
                    $("&lt;div&gt;").dxButton({
                        text: "Close",
                         onClick: function (ev) {
                            args.component.close();
                        }
                    }).css({ float: "right", marginTop: "10px" }).appendTo(container);
                    return container;
                 };
}
</code>
<p>&nbsp;</p>

<br/>


