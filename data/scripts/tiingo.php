<?php
    // $opts = array(
    //     'http'=>array(
    //         'method'=>"GET",
    //         'header'=>"Content-type: application/json" .
    //                 "Authorization: Token ebe2dbfefbee23e974b77c3dece3eeec685fd510" 
    //     )
    // );
    
    // $context = stream_context_create($opts);

    // $file = file_get_contents('https://api.tiingo.com/tiingo/daily/googl', false, $context); 
    // echo json_encode($file);
    echo "loaded";
    echo file_get_contents('https://api.tiingo.com/tiingo/daily/googl?token=ebe2dbfefbee23e974b77c3dece3eeec685fd510');
?>