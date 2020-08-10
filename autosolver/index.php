<?php declare(strict_types=1);

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
						->withStatus(200);
});

/**
 * solveOddEven
 *
 * @param string $puzzle_string
 * @access public
 * @return Array
 */
function solveOddEven(?string $puzzle_string): Array {
	return ["FROM_SERVER" => $puzzle_string];
}

$app->run();
