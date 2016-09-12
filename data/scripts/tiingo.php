<?php
    $url = "https://api.tiingo.com/tiingo/daily/" . $_GET["ticker"] . "?token=ebe2dbfefbee23e974b77c3dece3eeec685fd510";
    echo json_encode(file_get_contents($url));
?>