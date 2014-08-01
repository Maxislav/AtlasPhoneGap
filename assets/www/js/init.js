var app = {
		init: function() {
			//alert('dd')
			var w = window.innerWidth;
			var h = window.innerHeight;
			//alert(h)
			document.getElementById('map').style.height = h + 'px';
			document.getElementById('map').style.width = '100%';
			//var map = L.map('map').setView([51.505, -0.09], 13);
			this.initMap();
			document.addEventListener("deviceready", onDeviceReady, false);
			
			
		},
		initMap: function() {
			var map = L.map('map').setView([51.505, 30.0], 13);
			L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Imagery © <a href="http://mapbox.com">Mapbox</a>',
				id: 'examples.map-i86knfo3'
			}).addTo(map);

			
		}
		
		
}