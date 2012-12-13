<?php

header('Content-type: application/json');
require './lib/Stripe.php';
include('includes/config.inc.php');

// Tell log4php to use our configuration file.
include('log4php/Logger.php');
Logger::configure('log4php.xml');

$log = Logger::getLogger('StripePaymentretrieve');

$response = array();

$log->info("setting api secret key");
// setting api secret key

Stripe::setApiKey(SK);


if (isset($_POST['id'])) {

    $det = Stripe_Charge::retrieve($_POST['id']);

    $log->info("set retrieve id");

    $response['state'] = $det->card->address_state;
    $response['year'] = $det->card->exp_year;
    $response['add1'] = $det->card->address_line1;
    $response['add2'] = $det->card->address_line2;
    $response['city'] = $det->card->address_city;
    $response['last4'] = $det->card->last4;
    $response['name'] = $det->card->name;
    $response['zip'] = $det->card->address_zip;
    $response['month'] = $det->card->exp_month;
    
} else {
    $log->error('Invalid retrieve id');
}

echo json_encode($response);

exit;
?>
