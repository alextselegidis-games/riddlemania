<?php

/* ----------------------------------------------------------------------------
 * Riddles4U - Amazing Riddles Game Platform
 *
 * @package     Riddles4U
 * @author      Alex Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2016, BigBlackCode
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://riddles4u.com
 * @since       v1.0.0
 * ---------------------------------------------------------------------------- */

use Riddles4U\System\App;

require_once __DIR__ . '/autoload.php';
require_once __DIR__ . '/config.php';

/*
 * Backend API Access File
 *
 * Supported Operations:
 *
 *   - Get Riddle Question
 *   - Check Riddle Answer
 *
 * Coming Soon:
 *
 *   - Gather statistics
 *   - Get Ad Image
 *   - Redirect To Ad URL
 */

$config = [
    'name' => 'Riddles4U',
    'vendor' => 'BigBlackCode',
    'version' => '1.0.0',
    'homepage' => 'http://riddles4u.com',
    'debug' => DEBUG,
    'storagePath' => BASE_PATH . '/storage'
];

$app = new App($config);

$app->get('/riddles/:hash', function ($hash) use ($app) {
    $app->logger->log([
        'action' => 'fetch',
        'hash' => $hash
    ]);

    $riddle = $app->riddle->load($hash);

    $response = [
        'title' => $riddle->title,
        'content' => $riddle->content
    ];

    $app->output
        ->setStatus(200)
        ->setContentType('application/json')
        ->setJsonOutput($response);
});

$app->post('/riddles/:hash/validate', function ($hash) use ($app) {
    $request = $app->input->getBody();

    $app->logger->log([
        'action' => 'validate',
        'hash' => $hash,
        'answer' => $request->answer
    ]);

    $result = $app->riddle
        ->load($hash)
        ->validate($request->answer);

    $response = $result
        ? ['success' => true, 'nextRiddleHash' => $app->riddle->getNextHash()]
        : ['success' => false];

    $app->output
        ->setStatus(200)
        ->setContentType('application/json')
        ->setJsonOutput($response);
});

$app->error(function (Exception $exception) use ($app) {
    $app->logger->log($exception);

    $app->output
        ->setStatus($exception->getCode())
        ->setHeader('application/json')
        ->setJsonOutput([
            'exception' => true,
            'code' => $exception->getCode(),
            'message' => $exception->getMessage()
        ]);
});

$app->run();



///**
// * Output JSON response.
// *
// * @param array $data       Associative array with the JSON data.
// * @param int   $statusCode Provide a valid HTTP status code for the response (default 200).
// */
//function output(array $data, $statusCode = 200)
//{
//	header('Content-Type: application/json; charset:utf-8');
//	http_response_code($statusCode);
//	echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
//}
//
//// Dummy response for riddles page.
//echo json_encode([
//	                 'title'   => 'Test Riddle #01',
//	                 'content' => 'This is the riddle content which will normally contain the riddle question.'
//                 ]);