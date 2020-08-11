<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require "./vendor/autoload.php";

$app = AppFactory::create();

$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->get("/solve/{puzzle}", function (Request $req, Response $res, $args) {
	$puzzle = $args["puzzle"];
	$solved = json_encode(solveOddEven($puzzle));
	$res->getBody()->write($solved);
	return $res
		->withHeader("Content-Type", "application/json")
		->withStatus(200)
		->withHeader("Access-Control-Allow-Origin", "http://localhost:8080")
		->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin")
		->withHeader("Access-Control-Allow-Methods", "GET");
});


/**
 * solveOddEven
 *
 * @param string $puzzle_string
 * @access public
 * @return Array
 */
function solveOddEven(?string $puzzle_string): array {
	$data = fromStr($puzzle_string);
	return $data;
}

/**
 * fromStr
 *
 * @param string $chars
 * @access public
 * @return array
 */
function fromStr(string $chars): array {
	$chars[1] = 5;
	$arr = [];
	$chars_arr = str_split($chars);
	foreach ($chars_arr as $chk => $ch) {
		$arr_item = [
			"value" => ($ch === "e" || $ch === "o") ? "" : intval($ch),
			"isEven" => ($ch === "e" || (  $ch !== "o" && (intval($ch) % 2) === 0)) ? true : false,
			"isOriginal" => ($ch === "e" || $ch === "o") ? false : true
		];
		array_push($arr, $arr_item);
	}
	return array_chunk($arr, 9);
}

$app->run();
