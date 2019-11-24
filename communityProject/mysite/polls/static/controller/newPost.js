function onLoad() {
    console.log(formFields);
    var row = ""
    if (formFields.length > 0) {
        if (formFields[0].fields.formfields !== undefined) {
            var myFormFields = JSON.parse(formFields[0].fields.formfields);
            if (myFormFields.theFields !== undefined) {
                var fields = myFormFields.theFields;
                
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


            }
        }
    }
}
