function onLoad() {
    console.log(postTags);
    if (postTags.length > 0) {
        if (postTags[0].fields.tag_info !== undefined) {
            var myTagJson = JSON.parse(postTags[0].fields.tag_info);
            if (myTagJson.theTags !== undefined) {
                var tags = myTagJson.theTags;
                for (var i = 0; i < tags.length; i++) {
                    $('#post_tags').tagsinput('add', tags[i].tag);

                }
            }
        }
    }

    console.log(postFields);
    console.log(postFields["theFields"]);
    var fields = postFields["theFields"];

    var row = ""
    if (fields.length > 0) {
        var form = document.getElementById("postForm");
        var container = document.createElement("div");
        container.className = "form-group";
        // if (formFields[0].fields.formfields !== undefined && formFields[0].fields.formfields !== "") {
        //     var myFormFields = JSON.parse(formFields[0].fields.formfields);
        // if (myFormFields.theFields !== undefined) {
        //     var fields = myFormFields.theFields;
        //
        //     fields.sort(function (a, b) {
        //         var pos1 = Number(a.fieldposnr);
        //         var pos2 = Number(b.fieldposnr);
        //         return pos1 - pos2;
        //     });

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
                case "DA":
                    lv_inputtype = "date";
                    break;
                case "IM":
                    input = document.createElement("img");
                    input.src = fields[i].fieldvalue;
                    break;
                    // input.height = "100%";
                    // input.width = "100%";
                case "AU":
                    input = document.createElement("audio");
                    input.controls = true;
                    break;
                case "VI":
                    input = document.createElement("iframe");
                    input.className = "embed-responsive-item";
                    input.src = fields[i].fieldvalue;
                    input.allowfullscreen = true;
                //     lv_inputtype = "file";
                //     input.className = "custom-file-input"
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
                    var enumList = JSON.parse(fields[0].enumvals);
                    for (var j = 0; j < enumList.enums.length; j++) {
                        list += '<option value="' + enumList.enums[j].enum + '"></option>';
                    }
                    input.setAttribute("list", "myEnumList");
                    break;
            }

            if (fields[i].fieldtype !== "IM" && fields[i].fieldtype !== "VI" && fields[i].fieldtype !== "AU") {
                input.type = lv_inputtype === "" ? "text" : lv_inputtype;
                input.id = fields[i].fieldlabel;
                input.className = "floatLabel"
                input.name = fields[i].fieldlabel;
                input.width = "100%";
                input.value = fields[i].fieldvalue;
                input.disabled = true;
            }


            container.append(input);

            if (fields[i].fieldtype == "AU") {
                var audioCont = document.createElement("source");
                audioCont.src = fields[i].fieldvalue;
                input.append(audioCont);
            }

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

        // var input = document.createElement("input");
        // input.type = "button";
        // input.value = "Post it!";
        // input.className = "btnNewPost";
        // input.id = "newPostBtn";
        // input.onclick = function () {
        //     onCreateNewPost();
        // };
        //
        // container.append(input);
        form.appendChild(container);


        // }
    } else {
        // var input = document.createElement("input");
        // input.type = "button";
        // input.value = "Post it!";
        // input.className = "btnNewPost";
        // input.id = "newPostBtn";
        // input.onclick = function () {
        //     onCreateNewPost();
        // };
        //
        // container.append(input);
        // form.appendChild(container);
    }

    // }
}