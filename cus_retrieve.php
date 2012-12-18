<?php

header('Content-type: application/json');
require './lib/Stripe.php';

include('includes/config.inc.php');

// Tell log4php to use our configuration file.
include('log4php/Logger.php');
Logger::configure('log4php.xml');

// Fetch a logger, it will inherit settings from the root logger
$log = Logger::getLogger('StripeCustomerRetrieve');

//Response JSON
$response = array();

$log->info("Retrieving Customer...");
if ($_POST) {

    // setting api secret key
    $log->info("seting api key...");
    
    Stripe::setApiKey(SK);

    try {
        if (!isset($_POST['cusToken'])) {

            $log->error("customer Token was not received correctly...");
            throw new Exception("The customer Token was not received correctly");
        }
       
        $log->info("customer Token was received correctly...");
        // creating customer object 
    
      $card = Stripe_Customer::retrieve($_POST['cusToken']);
       

        $log->info("Customer retrieved successfully...");

        $response["message"] = 'Success';
         $response["name"] = $card->active_card->name;
        $response["add1"] = $card->active_card->address_line1;
        $response["add2"] = $card->active_card->address_line2;
        $response["city"] = $card->active_card->address_city;
        $response["state"] = $card->active_card->address_state;
        $response["zip"] = $card->active_card->address_zip;
        $response["last4"] = $card->active_card->last4;
        $response["month"] = $card->active_card->exp_month;
        $response["year"] = $card->active_card->exp_year;
    } catch (Exception $e) {

        // if payment object not successfully created
        $log->info("retrievement was not successful...");
        $log->error($e->getMessage());

        $response["message"] = $e->getMessage();
        
    }
    echo json_encode($response);
}
exit;
?>
