var map;
var f = parseFloat;
var points = {};
var options ={
    utc: 3
}
var app = {
    init: function () {
        var w = window.innerWidth;
        var h = $(window).height();
        //alert(h)
        /* document.getElementById('map').style.height = h + 'px';
         document.getElementById('map').style.width = '100%';*/
        // document.body.style.height = h + 'px';
        //document.getElementById('map').style.height = h + 'px';
        document.getElementsByClassName('main')[0].style.height = h + 'px';
        this.initMap();
        /*document.addEventListener("deviceready", onDeviceReady, false);
         function onDeviceReady(){
         alert('ready')
         }*/
        // this.addMarker([50.43, 30.5])
        this.getPoints()

    },
    initMap: function () {
         map = L.map('map').setView([50.43, 30.5], 12);
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'examples.map-i86knfo3'
        }).addTo(map);
        this.events()

    },
    events: function(){
        map.on('drag', drag);
        map.on('zoomend', setZoom)

        var footer = $('.footer');
        var elLatLng = footer.find('.latLng');
        var elZoom = footer.find('.zoom');
        elLatLng.html(getLatLngMap())
        elZoom.html(getZoom())

        function drag(){
            elLatLng.html(getLatLngMap())
        }
       function getLatLngMap(){
           return '<nobr>Lat: '+f(map.getCenter().lat).toFixed(5) + "   Lng:"+
               f(map.getCenter().lng).toFixed(5)+'</nobr>';
       }
        function setZoom(){
            elZoom.html(getZoom())
        }
        function getZoom(){
            return 'Zoom: '+ map.getZoom()
        }
    },
    getPoints: function(){
        var s = this;
        $.ajax({
            method: 'post',
            data:{
                login: 'admin!',
                pass: '1111'
            },
           // url: 'php/getpoints.php',
            url: 'http://178.62.44.54/php/getpoints.php',
            success: function(d){
                try{
                  points = JSON.parse(d);
                    s.addPoitsToMap()
                }catch (err){
                    console.log(err)
                }
                console.log(points)
            },
            error: function(d){
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
    formatingPoints: function(){

      for(var opt in points){
         // points[opt]._date =

      }
    },
    addPoitsToMap: function(){
        showParams.setList(points);
        for(var opt in points){
            var point = points[opt]
            this.addMarker([f(point.lat), f(point.lng)]);
        }
    },
    addMarker: function(latLng){
        var myIcon = L.divIcon({
            className: 'my-div-icon',
            html: '<canvas></canvas><canvas></canvas><canvas></canvas><canvas></canvas>',
            iconSize: [50, 50],
            iconAnchor: [25, 25]
        });
        var marker = L.marker(latLng, {icon: myIcon}).addTo(map);
        canva.stat(marker)
        var canvas = marker._icon.getElementsByTagName('canvas');
        var c = 0;
        time();
        function time(){
            c++
            setTimeout(function(){
                new canva.blink(canvas[c])

                if (c<3){
                    time()
                }
            }, 149)
        }
    }
}