<?php
    //Example with ticker: GOOGL
    require 'vendor/autoload.php';
    use GuzzleHttp\Client;

    $client = new Client();
    $res = $client->get('https://api.tiingo.com/tiingo/daily/googl', [
        'headers' => [
            'Content-type' =>  'application/json',
            'Authorization'     => 'Token ebe2dbfefbee23e974b77c3dece3eeec685fd510'
        ]
    ]);

    echo $res->getBody();               
?>