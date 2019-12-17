function onLoad() {
    console.log(formFields);
    var row = ""
    if (formFields.length > 0) {
        var form = document.getElementById("postForm");
        var container = document.createElement("div");
        container.className = "form-group";
        if (formFields[0].fields.formfields !== undefined && formFields[0].fields.formfields !== "") {
            var myFormFields = JSON.parse(formFields[0].fields.formfields);
            if (myFormFields.theFields !== undefined) {
                var fields = myFormFields.theFields;

                fields.sort(function (a, b) {
                    var pos1 = Number(a.fieldposnr);
                    var pos2 = Number(b.fieldposnr);
                    return pos1 - pos2;
                });

                for (var i = 0; i < fields.length; i++) {

                    var label = document.createElement("label");
                    label.setAttribute("for", fields[i].fieldlabel);
                    var title = document.createTextNode(fields[i].fieldlabel);
                    label.appendChild(title);
                    container.append(label);

                    var lv_inputtype = "";
                    var input = document.createElement("input");

                    switch (fields[i].fieldtype) {
                        // <option value="TE">Text field</option>
                        // <option value="TA">Text area</option>
                        // <option value="DA">Date</option>
                        // <option value="TI">Time</option>
                        // <option value="IN">Integer</option>
                        // <option value="DE">Decimal</option>
                        // <option value="IM">Image</option>
                        // <option value="VI">Video</option>
                        // <option value="AU">Audio</option>
                        // <option value="UR">URI</option>
                        // <option value="LO">Location</option>
                        // <option value="EN">Enumerated</option>
                        case "TE":
                            lv_inputtype = "text";
                            break;
                        case "TA":
                            input = document.createElement("textarea");
                            input.setAttribute("rows", "3");
                            break;
                        case "DA":
                            lv_inputtype = "date";
                            break;
                        case "IM":
                        case "AU":
                        case "VI":
                            lv_inputtype = "file";
                            input.className = "custom-file-input"
                            break;
                        case "TI":
                            lv_inputtype = "time";
                            break;
                        case "UR":
                            lv_inputtype = "url";
                            break;
                        case "IN":
                        case "DE":
                            lv_inputtype = "number";
                            break;
                        case "EN":
                            var datalist = document.createElement("datalist");
                            datalist.id = "myEnumList";
                            datalist.children = list;

                            var list = "";
                            var enumList = JSON.parse(fields[i].enumvals);
                            for (var j = 0; j < enumList.enums.length; j++) {
                                list += '<option value="' + enumList.enums[j].enum + '"></option>';
                            }
                            input.setAttribute("list", "myEnumList");
                            break;
                    }

                    input.type = lv_inputtype === "" ? "text" : lv_inputtype;
                    input.id = fields[i].fieldlabel;
                    input.className = "floatLabel"
                    input.name = fields[i].fieldlabel;
                    input.width = "100%";

                    if (fields[i].isRequired === true || fields[i].isRequired === 'Yes') {
                        input.required = true;
                    }

                    container.append(input);

                    if (fields[i].fieldtype == "EN") {
                        container.append(datalist);
                    }
                    form.appendChild(container);

                    if (fields[i].fieldtype == "EN") {
                        var my_list = document.getElementById("myEnumList");
                        my_list.innerHTML = list;
                    }


                }

                container = document.createElement("div");
                container.className = "form-group";

                var input = document.createElement("input");
                input.type = "button";
                input.value = "Post it!";
                input.className = "btnNewPost";
                input.id = "newPostBtn";
                input.onclick = function () {
                    onCreateNewPost();
                };

                container.append(input);
                form.appendChild(container);


            }
        } else {
            var input = document.createElement("input");
            input.type = "button";
            input.value = "Post it!";
            input.className = "btnNewPost";
            input.id = "newPostBtn";
            input.onclick = function () {
                onCreateNewPost();
            };

            container.append(input);
            form.appendChild(container);
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

function onCreateNewPost() {


    if (document.getElementById("post_name").value === "") {
        showerror("Post title cannot be empty!");
        return;
    }

    if (document.getElementById("post_description").value === "") {
        showerror("Post description cannot be empty!");
        return;
    }

    if (document.getElementById("post_tags").value === "") {
        showerror("Semantic tags cannot be empty!");
        return;
    }


    var form = document.getElementById("postForm");
    var allElements = form.elements;
    for (var i = 0, l = allElements.length; i < l; ++i) {
        // allElements[i].readOnly = true;
        debugger;
        if (allElements[i].required === true && allElements[i].value.trim() === "") {
            showerror(allElements[i].id + " cannot be empty!");
            return;

        }

    }
    var obj = JSON.parse(formFields[0].fields.formfields);
    for (var i = 0; i < obj.theFields.length; i++) {

        if (obj.theFields[i].fieldtype === "IM" || obj.theFields[i].fieldtype === "AU" || obj.theFields[i].fieldtype === "VI") {
            // if there are any files , firt save them to give their url values:

            var data = new FormData();
            var file = document.getElementById(obj.theFields[i].fieldlabel).files[0];

            data.append('myfile', file);

            jQuery.ajax({
                type: "POST", url: "/savefile",
                async: false,
                data: data,
                contentType: false,
                processData: false,
                success:
                    function (result) {
                        obj.theFields[i].fieldvalue = result;
                        // console.dir(result);
                    },
                error: function (result) {
                    showerror("Error during file upload!");
                    //  console.dir(result);
                    // alert("hata aldık");
                }
            });
        } else {


            obj.theFields[i].fieldvalue = document.getElementById(obj.theFields[i].fieldlabel).value;
        }
    }


    fieldJson = JSON.stringify(obj);
    formFields[0].fields.formfields = fieldJson;
    console.log(obj);
    $("#formFields").val(formFields);


    var tagList = $('#post_tags').tagsinput('items');

    for (var i = 0; i < tagList.length; i++) {
        var obj = JSON.parse(tagsJson);
        obj['theTags'].push({
            "tag": tagList[i]
        });
        tagsJson = JSON.stringify(obj);
    }
    $("#postTags").val(tagsJson);


    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

    jQuery.ajax({
        type: "POST", url: "/createNewPost",
        async: false,
        data: {
            "formFields": JSON.stringify(formFields),
            "post_name": document.getElementById("post_name").value,
            "post_desc": document.getElementById("post_description").value,
            "tagsJson": tagsJson
        },
        success:
            function (result) {
                // $('.alert-success').show();
                // $("#myModal").modal();
                // success mesajı göstermek istiyorum, yapamadım
                var aarr = window.location.href.split('/');
                communityId = aarr[aarr.length - 3];
                window.location.href = "/community/" + communityId;
            },
        error: function (result) {
            showerror("Error during post creation! Details: " + result);
            // alert("hata aldık");
        }
    });

}


function showerror(msg) {
    document.getElementById('get_error').style.display = 'block';
    document.getElementById('get_error').innerHTML = '<div style="font-size: 23px; color:#cccccc; margin: 0px 0px 30px 0px;">' + msg + '</div><div style=""><span onclick="errorpopupclear();" class="buttonflat flatgrey">OK</span></div>';
}

function errorpopupclear() {
    document.getElementById('get_error').style.display = 'none';
    document.getElementById('get_error').innerHTML = '';
}


$('#post_name').keypress(function (event) {
    //event.preventDefault(); // preventing submition

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        event.preventDefault(); // preventing submition
        getPostTags();
    }
});

$("#addPostTag").on("click", function () {
    getPostTags();

});

function getPostTags() {
    jQuery.ajax({
        type: "POST", url: "/tags",
        data: {"query": $('#post_name').val()},
        success:
            function (result) {
                tagValue = "";
                console.log(result);
                if (result.results !== undefined) {
                    if (result.results.bindings !== undefined && result.results.bindings.length > 0) {
                        var tag_cnt = 0;
                        for (var i = 0; i < result.results.bindings.length; i++) {
                            if (result.results.bindings[i].itemDescription !== undefined) {
                                if (!result.results.bindings[i].itemDescription.value.includes("disambiguation")
                                    && result.results.bindings[i].itemDescription.value !== "") {
                                    tagValue = result.results.bindings[i].item.value.substring(result.results.bindings[i].item.value.lastIndexOf('/') + 1) +
                                        ": " + result.results.bindings[i].itemDescription.value
                                    $('#post_tags').tagsinput('add', tagValue);

                                }
                            }
                        }
                    }
                }
            }
    });
}



