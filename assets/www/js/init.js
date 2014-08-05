var map;
var f = parseFloat;
var points = {};
var options = {
	utc: 3
}
var app = {
	init: function () {
		var h = $(window).height();
		document.getElementsByClassName('main')[0].style.height = h + 'px';
		this.initMap();


		$('.vhide-panel').hide();
		$('.header .params-object').css({
			visibility: 'visible'
		})
		$('.button-vhide').on('click', function () {
			if (!$(this).children('.arrow').hasClass('up')) {
				$(this).find('.arrow').addClass('up')
			} else {
				//alert('ss')
				$(this).find('.arrow').removeClass('up')
			}
			$('.vhide-panel').slideToggle()
		})
		this.getPoints()

	},
	initMap: function () {
		map = L.map('map').setView([50.43, 30.39], 12);
		L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'examples.map-i86knfo3'
		}).addTo(map);
		this.events()

	},
	events: function () {
		map.on('drag', drag);
		map.on('zoomend', setZoom)

		var footer = $('.footer');
		var elLatLng = footer.find('.latLng');
		var elZoom = footer.find('.zoom');
		elLatLng.html(getLatLngMap())
		elZoom.html(getZoom())

		function drag() {
			elLatLng.html(getLatLngMap())
		}

		function getLatLngMap() {
			return '<nobr>Lat: ' + f(map.getCenter().lat).toFixed(5) + "   Lng:" +
				f(map.getCenter().lng).toFixed(5) + '</nobr>';
		}

		function setZoom() {
			elZoom.html(getZoom())
		}

		function getZoom() {
			return 'Zoom: ' + map.getZoom()
		}
	},
	getPoints: function () {
		var s = this;
		setInterval(
			function(){
				format.elapsed()
			}
			,1000)
		$.ajax({
			method: 'post',
			data: {
				login: config.login,
				pass: config.pass
			},
			url: config.url,
			success: function (d) {
				var p = d
				try {
					p = JSON.parse(d);
				} catch (err) {
					console.log(err)
				}
				s.comparison(p);
				console.log(p);

			},
			error: function (d) {
				console.log(d)
			}
		})

		/* points = {
		 1111:{
		 lat: 50.43,
		 lng: 30.5,
		 date: 140803083455,
		 satellites: 7,
		 speed: 0
		 }
		 }*/
		//this.addPoitsToMap()
	},
	comparison: function (p) {
		var s = this

		for (var opt in p) {
			if (!points[opt]) {
				points[opt] = p[opt];
				s.addPoitsToMap(points[opt]);
				showParams.setList(p);
			}

		}

		for (var opt in p) {
			if (points[opt].datetime != p[opt].datetime) {
				for (var _parm in p[opt]) {
					points[opt][_parm] = p[opt][_parm];

				}
				s.addPoitsToMap(points[opt]);
				if(showParams.currentPoint == opt){
					showParams.setParams(points[opt])
				}

			}

		}
		setTimeout(function () {
				s.getPoints()
			}, 5000
		)

		/*for (var opt in points){
		 if(points[opt].datetime!=p[opt].dateTime){
		 addPoitsToMap()
		 }
		 }*/

	},

	addPoitsToMap: function (point) {
		this.addBlinkMarker([f(point.lat), f(point.lng)]);
		this.addStatMarker([f(point.lat), f(point.lng)], point);

	},
	addStatMarker: function (latLng, point) {
		var statIcon = L.divIcon({
			className: 'my-div-icon',
			html: '<canvas></canvas>',
			iconSize: [50, 50],
			iconAnchor: [25, 25]
		});
		var stat = L.marker(latLng, {icon: statIcon}).addTo(map);
		points[point.imei]._marker && map.removeLayer(points[point.imei]._marker);
		points[point.imei]._marker = stat;
		canva.stat(stat);
	},

	addBlinkMarker: function (latLng) {
		var myIcon = L.divIcon({
			className: 'my-div-icon',
			html: '<canvas></canvas><canvas></canvas><canvas></canvas><canvas></canvas>',
			iconSize: [50, 50],
			iconAnchor: [25, 25]
		});

		var blinkMarker = L.marker(latLng, {icon: myIcon}).addTo(map);
		var canvas = blinkMarker._icon.getElementsByTagName('canvas');
		var c = 0;
		new canva.blink(canvas[c], blinkMarker);
		time();
		function time() {
			setTimeout(function () {
				c++
				new canva.blink(canvas[c], blinkMarker)
				if (c < 3) {
					time()
				}
			}, 149)
		}
	}
}