<?php
    function getPos($array, $str) {
        $pos = strpos($array, $str) + strlen($str);
        $startPos = strpos(substr($array, $pos), "<table") + $pos;
        $endPos = strpos(substr($array, $startPos), "</table>") + strlen("</table>");
        return array($startPos, $endPos);	
    }

    function processDOM($domStr) {	
        $dom = new DOMDocument();
        $dom->loadHTML($domStr);
        $temp = array();		
        foreach($dom->getElementsByTagName('tr') as $node)
        {
            $numRatings = array();
            foreach($node->getElementsByTagName('td') as $td) {
                $val = $td->nodeValue;
                if(is_numeric($val)) {
                    array_push($numRatings, $val);
                }
            }
            array_push($temp, $numRatings);
        }
        return $temp;
    }

	$input = file_get_contents("http://www.reuters.com/finance/stocks/analyst?symbol=MSFT.O");

    $arar = getPos($input, "Analyst Recommendations and Revisions");
    $ratings = substr($input, $arar[0], $arar[1]); 

    $ratingsArr = processDOM($ratings);
    
    $ratingsObj = array("buy" => $ratingsArr[1], "outperform" => $ratingsArr[2], "hold" => $ratingsArr[3], "underperform" => $ratingsArr[4], "sell" => $ratingsArr[5], "no" => $ratingsArr[6], "avg" => $ratingsArr[8]);

    $cr = getPos($input, "Consensus Recommendations");
    $header = substr($input, $cr[0], $cr[1]);
    echo $header;

?>