
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>jQuery UI Autocomplete Remote DataSource</title>
    <link
     rel="stylesheet"
     href="http://code.jquery.com/ui/1.9.0/themes/smoothness/jquery-ui.css" />
    <style type="text/css">
        .ui-helper-hidden-accessible { position: absolute; left: -9999px; }
    </style>
    <script src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
    <script src="http://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>    
    <script type="text/javascript">
        $(function () {
            var getData = function (request, response) {
                $.getJSON(
                    "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
                    function (data) {
                        response(data);
                    });
            };

            var selectItem = function (event, ui) {
                $("#myText").val(ui.item.value);
            }

            $("#myText").autocomplete({
                source: getData,
                select: selectItem,
                minLength: 4
            });
        });
    </script>
</head>
<body>
    <h2>jQuery UI Autocomplete Remote DataSource</h2>
    <p>Type minimum 4 characters in the textbox</p>
    <input id="myText" />
</body>
</html>
