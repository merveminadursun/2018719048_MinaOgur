$("#com_name").keyup(function (event) {
    debugger;
    if (event.keyCode === 13) {
        var text = "test successful";

        $.ajax({
            type: "POST",
            url: '{{ tags }}',
            data: {csrfmiddlewaretoken: '{{ csrf_token }}', text: text},
            success: function callback(response) {
                console.log(response);
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