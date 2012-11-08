<?php

header('Content-type: application/json');
/**
 * Samurai payment processor
 */
// Tell log4php to use our configuration file.
Logger::configure('../log4php.xml');

// Fetch a logger, it will inherit settings from the root logger
$log = Logger::getLogger('SamuraiPaymentProcessor');

//Response JSON
$response = array();

//Loading the configurations
require_once dirname(__FILE__) . '/config.php';

$fname = $_POST["first_name"];
$lname = $_POST["last_name"];

$log->info("Creating payment method..");
//Create the payment method
$paymentMethod = Samurai_PaymentMethod::create(array(
            'card_number' => $_POST["card_number"],
            'expiry_month' => $_POST["expiry_month"],
            'expiry_year' => $_POST["expiry_year"],
            'cvv' => $_POST["cvv"],
            'first_name' => $fname,
            'last_name' => $lname,
            'address_1' => $_POST["address_1"],
            'address_2' => $_POST["address_2"],
            'city' => $_POST["city"],
            'zip' => $_POST["zip"]
        ));

if (!$paymentMethod->hasErrors()) {
    //Payment amount
    $amount = $_POST['amount'];
    /* Create the purchase transaction. */
    $log->info("Creating payment processor...");
    $processor = Samurai_Processor::theProcessor();
    $log->info("Executing teh purchase...");
    $purchase = $processor->purchase(
            $paymentMethod->token, $amount, # The price for the Server-to-Server Battle Axe + Shipping
            array(
        'descriptor' => 'Server-to-Server ZuneFit',
        'customer_reference' => time(),
        'billing_reference' => time()
            ));

    if ($purchase->isSuccess()) {
        $log->info("Successful purchase...");
        $response["status"] = 1; //success
        $response["message"] = 'Success'; //success
    } else {
        $referenceId = $paymentMethod->referenceId;
        $transaction = Samurai_Transaction::find($referenceId);
        $errors = $transaction->errors['system.general'];
        $error = $errors[0];
        $response["status"] = -1; //Error
        $response["message"] = $error->description; //success
    }
} else {
    $referenceId = $paymentMethod->referenceId;
    $transaction = Samurai_Transaction::find($referenceId);
    $errors = $transaction->errors['system.general'];
    $error = $errors[0];
    $response["status"] = -1; //Error
    $response["message"] = $error->description; //success
    $log->error($error->description);
}
echo json_encode($response);
exit;
?>
