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

require_once 'autoload.php';
require_once 'config.php';

/**
 * Backend API Access File
 *
 * Supported Operations:
 *
 * - Get Riddle Question
 * - Check Riddle Answer
 * - Get Ad Image
 * - Redirect To Ad URL
 */

// Dummy response for riddles page.
header('Content-Type: application/json');
echo json_encode([
     'title' => 'Test Riddle #01',
    'content' => 'This is the riddle content which will normally contain the riddle question.'
]);