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
 * Class Riddle
 *
 * Handles the riddles operations.
 *
 * @package Riddles4U\System
 */
class Riddle
{
    /**
     * @var array
     */
    protected $riddle;

    /**
     * @var string
     */
    protected $storagePath;

    /**
     * Riddle constructor.
     *
     * @param string $storagePath The system storage directory path.
     */
    public function __construct($storagePath)
    {
        $this->storagePath = $storagePath;
        $this->riddle = [];
    }

    /**
     * Magic getter method.
     *
     * @param string $key
     * @return mixed|null
     */
    public function __get($key)
    {
        return array_key_exists($key, $this->riddle) ? $this->riddle[$key] : null;
    }

    /**
     * Load a riddle from the database.
     *
     * @param string $hash The hash of the riddle to be loaded.
     *
     * @return Riddle Returns the class instance for chained method calls.
     */
    public function load($hash)
    {
        $this->riddle = [];

        $path = $this->storagePath . '/riddles';

        $directory = scandir($path);

        foreach($directory as $entry) {
            if ($entry === '.' || $entry === '..') {
                continue;
            }

            if (strpos($entry, $hash) !== false) {
                $this->riddle = json_decode(file_get_contents($path . '/' . $entry), true);
                break;
            }
        }

        return $this;
	}

    /**
     * Validate the provide answer.
     *
     * This method will check if the provided string answer matches the one from the loaded riddle.
     *
     * @param string $answer The answer to be validated.
     *
     * @return bool Returns the validation result.
     */
    public function validate($answer)
    {
        return (bool)preg_match($this->riddle['answer'], $answer);
	}
}