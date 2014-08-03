<?php
$login=$_POST["login"];
$pass=$_POST["pass"];
$hostname = 'localhost';
$username = "root";
$password = "astalavista";

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
or die('connect to database failed');
$table_db=	"monitoring";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных
$passBd = 'Mf28dwlx';
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY `id`");
while($row = mysql_fetch_array($res)){
    $passBd=$row['pass'];
    $device = $row['device'];
};

if($passBd == $pass){
    $deviceObj = json_decode($device, true);
    for ($i = 0; $i < count($deviceObj); $i++) {
        $imei = $deviceObj[$i][imei];
        $name = $deviceObj[$i][name];
        $res = mysql_query("SELECT * FROM log WHERE imei = '$imei'  ORDER BY datetime DESC LIMIT 1");

        while ($row = mysql_fetch_array($res)) {

            $points->$row['imei'] = array(
                "name" =>$name,
                "imei" => $row['imei'],
                "lat" => $row['lat'],
                "lng" => $row['lng'],
                "speed" => $row['speed'],
                "datetime" => $row['datetime'],
                "zaryad" => $row['zaryad'],
                "azimuth" => $row['azimuth'],
                "sputnik" => $row['sputnik'],
                "tc" => $row['tc'],
                "params" => $row['params'],
                "sourcedata" => $row['sourcedata']
            );
        }
    }

    $points = json_encode($points);
    echo $points;
    mysql_close($db);
}else{
    mysql_close($db);
    return null;
}
