var map, view;
var mountains = [
	{
		'name' : 'Mount McKinley',
		'location' : [63.096635, -151.007021],
		'height' : 20322
	},
	{
		'name' : 'Mount Logan',
		'location' : [60.566985, -140.405416],
		'height' : 19551
	},
	{
		'name' : 'Pico de Orizaba',
		'location' : [19.029981, -97.268374],
		'height' : 18491
	},
	{
		'name' : 'Mount Saint Elias',
		'location' : [60.290295, -140.930777],
		'height' : 18009
	},
	{
		'name' : 'Popocateptl',
		'location' : [19.022756, -98.622976],
		'height' : 17802
	},
	{
		'name' : 'Mount Foraker',
		'location' : [62.960382, -151.408264],
		'height' : 17402
	},
	{
		'name' : 'Mount Lucania',
		'location' : [61.020884, -140.464249],
		'height' : 17257
	},
	{
		'name' : 'Iztaccihatl',
		'location' : [19.178623, -98.642079],
		'height' : 17159
	},
	{
		'name' : 'King Peak',
		'location' : [40.776392, -110.372741],
		'height' : 16972
	},
	{
		'name' : 'Mount Steele',
		'location' : [61.091946, -140.306793],
		'height' : 16644
	}
];
require([
	'esri/Map', 
	'esri/views/SceneView',
	'esri/geometry/Point',
	'dojo/dom-construct',
	'dojo/on',
	'dojo/domReady!'
], function (Map, SceneView, Point, domConstruct, on) {
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
		basemap : "hybrid"
	});

	view = new SceneView({
		container : "viewDiv",
		map : map//,
		//center : center
	});

	view.then(function (v) {
		// v.animateTo({scale : 60000, tilt : 60 });
		initiateTour(45);
		showPeak(0);
	});

	var curTilt;
	var incdec = -1;
	function initiateTour(curTilt) {
		if(curTilt == 30) {
			incdec = 2.5;
		} else if(curTilt == 90) {
			incdec = -2.5;
		}
		view.animateTo({tilt : curTilt += incdec, heading : view.camera.heading += 1}).then(function (r) {
			setTimeout(function () {
				initiateTour(curTilt);
			}, 500);
		})
	}

	function showPeak (id) {
		var point = new Point({
			latitude : mountains[id].location[0],
			longitude : mountains[id].location[1]
		});
		view.animateTo({center : point, scale : 150000});
	}
	
});