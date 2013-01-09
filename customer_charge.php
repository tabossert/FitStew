<?php

header('Content-type: application/json');
require './lib/Stripe.php';

include('includes/config.inc.php');

// Tell log4php to use our configuration file.
include('log4php/Logger.php');
Logger::configure('log4php.xml');

// Fetch a logger, it will inherit settings from the root logger
$log = Logger::getLogger('StripePaymentProcessor');

//Response JSON
$response = array();

$log->info("Charging payment form customer...");
if ($_POST) {

    // setting api secret key
    $log->info("seting api key...");
    $log->info($_POST['name']);
    Stripe::setApiKey(SK);

    try {
        if (!isset($_POST['cusToken'])) {

            $log->error("Stripe customer Token was not received correctly...");
            throw new Exception("The Stripe customer Token was not received correctly");
        }
        $log->info("Stripe customer Token was received correctly...");
        // creating charge object 
        $card = Stripe_Charge::create(array("amount" => $_POST['amount'],
                    "currency" => "usd",
                    "customer" => $_POST['cusToken']));

        $log->info("payment was successful...");

        $response["message"] = 'Your payment was successful.';
        $response["id"] = $card->id;
    } catch (Exception $e) {

        // if payment object not successfully created
        $log->info("payment was not successful...");
        $log->error($e->getMessage());

        $response["message"] = $e->getMessage();
        $response["id"] = '0';
    }
    echo json_encode($response);
}
exit;
?>
