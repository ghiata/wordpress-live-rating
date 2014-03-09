<?php
/*
 * This file should provide security against console hackers who might try to vote multiple times a day
 */
include_once "lib/FirebaseToken.php";

$secret = "S2CSwB0qWt0QrCqkO9bX5iD52lcuqx1dDiL6ixH1";
$tokenGen = new Services_FirebaseTokenGenerator($secret);
$token = $tokenGen->createToken(array("ip" => "192.168.13.1", "alreadyVoted"=> true));

// Get data only readable by auth.id = "example".
//$uri = "https://example.firebaseio.com/.json?auth=".$token;
var_dump($token);
?>