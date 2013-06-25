<?php

$wordArr = array();


function wordPosition($word,$data) {
  $wordPos = array_search($word,$data);
  return $wordPos;
}


function wordCount($data) {
  $wordCnt = array_count_values($data);
  return $wordCnt;
}

function getWords($file) {
  $data = file_get_contents($file);
  $wordArr = explode(",",$data);
  return $wordArr;
}

$words = getWords('words.csv');

switch ($argv[1]) {
  case "count":  
    $wordCnt = wordCount($words);
    print_r($wordCnt);
    echo "Total words in document " . count($words) . "\n";
    break;
  case "position":
    $wordPos = wordPosition($argv[2],$words);
    echo $wordPos;
    break;
}

?>
