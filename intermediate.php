<?php

define('E_FATAL', E_ERROR | E_USER_ERROR | E_PARSE | E_CORE_ERROR |
        E_COMPILE_ERROR | E_RECOVERABLE_ERROR);

define('ENV', 'dev');

//Custom error handling vars
define('DISPLAY_ERRORS', TRUE);
define('ERROR_REPORTING', E_ALL | E_STRICT);
define('LOG_ERRORS', TRUE);

register_shutdown_function('shut');

set_error_handler('handler');

//Function to catch no user error handler function errors...
function shut() {

    $error = error_get_last();

    if ($error && ($error['type'] & E_FATAL)) {
        handler($error['type'], $error['message'], $error['file'], $error['line']);
    }
}

function handler($errno, $errstr, $errfile, $errline) {

    switch ($errno) {

        case E_ERROR: // 1 //
            $typestr = 'E_ERROR';
            break;
        case E_WARNING: // 2 //
            $typestr = 'E_WARNING';
            break;
        case E_PARSE: // 4 //
            $typestr = 'E_PARSE';
            break;
        case E_NOTICE: // 8 //
            $typestr = 'E_NOTICE';
            break;
        case E_CORE_ERROR: // 16 //
            $typestr = 'E_CORE_ERROR';
            break;
        case E_CORE_WARNING: // 32 //
            $typestr = 'E_CORE_WARNING';
            break;
        case E_COMPILE_ERROR: // 64 //
            $typestr = 'E_COMPILE_ERROR';
            break;
        case E_CORE_WARNING: // 128 //
            $typestr = 'E_COMPILE_WARNING';
            break;
        case E_USER_ERROR: // 256 //
            $typestr = 'E_USER_ERROR';
            break;
        case E_USER_WARNING: // 512 //
            $typestr = 'E_USER_WARNING';
            break;
        case E_USER_NOTICE: // 1024 //
            $typestr = 'E_USER_NOTICE';
            break;
        case E_STRICT: // 2048 //
            $typestr = 'E_STRICT';
            break;
        case E_RECOVERABLE_ERROR: // 4096 //
            $typestr = 'E_RECOVERABLE_ERROR';
            break;
        case E_DEPRECATED: // 8192 //
            $typestr = 'E_DEPRECATED';
            break;
        case E_USER_DEPRECATED: // 16384 //
            $typestr = 'E_USER_DEPRECATED';
            break;
    }

    $message = '<b>' . $typestr . ': </b>' . $errstr . ' in <b>' . $errfile . '</b> on line <b>' . $errline . '</b><br/>';

    if (($errno & E_FATAL) && ENV === 'production') {

        header('Location: 500.html');
        header('Status: 500 Internal Server Error');
    }

    if (!($errno & ERROR_REPORTING))
        return;

    if (DISPLAY_ERRORS) {
        header("Location: " . SITE_URL . "erroPage.php?msg=server error");
        //printf('%s', $message);
    }

    //Logging error on php file error log...
    if (LOG_ERRORS)
        error_log(strip_tags($message), 0);
}

ob_start();
include('log4php/Logger.php');
Logger::configure('log4php.xml');

// Fetch a logger, it will inherit settings from the root logger
$log = Logger::getLogger('Intermediate login user');
session_start();

include('includes/config.inc.php');

$log->info("token ".$_POST["token"]);

$jrnToke = $_POST["token"];
$zuneFitUrl = "https://api.zunefit.com/api/userSignup/";
$chlead = curl_init();
curl_setopt($chlead, CURLOPT_URL, $zuneFitUrl);
curl_setopt($chlead, CURLOPT_HTTPHEADER, array('token: ' . $jrnToke, 'ltype: web'));
curl_setopt($chlead, CURLOPT_VERBOSE, 1);
curl_setopt($chlead, CURLOPT_RETURNTRANSFER, true);
curl_setopt($chlead, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($chlead, CURLOPT_SSL_VERIFYPEER, 0);
$chleadresult = curl_exec($chlead);

curl_close($chlead);

$log->info("curl close");

$obj = json_decode($chleadresult);

$log->info("setting variables");

$token = $obj[0]->{'token'};
$id = $obj[0]->{'userid'};

$_SESSION['token'] = $token . '';
$_SESSION['userid'] = $id;
$_SESSION['type'] = USER;


header("Location: " . SITE_URL . "inner.php");

ob_end_flush();
?>
