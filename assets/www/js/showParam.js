var showParams = {
	currentPoint: null,
    elLat: $('.header .lat'),
    elLng: $('.header .lng'),
    elSpeed: $('.header .speed'),
    elDate: $('.header .date'),
	elTime: $('.header .time'),
	elPower:$('.header .power'),
    elAzimuth: $('.header .azimuth'),
    elName: $('.header .name'),
    elListObj: $('.header .list-obj'),
    elCurentName: $('.header .name-object'),
	elTimePassed: $('.header .time-passed'),

    setParams: function(_param){
		var s = this;

		var param = points[_param.imei]
		s.currentPoint = param.imei


		s.elLat.html('Lat: '+param.lat)
		s.elLng.html('Lng: '+param.lng)
		s.elDate.html('D: '+format.dateDecode(param.datetime))
		s.elTime.html('T: '+format.timeDecode(param.datetime));
		s.elSpeed.html('Speed: '+param.speed + ' km/h');
		s.elPower.html('Power: '+param.zaryad );

    },
    setList: function(points){
        var s = this;
        for (var opt in points){
          var elDiv = $(document.createElement('div'));
            elDiv.html(points[opt].name)
            s.elListObj.append(elDiv);
            listiner(elDiv, points[opt] )
        }

        function listiner(el, param){
            el.click(function(){
				s.setParams(param)
				map.panTo([f(param.lat), f(param.lng)]);
				app.addBlinkMarker([f(param.lat), f(param.lng)])

				s.elListObj.children('div').removeClass('active')
				el.addClass('active')

            })
        }

        var countPoints = 0;
        for (var opt in points){
            countPoints++
        }
        if(countPoints==1){
            for (var opt in points){
                map.panTo([f(points[opt].lat), f(points[opt].lng)])
            }
        }

    },
	setElapsedTime: function(val){
		this.elTimePassed.html(val)
	}

}
