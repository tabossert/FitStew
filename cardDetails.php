<?php

header('Content-type: application/json');
require './lib/stripe.php';


$response = array();

// setting api secret key

Stripe::setApiKey("sk_test_fYUN8cMnv3xKCaTZjUG0Jxpv");
$det = Stripe_Charge::retrieve($_POST['id']);

$response['state'] = $det->card->address_state;
$response['year'] = $det->card->exp_year;
$response['add1'] = $det->card->address_line1;
$response['add2'] = $det->card->address_line2;
$response['city'] = $det->card->address_city;
$response['last4'] = $det->card->last4;
$response['name'] = $det->card->name;
$response['zip'] = $det->card->address_zip;
$response['month'] = $det->card->exp_month;

echo json_encode($response);

exit;
?>
