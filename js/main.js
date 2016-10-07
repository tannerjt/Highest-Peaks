require([
	'esri/Map',
	'esri/views/SceneView',
	'esri/geometry/Point',
	'dojo/dom-construct',
	'dojo/on',
	'js/data/peaks.js',
	'dojo/domReady!'
], function (Map, SceneView, Point, domConstruct, on, peaks) {
	var mountains = peaks;
	var map, view;
	// add highest peaks to dom
	for(var i = 0; i < mountains.length; i++) {
		var wikiLink = domConstruct.create("a", {
			href : "http://en.wikipedia.org/wiki/"  + mountains[i].name.split(" ").join("_"),
			innerHTML : "Wikipedia",
			target : "_blank"
		});
		var peakLink = domConstruct.create("a", {
			href : i,
			innerHTML : 'Visit',
			class : 'peakLink'
		});

		domConstruct.create("li", {
			class : 'list-item',
			innerHTML : "<span class='peak-title'>" + mountains[i].name + "</span> - " +
			            mountains[i].height + " ft<br>" +
			            "<span class='glyphicon glyphicon-globe'></span> " + peakLink.outerHTML + "  -  " +
			            "<span class='glyphicon glyphicon-book'></span> " + wikiLink.outerHTML
		}, this.peakList);

	}

	var peakLinks = document.querySelectorAll('.peakLink');
	for(var i = 0; i < peakLinks.length; i++) {
		on(peakLinks[i], 'click', function (e) {
			e.preventDefault();
			showPeak(+e.target.getAttribute('href'));
		})
	}
	var center = new Point({
		latitude : 63.069296,
		longitude : -151.006813
	});

	map = new Map({
		basemap : "hybrid",
		ground: "world-elevation"
	});

	view = new SceneView({
		container : "viewDiv",
		map : map,
		center : center
	});

	view.then(function (v) {
		// v.animateTo({scale : 60000, tilt : 60 });
		// initiateTour(45);
		showPeak(0);
	});

	// var curTilt;
	// var incdec = -1;
	// function initiateTour(curTilt) {
	// 	if(curTilt == 30) {
	// 		incdec = 2.5;
	// 	} else if(curTilt == 90) {
	// 		incdec = -2.5;
	// 	}
	// 	view.animateTo({tilt : curTilt += incdec, heading : view.camera.heading += 1}).then(function (r) {
	// 		setTimeout(function () {
	// 			initiateTour(curTilt);
	// 		}, 500);
	// 	})
	// }

	function showPeak (id) {
		var point = new Point({
			latitude : mountains[id].location[0],
			longitude : mountains[id].location[1]
		});
		view.animateTo({center : point, scale : 1500000}).then(
			function () {
				view.animateTo({scale : 15000});
			}
		);
	}

});
