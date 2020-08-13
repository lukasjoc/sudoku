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
    ->withStatus(200)
    ->withHeader("Content-Type", "application/json")
    ->withHeader("Access-Control-Allow-Methods", "GET")
    ->withHeader("Access-Control-Allow-Origin", "http://localhost:8080")
    ->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin");
});

/**
 * solveOddEven
 *
 * @param string $puzzle_string
 * @access public
 * @return string (json encoded)
 */
function solveOddEven(?string $puzzle_string): string {
  require_once("./Solver.php");
  $solver = new Solver($puzzle_string);
  $solver->solve();
  return $solver->getSolvedPuzzle();
}

$app->run();
