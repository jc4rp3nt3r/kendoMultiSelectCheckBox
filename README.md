kendoMultiSelectCheckBox
========================

An extension to KendoUI's MultiSelect to allow toggling of values and a less tech savvy interface. NOTE: you must have a license of KendoUI Web to use this. It is not a stand-alone library


Example Use:

<style>
    .k-list-container .k-item {
        cursor: pointer;
    }

    .k-list-container .k-item .k-icon {
        border-top: 1px solid #888;
        border-left: 1px solid #888;
        border-bottom: 1px solid #444;
        border-right: 1px solid #444;
        margin-right: 4px;
        width: 15px;
        height: 15px;
    }
    .k-i-blank {
        background-position: -99px -99px;
    }
</style>

<input id="txtDemo" data-placeholder="Please Select... " value="1,2,3,4" />

<script src="./kendo.multiSelectCheckBox.js"></script>
<script>
    $(function () {
        
        $("#txtDemo").kendoMultiSelectCheckBox({
            dataTextField: 'id',
            dataValueField: 'name',
            dataSource: new kendo.data.DataSource({
                data: [
                    { id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }, { id: 4, name: 'Item 4' }, { id: 5, name: 'Item 5' }, { id: 6, name: 'Item 6' }, { id: 7, name: 'Item 7' }
                ]
            }),
            value: $("#txtDemo").val().split(",")
        });
    });
</script>