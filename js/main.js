var map, view;
require([
	'esri/Map', 
	'esri/views/SceneView',
	'esri/geometry/Point',
	'dojo/domReady!'
], function (Map, SceneView, Point) {
	var center = new Point({
		latitude : 45.373,
		longitude : -121.696
	});

	map = new Map({
		basemap : "satellite"
	});

	view = new SceneView({
		container : "viewDiv",
		map : map,
		center : center
	})

	view.then(function (v) {
		// v.animateTo({scale : 60000, tilt : 60 });
		initiateTour(45);
	});

	var curTilt;
	var incdec = -1;
	function initiateTour(curTilt) {
		if(curTilt == 30) {
			incdec = 2.5;
		} else if(curTilt == 90) {
			incdec = -2.5;
		}
		view.animateTo({scale : 45000, tilt : curTilt += incdec, heading : view.camera.heading += 1}).then(function (r) {
			setTimeout(function () {
				initiateTour(curTilt);
			}, 250);
		})
	}
	
});