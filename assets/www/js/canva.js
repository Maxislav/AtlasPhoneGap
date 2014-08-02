var canva = {
    point: null,
    blink: function (_canvas) {
        var canvas = _canvas;
        canvas.width = 50;
        canvas.height = 50;
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 0;
        time();
        var c = 0;

        var timeOut

        function time() {
            setTimeout(function () {
                radius++
                if (24<radius) {
                    radius = 0;
                    c++
                }
                if (c < 10) {
                    clear();
                    draw(radius);
                    time()
                } else {
                    clear();
                   // map.removeLayer(marker)
                }


            }, 30)
        }

        function clear() {
            context.clearRect(0, 0, 50, 50);
        }

        function draw(_r) {
            var radius = _r;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            var grd = context.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
            // light blue
            grd.addColorStop(0, 'rgba(255,0,0,' + (25 - radius) / (radius + 25) + ')');
            //grd.addColorStop(0.1, 'rgba(255,0,0,' + (25 - radius) / (radius + 25) + ')');
            // dark blue
            grd.addColorStop(1, 'rgba(255,0,0,' + (25 - radius) / (radius + 25) + ')');
            context.fillStyle = grd;
            context.fill();
        }
    },
    stat: function(marker){
        var canvas = marker._icon.getElementsByTagName('canvas')[0];
        var radius = 8;
        canvas.width = 50;
        canvas.height = 50;
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#FF9328';
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = '#FF0000';
        context.stroke();
    }
}