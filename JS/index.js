$(function () {
    var grid = $("#grid").dxDataGrid({
        dataSource: employees,
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowAdding: true,
        },

        columns: [
            {
                dataField: "Prefix",
                caption: "Title",
                width: 55
            },
            "FirstName",
            "LastName", {
                dataField: "Position",
                width: 170
            }, {
                dataField: "StateID",
                calculateDisplayValue: function (rowData) {
                    var texts = [];
                    if (rowData.StateID && rowData.StateID.length) {
                        for (var i = 0; i < rowData.StateID.length; i++) {
                            var value = rowData.StateID[i];
                            var displayText = states.filter(function (item) { return item.ID == value })[0].Name;
                            if (displayText)
                                texts.push(displayText);
                        }
                    }
                    return texts.toString();
                },
                caption: "State",
                lookup: {
                    dataSource: {
                        store: {
                            type: "array",
                            data: states,
                            key: "ID"
                        }
                    },
                    displayExpr: "Name",
                    valueExpr: "ID"
                }
            }, {
                dataField: "BirthDate",
                dataType: "date"
            }
        ],
        onEditorPreparing: function (e) {
            if (e.dataField == "StateID" && e.parentType == "dataRow") {
                e.editorName = "dxDropDownBox";                
                e.editorOptions.dropDownOptions = {                
                    height: 500
                };
                e.editorOptions.contentTemplate = function (args, container) {

                    var value = args.component.option("value"),
                        $dataGrid = $("<div>").dxDataGrid({
                            width: '100%',
                            dataSource: args.component.option("dataSource"),
                            keyExpr: "ID",
                            columns: ["ID", "Name"],
                            hoverStateEnabled: true,
                            paging: { enabled: true, pageSize: 10 },
                            filterRow: { visible: true },
                            scrolling: { mode: "infinite" },
                            height: '90%',
                            showRowLines: true,
                            showBorders: true,
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

            }
        },
    }).dxDataGrid("instance");
    var modeItems = ["row", "cell", "batch", "form", "popup"]
    $("#editModes").dxSelectBox({
        width: 300,
        value: modeItems[0],
        items: modeItems,
        text: "Expand All Groups",
        onValueChanged: function (e) {
            if (!grid.hasEditData())
                grid.option("editing.mode", e.value);
            else
                DevExpress.ui.notify("Finish editing first");
        }
    });
});
