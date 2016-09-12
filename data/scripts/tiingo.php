<?php
    $url = "https://api.tiingo.com/tiingo/daily/" . $_GET["ticker"] . "?token=ebe2dbfefbee23e974b77c3dece3eeec685fd510";
    $url2 = "https://api.tiingo.com/tiingo/daily/" . $_GET["ticker"] . "/prices?token=ebe2dbfefbee23e974b77c3dece3eeec685fd510";
    $part1 = json_decode(file_get_contents($url));
    $part2 = json_decode(file_get_contents($url2));
    echo json_encode((object) array_merge((array) $part1, (array) $part2));
?>