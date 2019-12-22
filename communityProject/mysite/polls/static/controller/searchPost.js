var fieldList = [];


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
    jQuery.ajax({
        type: "GET", url: "/getPostsOfDataType",
        data: {"dt_id": communityDataTypes[0].id, "cmn_id": communityDataTypes[0].community_id },
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
    // postList.
}