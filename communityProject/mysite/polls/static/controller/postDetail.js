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


    } else {
    }

}

function editPost() {
    if (document.getElementById("userId") === null || document.getElementById("postOwner").value !== document.getElementById("userId").value) {
        showerror("You are not authorized for editing this post.");
    } else {
        document.getElementById('postEditBtn').style.display = 'none';
        document.getElementById('postCancelBtn').style.display = 'block';
        var form = document.getElementById("postForm");
        var allElements = form.elements;
        for (var i = 0, l = allElements.length; i < l; ++i) {
            // allElements[i].readOnly = true;
            allElements[i].disabled = false;
        }


        var container = document.createElement("div");
        container.className = "form-group";
        container.id ="updatePostBtnDiv"
        var input = document.createElement("input");
        input.type = "button";
        input.value = "Update it!";
        input.className = "btnNewPost";
        input.id = "updatePostBtn";
        input.onclick = function () {
            onUpdatePost();
        };

        container.append(input);
        form.appendChild(container);
    }
}

function cancelEdit() {
    document.getElementById('postEditBtn').style.display = 'block';
    document.getElementById('postCancelBtn').style.display = 'none';
    ul = document.getElementById("postForm");
    node = ul.childNodes[ul.childNodes.length - 1];
    ul.removeChild(node);
}

function showerror(msg) {
    document.getElementById('get_error').style.display = 'block';
    document.getElementById('get_error').innerHTML = '<div style="font-size: 23px; color:#cccccc; margin: 0px 0px 30px 0px;">' + msg + '</div><div style=""><span onclick="errorpopupclear();" class="buttonflat flatgrey">OK</span></div>';
}

function errorpopupclear() {
    document.getElementById('get_error').style.display = 'none';
    document.getElementById('get_error').innerHTML = '';
}