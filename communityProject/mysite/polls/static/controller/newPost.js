function onLoad() {
    console.log(formFields);
    var row = ""
    if (formFields.length > 0) {
        if (formFields[0].fields.formfields !== undefined) {
            var myFormFields = JSON.parse(formFields[0].fields.formfields);
            if (myFormFields.theFields !== undefined) {
                var fields = myFormFields.theFields;

                fields.sort(function (a, b) {
                    var pos1 = Number(a.fieldposnr);
                    var pos2 = Number(b.fieldposnr);
                    return pos1 - pos2;
                });


                var form = document.getElementById("postForm");

                for (var i = 0; i < fields.length; i++) {

                    var container = document.createElement("div");
                    container.className = "form-group";

                    var label = document.createElement("label");
                    label.setAttribute("for", fields[i].fieldlabel);
                    var title = document.createTextNode(fields[i].fieldlabel);
                    label.appendChild(title);
                    container.append(label);

                    var input = document.createElement("input");
                    input.type = "text";
                    input.id = fields[i].fieldlabel;
                    input.className = "floatLabel"
                    input.name = fields[i].fieldlabel;
                    input.width = "100%";

                    container.append(input);
                    form.appendChild(container);
                }

                container = document.createElement("div");
                container.className = "form-group";

                var input = document.createElement("input");
                input.type = "submit";
                input.value = "Post it!";
                input.className = "btnNewPost";
                input.id = "newPostBtn";

                container.append(input);
                form.appendChild(container);


            }
        }
    }
}
