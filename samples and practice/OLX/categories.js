function loadJSON(callback) {

	var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', 'categoriesjson.js', true);
	xobj.onreadystatechange = function () {
		if (xobj.readyState == 4 && xobj.status == "200") {

			callback(xobj.responseText);
		}
	};
	xobj.send(null);

}

function init() {


	$("#firstMenu").hide();
	$("#secondMenu").hide();
	// Parse JSON string into object
	var actual_JSON = window.testdata;

	for (var key in actual_JSON.categories) {
		if (actual_JSON.categories.hasOwnProperty(key)) {

			var selectedObj = actual_JSON.categories[key];
			var jj = encodeURIComponent(JSON.stringify(selectedObj));


			$("#containar").append('<a href="#" data="' + jj + '" id="' + selectedObj.id + '" "><img  src="images' + selectedObj.img + '" alt="' + selectedObj.name + '" border="0"/></a> ');



			$("#" + selectedObj.id).click(function (event) {

				callme(JSON.parse(decodeURIComponent(this.getAttribute("data"))));
			});


		}
	}


}

function callme(value) {

	$("#firstMenu").empty();
	$("#firstMenu").hide();
	$("#secondMenu").empty();
	$("#secondMenu").hide();


	if (!$.isEmptyObject(value.children)) {

		for (var key in value.children) {
			if (value.children.hasOwnProperty(key)) {
				var selectedObj = value.children[key];
				var jj = encodeURIComponent(JSON.stringify(selectedObj));
				var imageurl = selectedObj.img ? selectedObj.img : "";
				$("#firstMenu").append('<a href="#" data="' + jj + '"  id="' + selectedObj.id + selectedObj.code + '"><img  src="/images' + imageurl + '" alt="' + selectedObj.name + '" border="0"/></a> ');

				$("#" + selectedObj.id + selectedObj.code).click(function (e) {

					callSecondList(JSON.parse(decodeURIComponent(this.getAttribute("data"))));
				});
			}
		}

		$("#firstMenu").show();


	}

}


function callSecondList(value) {

	$("#secondMenu").empty();
	$("#secondMenu").hide();


	if (!$.isEmptyObject(value.children)) {

		for (var key in value.children) {
			if (value.children.hasOwnProperty(key)) {
				var selectedObj = value.children[key];
				var jj = encodeURIComponent(JSON.stringify(selectedObj));
				var imageurl = selectedObj.img ? selectedObj.img : "";
				$("#secondMenu").append('<a href="#" data="' + jj + '"  id="' + selectedObj.id + selectedObj.code + '"><img  src="/images' + imageurl + '" alt="' + selectedObj.name + '" border="0"/></a> ');

				$("#" + selectedObj.id + selectedObj.code).click(function (e) {
				});
			}
		}

		$("#secondMenu").show();


	}

}


setTimeout(function () {
	init();
}, 3000);

