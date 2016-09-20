<?php
	$arr = file_get_contents("http://www.reuters.com/finance/stocks/analyst?symbol=MSFT.O");

    $pos = strpos($arr, "Analyst Recommendations and Revisions") + strlen("Analyst Recommendations and Revisions");
	$startPos = strpos(substr($arr, $pos), "<table") + $pos;
	$endPos = strpos(substr($arr,$startPos), "</table>") + strlen("</table>");
    $ratings = substr($arr, $startPos, $endPos);

echo $ratings;
$dom = new DOMDocument();
$dom->loadHTML($ratings);

foreach($dom->getElementsByTagName('tr') as $node)
{
    foreach($)
}
?>