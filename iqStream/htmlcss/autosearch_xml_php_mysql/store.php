<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<title>UI</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge;chrome=1" />
	<link  href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<script src="//code.jquery.com/jquery-2.1.0.js"></script>
	<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
	<script>
	var criteria = {}
  $.ajax({
        type: "POST",
        async: true,
        timeout: null,
        url: "store.xml",
        dataType: "xml",
        data: { xmlDoc: criteria },
        success: function (xmlResponse) {
            var data = $("COURSE", xmlResponse).map(function () {
                return {
                    value: $("COURSE_NAME", this).text(),
                    id: $("COURSE_NO", this).text()
                };
            }).get();
            $("#mycourse").autocomplete({
                source: data
            });
        }
    });
	</script>
</head>
<body>
<input id="mycourse" placeholder="Select From List / Type the Name of Course" width="200" maxlength="200">
</body>
</html>
