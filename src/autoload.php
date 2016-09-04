<?php

/* ----------------------------------------------------------------------------
 * Riddles4u - Amazing Riddles Game Platform
 *
 * @package     Riddles4u
 * @author      Alex Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2016, BigBlackCode
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://riddles4u.com
 * @since       v1.0.0
 * ---------------------------------------------------------------------------- */

/**
 * Riddles4U System Autoload Registration
 *
 * After registering this autoload function with SPL, the following line
 * would cause the function to attempt to load the \Riddles4U\System\Baz\Qux
 * class from /src/to/project/system/Baz/Qux.php:
 *
 *      new \Riddles4U\System\Baz\Qux;
 *
 * @param string $class The fully-qualified class name.
 */
spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = 'Riddles4U\\System\\';

    // base directory for the namespace prefix
    $base_dir = __DIR__ . '/system/';

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        // no, move to the next registered autoloader
        return;
    }

    // get the relative class name
    $relative_class = substr($class, $len);

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    }
});