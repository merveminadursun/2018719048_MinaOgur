$('#newDataType').on('click', function (e) {

    //your awesome code here
})
var formFieldsJson = {
    "fieldlabel": "",
    "fieldtype": "",
    "isRequired": "",
    "fieldvalue": ""
};
var datatypeFields = [];

$(document).ready(function () {
    var counter = 0;

    $("#addDataField").on("click", function () {

        var newRow = $("<tr>");
        var cols = "";

        var fieldTypes = document.getElementById("myTable").rows[1].cells[1].children[0]
        var fieldTypesSel = fieldTypes.options[fieldTypes.selectedIndex].text

        var isRequired = document.getElementById("dt_fieldrequire").checked === true ? 'Yes' : 'No';

        cols += '<th>' + document.getElementById("myTable").rows[1].cells[0].children[0].value + '</th>'
        cols += '<td>' + fieldTypesSel + '</td>'
        cols += '<td>' + isRequired + '</td>'
        // cols += '<td><input type="text" class="form-control" name="dt_fieldtype' + counter + '"/></td>';
        // cols += '<td><input type="text" class="form-control" name="dt_fieldrequire' + counter + '"/></td>';

        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        $("table").append(newRow);
        counter++;

        formFieldsJson.fieldlabel = document.getElementById("myTable").rows[1].cells[0].children[0].value
        formFieldsJson.fieldtype = fieldTypesSel
        formFieldsJson.isRequired = document.getElementById("dt_fieldrequire").checked


        var obj = JSON.parse(fieldJson);
        obj['theFields'].push({
            "fieldlabel": document.getElementById("myTable").rows[1].cells[0].children[0].value,
            "fieldtype": fieldTypes.options[fieldTypes.selectedIndex].value,
            "isRequired": document.getElementById("dt_fieldrequire").checked
        });
        fieldJson = JSON.stringify(obj);

        console.log(fieldJson)

    });


    $("table").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();
        counter -= 1
    });

    $("#addDataType").on("click", function () {


    });

});