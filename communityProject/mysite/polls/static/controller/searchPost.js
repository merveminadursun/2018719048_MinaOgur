var fieldList = [];

var filterArray = [];

function onLoad() {
    console.log(communityDataTypes);

    var myFormFields = JSON.parse(communityDataTypes[0].formfields).theFields;
    console.log(myFormFields);
    fieldList = myFormFields;
    var select = document.getElementById("dt_fields");

    select.options[select.options.length] = new Option("Post Name", "pn");
    select.options[select.options.length] = new Option("Post Description", "pd");
    select.options[select.options.length] = new Option("Semantic Tag", "st");

    for (var i = 0; i < myFormFields.length; i++) {
        select.options[select.options.length] = new Option(myFormFields[i].fieldlabel, myFormFields[i].fieldposnr);
    }

}

function addSearchField(oEvent) {
    var parent = $(oEvent).parent().parent();
    var clone = parent.clone();
    clone.children().eq(2).children().eq(0).val("");
    clone.insertAfter(parent);
}

function removeSearchField(oEvent) {
    var parent = $(oEvent).parent().parent();
    parent.remove();
}

function searchPost() {
    document.getElementById("postRows").innerHTML = "";
    filterArray = [];
    var oFilter = {
        "filterField": "",
        "filterOperation": "",
        "filterValue": ""
    }
    var table = document.getElementById('myTable');
    var tableRows = document.getElementById('myTable').rows.length;

    for (var i = 1; i < tableRows; i++) {

        var oFilter = {
            "filterField": table.rows[i].cells[0].children[0].value,
            "filterOperation": table.rows[i].cells[1].children[0].value,
            "filterValue": table.rows[i].cells[2].children[0].value
        }
        filterArray.push(oFilter);
    }
    console.log(filterArray);


    jQuery.ajax({
        type: "GET", url: "/getPostsOfDataType",
        data: {"dt_id": communityDataTypes[0].id, "cmn_id": communityDataTypes[0].community_id},
        async: false,
        success:
            function (result) {
                console.log(result);

                var postList = result.posts;
                var postTags = result.postTags;
                filterPosts(postList, postTags);

            },
        error:
            function (returnVal) {
                console.log(returnVal);
                if (returnVal.status === 404) {

                }

            }
    });
}

function filterPosts(postList, postTags) {
    var filtered_posts = postList.filter(function (i) {

        var postFields = JSON.parse(i.post_data).theFields;

        for (var j = 0; j < filterArray.length; j++) {
            switch (filterArray[j].filterField) {
                case "pn":
                    if (filterArray[j].filterOperation === 'CS') {
                        return i.post_name.toLowerCase().includes(filterArray[j].filterValue.toLowerCase());
                    } else {
                        if (filterArray[j].filterOperation === 'EQ') {
                            return i.post_name.toLowerCase() === filterArray[j].filterValue.toLowerCase();
                        } else return true;
                    }
                    break;
                case "pd":
                    if (filterArray[j].filterOperation === 'CS') {
                        return i.post_desc.includes(filterArray[j].filterValue);
                    } else {
                        if (filterArray[j].filterOperation === 'EQ') {
                            return i.post_desc = filterArray[j].filterValue;
                        } else return true;
                    }
                    break;
                case "st":
                    break;
                default:
                    var newfilteredFlds = postFields.filter(function (el) {
                        if (el.fieldposnr === filterArray[j].filterField) {
                            if (el.fieldtype !== "EN") {
                                return el.fieldvalue.includes(filterArray[j].filterValue);
                            }
                        }
                    });
                    postFields = newfilteredFlds;
                    return (postFields.length > 0);
                    break;
            }
        }
    });

    console.log(filtered_posts);

    addPostTiles(filtered_posts);
}

function addPostTiles(postList) {

    for (var i = 0; i < postList.length; i++) {
        var colDiv = document.createElement("div");
        colDiv.setAttribute("class", "col-md-4");

        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card mb-4 shadow-sm");

        var bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("class", "card-body");

        var postH1 = document.createElement("h1");
        postH1.setAttribute("class", "commHeader");
        var header = document.createTextNode(postList[i].post_name);
        postH1.appendChild(header);

        var postH2 = document.createElement("p");
        postH2.setAttribute("class", "card-text");
        var desc = document.createTextNode(postList[i].post_desc);
        postH2.appendChild(desc);

        var cnt = document.createElement("div");
        cnt.setAttribute("class", "d-flex justify-content-between align-items-center");


        var btngrp = document.createElement("div");
        btngrp.setAttribute("class", "btn-group");

        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.setAttribute("class", "btn btn-sm btn-outline-secondary");

        var adiv = document.createElement("a");
        adiv.setAttribute("class", "btnCommView")
        var link = "/community/post/" + postList[i].id;
        adiv.setAttribute("href", link)
        var txt = document.createTextNode("View");
        adiv.appendChild(txt);
        btn.appendChild(adiv);

        btngrp.appendChild(btn);
        cnt.appendChild(btngrp);

        bodyDiv.appendChild(postH1);
        bodyDiv.appendChild(postH2);
        cardDiv.appendChild(bodyDiv);
        cardDiv.appendChild(cnt);
        colDiv.appendChild(cardDiv);

        document.getElementById("postRows").appendChild(colDiv);

    }

}



// <div class="d-flex justify-content-between align-items-center">
//                                     <div class="btn-group">
//                                         <button type="button" class="btn btn-sm btn-outline-secondary">
//                                             <a href="community/{{ Community.id }}" class="btnCommView">
//                                                 View
//                                             </a>
//                                         </button>
//                                     </div>
//                                     <small class="text-muted">{{ Community.create_date }}</small>
//                                 </div>