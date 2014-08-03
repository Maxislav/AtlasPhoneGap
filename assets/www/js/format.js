var format ={
    dateDecode: function(val){
        var arr = val.split('')
        var yy = '20'+arr[0]+arr[1];
        var mm =  ''+arr[2]+arr[3];
        var dd = ''+arr[4]+arr[5];
        var hh = ''+arr[6]+arr[7];
        var mi = ''+arr[8]+arr[9];
        var ss = ''+arr[10]+arr[11];

        var date = new Date(yy,mm,dd,f(hh)+options.utc,mi,ss);
        return $.format.date(date,'yyyy-MM-dd HH:mm:ss')

    }
}