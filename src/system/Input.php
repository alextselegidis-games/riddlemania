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

namespace Riddles4U\System;

/**
 * Class Input
 *
 * Handles request input parameter and body values.
 *
 * @package Riddles4U\System
 */
class Input
{
    /**
     * Get the value of a GET parameter.
     *
     * @param string $key The key of the parameter to be returned.
     *
     * @return string|null Returns the parameter value.
     */
    public function get($key)
    {
        return array_key_exists($key, $_GET) ? $_GET[$key] : null;
    }

    /**
     * Get the decoded request JSON body as an associative array.
     *
     * @return array Returns an associative array of the request JSON body.
     */
    public function getBody()
    {
        return json_decode(file_get_contents('php://input'));
    }
}