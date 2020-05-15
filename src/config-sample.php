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

/** Defines the application environment. */
define('DEBUG', true);

/** Defines the base filesystem path. */
define('BASE_PATH', __DIR__);

/** Defines the initial riddle hash. */
define('INITIAL_RIDDLE_HASH', '28101d71d773c2d94ee80cb0d48a7477');

/** Defines the secret key, used for server-side communication with Google. */
define('GOOGLE_RECAPTCHA_SECRET_KEY', '');

/** Defines the Mailgun API key. */
define('MAILGUN_API_KEY', '');

/** Contact to address. */
define('CONTACT_EMAIL', 'riddles4udotcom@gmail.com');

/** Reply to address. */
define('REPLY_TO_EMAIL', 'no-reply@riddles4u.com');