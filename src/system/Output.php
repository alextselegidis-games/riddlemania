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
 * Class Output
 *
 * Handles response output and header values.
 *
 * @package Riddles4U\System
 */
class Output
{
    /**
     * Set output status code.
     *
     * @param int $status The status code of the response.
     *
     * @return Output Returns class instance for chained method calls.
     */
    public function setStatus($status)
    {
        http_response_code($status);

        return $this;
	}

    /**
     * Set output content type header.
     *
     * @param string $contentType The MIME type of the response.
     *
     * @return Output Returns class instance for chained method calls.
     */
	public function setContentType($contentType) {
        header('Content-Type: ' . $contentType);

        return $this;
    }

    /**
     * Set JSON output data.
     *
     * @param array $output Contains the data of the response.
     *
     * @return Output Returns class instance for chained method calls.
     */
    public function setJsonOutput(array $output)
    {
        echo json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

        return $this;
    }
}