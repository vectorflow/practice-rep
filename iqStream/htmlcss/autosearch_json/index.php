<html>
<!-- demo of a jquery autocomplete widget using a php json data source -->
<head>
  <!-- JS file -->
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/easy-autocomplete/1.3.5/jquery.easy-autocomplete.min.js"></script>
<!-- CSS file -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/easy-autocomplete/1.3.5/easy-autocomplete.min.css">
<!-- Additional CSS Themes file - not required-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/easy-autocomplete/1.3.5/easy-autocomplete.themes.min.css">
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script>
$( document ).ready(function() {
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
        return false;
    }

    $("#myText").autocomplete({
        source: getData,
        select: selectItem,
        minLength:4,
        change: function() {
            $("#myText").val("").css("display", 2);
        }
    });
});
});
</script>
</head>
<!-- (3) very basic html body for our example -->
<body>
<label for="state">Country:</label>
<input id="myText" />
</body>
</html>
