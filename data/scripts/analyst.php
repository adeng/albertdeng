<?php
	$arr = file_get_contents("http://www.reuters.com/finance/stocks/analyst?symbol=MSFT.O");

    $pos = strpos($arr, "Analyst Recommendations and Revisions") + strlen("Analyst Recommendations and Revisions");
	$startPos = strpos(substr($arr, $pos), "<table") + $pos;
	$endPos = strpos(substr($arr,$startPos), "</table>") + strlen("</table>");
    $ratings = substr($arr, $startPos, $endPos);

    $dom = new DOMDocument();
    $dom->loadHTML($ratings);
	
    $ratingsArr = array();		
    foreach($dom->getElementsByTagName('tr') as $node)
    {
		$numRatings = array();
        foreach($node->getElementsByTagName('td') as $td) {
            $val = $td->nodeValue;
            if(is_numeric($val)) {
                array_push($numRatings, $val);
            }
        }
		array_push($ratingsArr, $numRatings);
    }
    $ratingsObj = array("buy" => $ratingsArr[1], "outperform" => $ratingsArr[2], "hold" => $ratingsArr[3], "underperform" => $ratingsArr[4], "sell" => $ratingsArr[5], "no" => $ratingsArr[6], "avg" => $ratingsArr[8]);

    echo json_encode($ratingsObj);

?>