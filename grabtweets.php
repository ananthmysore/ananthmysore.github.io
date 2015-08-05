<?

//We use already made Twitter OAuth library
//https://github.com/mynetx/codebird-php
require_once ('codebird.php');

//Twitter OAuth Settings, enter your settings here:
$CONSUMER_KEY = 'oRNCeZDqzmX3tVlMMuVqGFL7c';
$CONSUMER_SECRET = 'A8SzFkf9NC2DLYFZOtuERDgfrqAf1fEcCCkauOLqvoTj19OkDX';
$ACCESS_TOKEN = '369976218-R6opZMqZGgqg2U61LfCurOxTYoNpUE9MJWRBP80U';
$ACCESS_TOKEN_SECRET = 'XUBJ0wwMsaqgCHXAvK98LzgYGZ89O0lUeSckaY1CFbFyE';

//Get authenticated
Codebird::setConsumerKey($CONSUMER_KEY, $CONSUMER_SECRET);
$cb = Codebird::getInstance();
$cb->setToken($ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);


//retrieve posts
$q = $_POST['q'];
$count = $_POST['count'];
$api = $_POST['api'];

//https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
//https://dev.twitter.com/docs/api/1.1/get/search/tweets
$params = array(
	'screen_name' => $q,
	'q' => $q,
	'count' => $count
);

//Make the REST call
$data = (array) $cb->$api($params);

//Output result in JSON, getting it ready for jQuery to process
echo json_encode($data);

?>