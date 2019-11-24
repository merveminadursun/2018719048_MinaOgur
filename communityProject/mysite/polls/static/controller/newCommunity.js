$('#com_name').keypress(function (event) {
    event.preventDefault();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        jQuery.ajax({
            type: "POST", url: "/tags",
            data: {"query": $('#com_name').val()},
            success:
                function (result) {
                    tagValue = "";
                    console.log(result);
                    if (result.results !== undefined) {
                        if (result.results.bindings !== undefined && result.results.bindings.length > 0) {
                            var tag_cnt = 0;
                            for (var i = 0; i < result.results.bindings.length; i++) {
                                if (result.results.bindings[i].itemDescription !== undefined) {
                                    if (!result.results.bindings[i].itemDescription.value.includes("disambiguation")) {
                                        // if (i < result.results.bindings.length - 1) {
                                        //     tagValue += result.results.bindings[i].itemDescription.value + ","
                                        // } else {
                                        //     tagValue += result.results.bindings[i].itemDescription.value
                                        // }
                                        tagValue = result.results.bindings[i].itemDescription.value
                                        $('#com_tags').tagsinput('add', tagValue);

                                        // tag_cnt++;
                                        // $('#com_tags').tagsinput('add', {
                                        //     "value": tag_cnt,
                                        //     "text": result.results.bindings[i].itemDescription.value
                                        // });
                                    }
                                }

                            }
                            // console.log(tagValue)
                            //  $('#com_tags').tagsinput(tagValue);

                        }
                    }
                    // window.location.href = "/";
                }
        });
    }
});


//
//
//
// $('#com_tags').tagsinput({
//      tagClass: function (item) {
//          switch (item.continent) {
//              case 'Europe'   :
//                  return 'label label-info';
//              case 'America'  :
//                  return 'label label-important';
//              case 'Australia':
//                  return 'label label-success';
//              case 'Africa'   :
//                  return 'badge badge-inverse';
//              case 'Asia'     :
//                  return 'badge badge-warning';
//          }
//      },
//      itemValue: 'value',
//      itemText: 'text',
//      source: function (query) {
//          return $.getJSON('cities.json');
//      }
//  });
//
//  $('#com_tags').tagsinput('add', {"value": 1, "text": "Amsterdam", "continent": "Europe"});
//  $('#com_tags').tagsinput('add', {"value": 4, "text": "Washington", "continent": "America"});
//  $('#com_tags').tagsinput('add', {"value": 7, "text": "Sydney", "continent": "Australia"});
//  $('#com_tags').tagsinput('add', {"value": 10, "text": "Beijing", "continent": "Asia"});
//  $('#com_tags').tagsinput('add', {"value": 13, "text": "Cairo", "continent": "Africa"});