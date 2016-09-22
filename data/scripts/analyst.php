<?php
    function getPos($array, $str) {
        $pos = strpos($array, $str) + strlen($str);
        $startPos = strpos(substr($array, $pos), "<table") + $pos;
        $endPos = strpos(substr($array, $startPos), "</table>") + strlen("</table>");
        return array($startPos, $endPos);	
    }

    function processDOM($domStr, $numbersOnly) {	
        $dom = new DOMDocument();
        $dom->loadHTML($domStr);
        $temp = array();		
        foreach($dom->getElementsByTagName('tr') as $node)
        {
            $numRatings = array();
            foreach($node->getElementsByTagName('td') as $td) {
                $val = $td->nodeValue;
                if(!$numbersOnly or is_numeric($val)) {
                    array_push($numRatings, $val);
                }
            }
            array_push($temp, $numRatings);
        }
        return $temp;
    }

	$input = file_get_contents("http://www.reuters.com/finance/stocks/analyst?symbol=ORCL");

    /* Analyst Recommendations */
    $arar = getPos($input, "Analyst Recommendations and Revisions");
    $ratings = substr($input, $arar[0], $arar[1]); 

    $ratingsArr = processDOM($ratings, true);
    
    $ratingsObj = array("buy" => $ratingsArr[1], "outperform" => $ratingsArr[2], "hold" => $ratingsArr[3], "underperform" => $ratingsArr[4], "sell" => $ratingsArr[5], "no" => $ratingsArr[6], "avg" => $ratingsArr[8]);

    /* Consensus Recommendations */
    $cr = getPos($input, "Consensus Recommendations");
    $header = substr($input, $cr[0], $cr[1]);

    $headerArr = processDOM($header, false);

    $headerObj = array("consensus" => $headerArr[1][0], "esteps" => substr($headerArr[1][1], 8));
	
    /* Consensus Estimates */
    $cea = getPos($input, "Consensus Estimates Analysis");
    $estimates = substr($input, $cea[0], $cea[1]);

    $estimatesArr = processDOM($estimates, false);
    $intersect = array(1 => 0, 2 => 0, 3 => 0, 4 => 0, 5 => 0);
    $revEstArr = array();
    $epsEstArr = array();
    echo $estimates;

    $ceArray = 'revEstArr';
    for($i = 0; $i < count($estimatesArr) - 1; $i++) {
        if($estimatesArr[$i][0] == "Earnings (per share)") {
            $ceArray = 'epsEstArr';
        }
        if(count($estimatesArr[$i]) == 6) {
            array_push(${$ceArray}, $estimatesArr[$i]);
        }
    }
    $estimatesObj = array("revEstimates" => $revEstArr, "epsEstimates" => $epsEstArr, "ltGrowthRate" => $estimatesArr[count($estimatesArr) - 1]);
    echo json_encode($estimatesObj);

?>