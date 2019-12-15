function onLoad() {
    $("#isUpdate").val("");
    console.log(communityTags);
    if (communityTags.length > 0) {
        if (communityTags[0].fields.tag_info !== undefined) {
            var myTagJson = JSON.parse(communityTags[0].fields.tag_info);
            if (myTagJson.theTags !== undefined) {
                var tags = myTagJson.theTags;
                for (var i = 0; i < tags.length; i++) {
                    $('#com_tags').tagsinput('add', tags[i].tag);

                }
            }
        }
    }
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var csrftoken = getCookie('csrftoken');

$('#newDataType').on('click', function (e) {
    $("#myTable").find("tr:gt(1)").remove();
    $("#isUpdate").val("");
    document.getElementById("dt_name").value = "";
    document.getElementById("dt_description").value = "";
    //your awesome code here
})
var formFieldsJson = {
    "fieldposnr": "",
    "fieldlabel": "",
    "fieldtype": "",
    "isRequired": "",
    "fieldvalue": ""
};
var datatypeFields = [];

var communityId = "";

$(document).ready(function () {
    var counter = 0;

    $("#addDataField").on("click", function () {

        var goon = checkFormFields();

        if (goon) {
            var tagsJson = '{ "enums" : [] }';
            var newRow = $("<tr>");
            var cols = "";
            var fieldTypes = document.getElementById("myTable").rows[1].cells[2].children[0];
            var fieldTypesSel = fieldTypes.options[fieldTypes.selectedIndex].text;
            var isRequired = document.getElementById("dt_fieldrequire").checked === true ? 'Yes' : 'No';
            var enumString = "";
            if (fieldTypes.options[fieldTypes.selectedIndex].value === "EN") {
                var tagList = $('#enum_vals').tagsinput('items');
                for (var i = 0; i < tagList.length; i++) {
                    var obj = JSON.parse(tagsJson);
                    obj['enums'].push({
                        "enum": tagList[i]
                    });
                    tagsJson = JSON.stringify(obj);

                    if (i == tagList.length - 1) {
                        enumString += tagList[i]
                    } else {
                        enumString += tagList[i] + ", ";
                    }
                }
            }
            cols += '<th>' + document.getElementById("myTable").rows[1].cells[0].children[0].value + '</th>';
            cols += '<th>' + document.getElementById("myTable").rows[1].cells[1].children[0].value + '</th>';
            cols += '<td>' + fieldTypesSel + '</td>';
            cols += '<td>' + enumString + '</td>';
            cols += '<td>' + isRequired + '</td>';
            cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
            newRow.append(cols);
            $("table").append(newRow);
            counter++;
            formFieldsJson.fieldposnr = document.getElementById("myTable").rows[1].cells[0].children[0].value;
            formFieldsJson.fieldlabel = document.getElementById("myTable").rows[1].cells[1].children[0].value;
            formFieldsJson.fieldtype = fieldTypesSel;
            formFieldsJson.isRequired = document.getElementById("dt_fieldrequire").checked;
            if (fieldTypes.options[fieldTypes.selectedIndex].value === "EN") {
                formFieldsJson.enumvals = tagsJson;
            }
            var obj = JSON.parse(fieldJson);
            obj['theFields'].push({
                "fieldposnr": document.getElementById("myTable").rows[1].cells[0].children[0].value,
                "fieldlabel": document.getElementById("myTable").rows[1].cells[1].children[0].value,
                "fieldtype": fieldTypes.options[fieldTypes.selectedIndex].value,
                "isRequired": document.getElementById("dt_fieldrequire").checked,
                "enumvals": fieldTypes.options[fieldTypes.selectedIndex].value === "EN" ? tagsJson : ""
            });
            fieldJson = JSON.stringify(obj);
            console.log(fieldJson);
            clearFormFields();
        } else {

        }

    });


    $("table").on("click", ".ibtnDel", function (event) {
        console.log(event);
        var fields = JSON.parse(fieldJson);
        var fieldList = fields["theFields"];
        jQuery.each(fieldList, function (index) {
            if (fieldList[index] && index === event.currentTarget.tabIndex) {
                fieldList.splice(index, 1);
            }
        });

        fieldJson = '{ "theFields" : [] }';
        var obj = JSON.parse(fieldJson);
        for (var i = 0; i < fieldList.length; i++) {
            obj['theFields'].push({
                "fieldposnr": fieldList[i].fieldposnr,
                "fieldlabel": fieldList[i].fieldlabel,
                "fieldtype": fieldList[i].fieldtype,
                "isRequired": fieldList[i].isRequired,
                "enumvals": fieldList[i].enumvals
            });
        }

        fieldJson = JSON.stringify(obj);
        $(this).closest("tr").remove();
        counter -= 1;
    });

    $("#addDataType").on("click", function () {

        var aarr = window.location.href.split('/');
        //get last value
        communityId = aarr[aarr.length - 1];
        $("#communityId").val(communityId)
        $("#eleman").val(fieldJson);

    });

});

function clearFormFields() {
    document.getElementById("dt_fieldposnr").value = "";
    document.getElementById("dt_fieldlabel").value = "";
    document.getElementById("dt_fieldtype").value = "";
    document.getElementById("enum_vals").disabled = true;
    $("#enum_vals").tagsinput('removeAll');
}

function checkFormFields() {

    if (document.getElementById("dt_fieldposnr").value == "" &&
        document.getElementById("dt_fieldlabel").value == "" &&
        document.getElementById("dt_fieldtype").value == "") {
        return false;
    }
    var fields = JSON.parse(fieldJson);
    console.log(fields);

    if (fields.theFields !== undefined) {
        for (var i = 0; i < fields.theFields.length; i++) {
            if (fields.theFields[i].fieldposnr === document.getElementById("dt_fieldposnr").value) {
                return false;
            }
        }
    }
    return true;
}

$("#deactivateCom").click(function () {

    var csrftoken = getCookie('csrftoken');

    console.log(csrftoken);

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    var aarr = window.location.href.split('/');
    //get last value
    communityId = aarr[aarr.length - 1];
    jQuery.ajax({
        type: "POST", url: "/deactivateCommunity",
        data: {"communityId": communityId},
        success:
            function (result) {
                $('#confirmDeactivation').modal('hide');
                window.location.href = "/";
            }
    });
});


function onSelectFType() {
    if (document.getElementById("dt_fieldtype").value === "EN") {
        document.getElementById("enum_vals").disabled = false;
    } else {
        document.getElementById("enum_vals").disabled = true;
        $("#enum_vals").tagsinput('removeAll');
    }

}

function editDataType(oDataTypeId) {

    console.dir(oDataTypeId);
    // document.getElementById("dt_name").value === "EN"
     $("#isUpdate").val(oDataTypeId);
    jQuery.ajax({
        type: "GET", url: "/getdataType",
        data: {"dt_id": oDataTypeId},
        async: false,
        success:
            function (result) {
                console.dir(result);
                document.getElementById("dt_name").value = result[0].data_type_name;
                document.getElementById("dt_description").value = result[0].data_type_desc;
                addDataTypeFields(result[0].formfields);
            },
        error:
            function (result) {
                console.dir(result);
            }
    });

}

function addDataTypeFields(oFormFields) {
    $("#myTable").find("tr:gt(1)").remove();

    var flds = JSON.parse(oFormFields);

    console.log(flds['theFields']);

    var fieldList = flds['theFields'];


    var lv_fieldtype = "";
    for (var i = 0; i < fieldList.length; i++) {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<th>' + fieldList[i].fieldposnr + '</th>';
        cols += '<th>' + fieldList[i].fieldlabel + '</th>';

        switch (fieldList[i].fieldtype) {
            case "TE":
                lv_fieldtype = "Text field";
                break;
            case "TA":
                lv_fieldtype = "Text area";
                break;
            case "DA":
                lv_fieldtype = "Date";
                break;
            case "TI":
                lv_fieldtype = "Time";
                break;
            case "IN":
                lv_fieldtype = "Integer";
                break;
            case "DE":
                lv_fieldtype = "Decimal";
                break;
            case "IM":
                lv_fieldtype = "Image";
                break;
            case "VI":
                lv_fieldtype = "Video";
                break;
            case "AU":
                lv_fieldtype = "Audio";
                break;
            case "UR":
                lv_fieldtype = "URI";
                break;
            case "LO":
                lv_fieldtype = "Location";
                break;
            case "EN":
                lv_fieldtype = "Enumerated";
                break;
        }
        cols += '<th>' + lv_fieldtype + '</th>';


        var enumString = "";
        if (fieldList[i].fieldtype === "EN") {
            var enums = JSON.parse(fieldList[i].enumvals);
            var enumList = enums["enums"];

            for (var j = 0; j < enumList.length; j++) {
                if (j == enumList.length - 1) {
                    enumString += enumList[j].enum
                } else {
                    enumString += enumList[j].enum + ", ";
                }
            }

        }
        cols += '<th>' + enumString + '</th>';
        var lv_isReq = fieldList[i].isRequired === true ? "Yes" : "No";
        cols += '<th>' + lv_isReq + '</th>';
        cols += '<td><input type="button" class="ibtnDel btn btn-md btn-danger "  value="Delete"></td>';
        newRow.append(cols);
        $("#myTable").append(newRow);
    }
}

function cancelDataType() {
    $("#isUpdate").val("");
}