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

    //your awesome code here
})
var formFieldsJson = {
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

        var newRow = $("<tr>");
        var cols = "";

        var fieldTypes = document.getElementById("myTable").rows[1].cells[1].children[0]
        var fieldTypesSel = fieldTypes.options[fieldTypes.selectedIndex].text

        var isRequired = document.getElementById("dt_fieldrequire").checked === true ? 'Yes' : 'No';

        cols += '<th>' + document.getElementById("myTable").rows[1].cells[0].children[0].value + '</th>'
        cols += '<td>' + fieldTypesSel + '</td>'
        cols += '<td>' + isRequired + '</td>'

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

        var aarr = window.location.href.split('/');
        //get last value
        communityId = aarr[aarr.length - 1];
        $("#communityId").val(communityId)


        $("#eleman").val(fieldJson);
    });

});


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
        data: { "communityId" : communityId },
        success:
            function (result) {
                $('#confirmDeactivation').modal('hide');
                window.location.href = "/";
            }
    });
});

