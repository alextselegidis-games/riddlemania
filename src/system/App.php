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

namespace Riddles4U\System;

/**
 * Class App
 *
 * Application Facade Layer.
 *
 * @package Riddles4U\System
 */
class App
{
    /**
     * @var array
     */
    protected $config;

    /**
     * @var array
     */
    protected $routes;

    /**
     * @var Input
     */
    public $input;

    /**
     * @var Output
     */
    public $output;

    /**
     * @var Logger
     */
    public $logger;

    /**
     * @var Riddle
     */
    public $riddle;

    /**
     * App constructor.
     *
     * Provide the 'name', 'vendor', 'version', 'homepage', 'debug' and 'storagePath' properties in the
     * $config argument.
     *
     * @param array $config Contains the application configuration values.
     */
    public function __construct(array $config)
    {
        $this->config = $config;
        $this->routes = [
            'GET' => [],
            'POST' => []
        ];

        $this->input = new Input();
        $this->output = new Output();
        $this->logger = new Logger($config['storagePath']);
        $this->riddle = new Riddle($config['storagePath']);
    }

    /**
     * Execute the matching application routes.
     */
    public function run()
    {
        $requestUri = array_filter(explode('/', $_SERVER['PATH_INFO']));

        foreach ($this->routes[$_SERVER['REQUEST_METHOD']] as $uri => $callback) {
            $routeUri = array_filter(explode('/', $uri));
            $matches = true;
            $arguments = [];

            foreach ($routeUri as $index => $segment) {
                if (strpos($segment, ':') !== false) {
                    $arguments[] = $requestUri[$index];
                } else if ($requestUri[$index] !== $segment) {
                    $matches = false;
                    break;
                }
            }

            if ($matches) {
                call_user_func_array($callback, $arguments);
            }
        }
    }

    /**
     * Register a callback for a GET request.
     *
     * @param string $uri The URI string of the route.
     * @param callable $callback The callback of the route.
     */
    public function get($uri, $callback)
    {
        $this->routes['GET'][$uri] = $callback;
    }

    /**
     * Register a callback for a POST request.
     *
     * @param string $uri The URI string of the route.
     * @param callable $callback The callback of the route.
     */
    public function post($uri, $callback)
    {
        $this->routes['POST'][$uri] = $callback;
    }

    /**
     * Forward PHP errors to the error callback.
     *
     * The callback will be called if a PHP error occurs.
     *
     * @param callable $callback The error callback function.
     */
    public function error($callback)
    {
        register_shutdown_function(function () use ($callback) {
            $error = error_get_last();

            if ($error['type'] === E_ERROR) {
                $exception = new \Exception($error['message'], $error['number']);
                $callback($exception);
            }
        });

        set_error_handler(function ($number, $message, $file, $line) use ($callback) {
            $exception = new \Exception($message, $number);
            $callback($exception);
        });
    }
}