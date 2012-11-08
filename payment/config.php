<?php

define('ROOT_PATH', dirname(__FILE__));
define('VIEW_PATH', ROOT_PATH . '/views');
define('PUBLIC_PATH', determinePublicPath());

require_once ROOT_PATH . '/Samurai.php';

Samurai::setup(array(
  'merchantKey'      => 'dbb9284e8820d495f3833e50',
  'merchantPassword' => '7666eb12239f0c262b35b3a2',
  'processorToken'   => '23500ac02d0b1d78ee46777d'
));

function debug($var) {
	echo '<pre>' . print_r($var, true) . '</pre>';
}

function render($view, $vars = array()) {
	if (is_array($vars)) {
		extract($vars);
	}

	ob_start();
	include_once VIEW_PATH . '/' . $view . '.php';
	$_body = ob_get_clean();

	include_once VIEW_PATH . '/layout.php';
}

function redirect($path, $query='') {
	header('Location: ' . urlFor($path, false, $query));
}

function urlFor($path, $full = false, $query = '') {
	$url = ($full ? 'http://' . $_SERVER['SERVER_NAME'] : '') . PUBLIC_PATH . '/' . $path . '.php';
	if (!empty($query)) {
		$url .= '?' . $query;
	}

	return $url;
}

function determinePublicPath() {
	$scriptPath = realpath($_SERVER['SCRIPT_FILENAME']);
	$configPath = realpath(dirname(__FILE__));
	$requestPath = str_replace('?'.$_SERVER['QUERY_STRING'], '', $_SERVER['REQUEST_URI']);
	$scriptRelativePath = str_replace($configPath, '', $scriptPath);

	$publicPath = str_replace($scriptRelativePath, '', $requestPath);
	return $publicPath;
}
