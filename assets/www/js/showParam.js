var showParams = {
    elLat: $('.header .lat'),
    elLng: $('.header .lng'),
    elSpeed: $('.header .speed'),
    elDate: $('.header .date'),
    elAzimuth: $('.header .azimuth'),
    elName: $('.header .name'),
    elListObj: $('.header .list-obj'),
    elCurentName: $('.header .name-object'),

    setParams: function(point){

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
                //s.elCurentName.html(param.name)
                map.panTo([f(param.lat), f(param.lng)]);
                s.elLat.html('Lat: '+param.lat)
                s.elLng.html('Lng: '+param.lng)
                s.elDate.html('Date: '+format.dateDecode(param.datetime))
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

    }

}
