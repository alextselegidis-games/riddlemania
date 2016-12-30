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
 * Class Logger
 *
 * Logs various messages to the storage/logs directory.
 *
 * @package Riddles4U\System
 */
class Logger
{
    /**
     * @var string
     */
    protected $storagePath;

    /**
     * Logger constructor.
     *
     * @param string $storagePath The system storage directory path.
     */
    public function __construct($storagePath)
    {
        $this->storagePath = (string)$storagePath;
    }

    /**
     * Log simple messages to the logs directory.
     *
     * @param string $message Message to be logged.
     */
    public function log($message)
    {
        $path = $this->storagePath . '/logs/' . $this->_getFilename();

        if (!file_exists($path)) {
            touch($path);
        }

        $handle = fopen($path, 'ba');
        fwrite($handle, $message);
    }

    /**
     * Get current date log filename.
     *
     * @return string Returns the current date filename.
     */
    protected function _getFilename()
    {
        return $this->storagePath . '/logs/' . date('Y-m-d.log');
    }
}