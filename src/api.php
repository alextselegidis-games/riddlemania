<?php

/* ----------------------------------------------------------------------------
 * Riddles4U - Amazing Riddles Game Platform
 *
 * @package     Riddles4U
 * @author      Alex Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2017, BigBlackCode
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://riddles4u.com
 * @since       v1.0.0
 * ---------------------------------------------------------------------------- */

use Riddles4U\System\App;
use Riddles4U\System\Constants;

require_once __DIR__ . '/autoload.php';
require_once __DIR__ . '/config.php';

$config = [
    'name' => Constants::APP_NAME,
    'vendor' => Constants::VENDOR,
    'version' => Constants::VERSION,
    'homepage' => Constants::HOMEPAGE,
    'debug' => DEBUG,
    'storagePath' => BASE_PATH . '/storage'
];

$app = new App($config);

$app->get('/riddles/:hash', function ($hash) use ($app) {
    $app->logger->log(date('Y-m-d') . ' FETCH ' . $hash);

    $riddle = $app->riddle->load($hash);

    $languageCode = $app->input->get('lang') ?: Constants::DEFAULT_LANGUAGE_CODE;

    $response = [
        'title' => $riddle->title[$languageCode],
        'content' => $riddle->content[$languageCode]
    ];

    $app->output
        ->setStatus(200)
        ->setContentType('application/json')
        ->setJsonOutput($response);
});

$app->post('/riddles/:hash/validate', function ($hash) use ($app) {
    $request = $app->input->getBody();

    $app->logger->log(date('Y-m-d') . ' VALIDATE ' . $hash . ' ' . $request->answer);

    $languageCode = $app->input->get('lang') ?: Constants::DEFAULT_LANGUAGE_CODE;

    $result = $app->riddle
        ->load($hash)
        ->validate($request->answer, $languageCode);

    $response = $result
        ? ['success' => true, 'nextRiddleHash' => $app->riddle->getNextHash($hash)]
        : ['success' => false];

    $app->output
        ->setStatus(200)
        ->setContentType('application/json')
        ->setJsonOutput($response);
});

$app->error(function (Exception $exception) use ($app) {
    $app->logger->log(date('Y-m-d') . ' ERROR: ' . $exception->getCode() . ' ' . $exception->getMessage());

    $app->output
        ->setStatus($exception->getCode())
        ->setContentType('application/json')
        ->setJsonOutput([
            'exception' => true,
            'code' => $exception->getCode(),
            'message' => $exception->getMessage()
        ]);
});

$app->run();