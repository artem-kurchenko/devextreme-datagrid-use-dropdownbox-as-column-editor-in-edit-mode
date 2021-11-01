<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/128583101/19.2.11%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T548916)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->

# DataGrid - How to use DropDownBox as a column editor in edit mode

This example illustrates how to use [dxDropDownBox](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDropDownBox/) with an embedded [dxDataGrid](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/) for editing data. Run the example and check the State column to see this approach in action.

**See also** [DataGrid - How to use DropDownBox as a column editor in edit mode](https://www.devexpress.com/Support/Center/p/T576412)

## Description

Perform the following steps to complete this task
1. Define the [onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onEditorPreparing) handler and change the editorName and editorOptions parameters to specify dxDropDownBox settings.
   ```javascript
   function onEditorPreparing(e) {
       if (e.dataField == "StateID" && e.parentType == "dataRow") {
           e.editorName = "dxDropDownBox";                
           e.editorOptions.dropDownOptions = {                
               height: 500
           };
           e.editorOptions.contentTemplate = function (args, container) { 
               //custom template;
           }
       }
   }
   ```
2. Implement the contentTemplate function to define dxDataGrid and handle its [selectionChanged](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDataGrid/Configuration/#onSelectionChanged) event to pass selected keys to dxDropDownBox. In addition, handle the [dxDropDownBox.valueChanged](https://js.devexpress.com/Documentation/ApiReference/UI_Widgets/dxDropDownBox/Configuration/#onValueChanged) event to adjust dxDataGrid selection
   ```javascript
   e.editorOptions.contentTemplate = function (args, container) {
       var value = args.component.option("value"),
       $dataGrid = $("<div>").dxDataGrid({                           
          dataSource: args.component.option("dataSource"),
          keyExpr: "ID",
          //code
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
       $("<div>").dxButton({
          text: "Close",
           onClick: function (ev) {
              args.component.close();
          }
       }).css({ float: "right", marginTop: "10px" }).appendTo(container);
       return container;
   };
   ```
