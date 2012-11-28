<?php

header('Content-type: application/json');
require './lib/stripe.php';
if ($_POST) {
    Stripe::setApiKey("sk_test_fYUN8cMnv3xKCaTZjUG0Jxpv");
    $response = '';
    try {
        if (!isset($_POST['stripeToken']))
            throw new Exception("The Stripe Token was not generated correctly");
        $card = Stripe_Charge::create(array("amount" => $_POST['amount'] . '00',
                    "currency" => "usd",
                    "card" => $_POST['stripeToken']));
        $response["message"] = 'Your payment was successful.';
        $response["id"] = $card->id;
    } catch (Exception $e) {
        $response["message"] = $e->getMessage();
        $response["id"] = '0';
    }
    echo json_encode($response);
}
?>
