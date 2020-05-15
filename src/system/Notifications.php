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
 * Class Notifications
 *
 * @package Riddles4U\System
 */
class Notifications
{
    /**
     * Send feedback message from user to contact email.
     *
     * @param string $email User's email address.
     * @param string $message Feedback message.
     * @param string $recaptcha Google ReCaptcha token.
     *
     * @throws \InvalidArgumentException If the arguments are invalid.
     */
    public function feedback($email, $message, $recaptchaToken)
    {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \InvalidArgumentException('Given email address is invalid: ' . $email);
        }

        if (empty($message)) {
            throw new \InvalidArgumentException('Given message must not be empty.');
        }

        if (empty($recaptchaToken)) {
            throw new \InvalidArgumentException('Given recaptcha token must not be empty.');
        }

        // Verify google re-captcha.
        $ch = curl_init('https://www.google.com/recaptcha/api/siteverify');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'secret' => GOOGLE_RECAPTCHA_SECRET_KEY,
            'response' => $recaptchaToken
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = json_decode(curl_exec($ch), true);
        curl_close($ch);

        if (!$response['success']) {
            throw new \InvalidArgumentException('Given recaptcha token must not be empty.');
        }

        // Send email through Mailgun.
        $message = [
            'Email:',
            $email,
            'Messsage:',
            nl2br($message)
        ];

        $ch = curl_init('https://api.mailgun.net/v3/sandbox6450fcdbde244972a7487c071e41cdf0.mailgun.org/messages');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD,  'api:' . MAILGUN_API_KEY);
        curl_setopt($ch, CURLOPT_POSTFIELDS, [
            'from' => REPLY_TO_EMAIL,
            'to' => CONTACT_EMAIL,
            'subject' => 'Riddles4U - Feedback Message',
            'text' => implode("\n\n", $message),
            'html' => implode('<br><br>', $message)
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = json_decode(curl_exec($ch), true);
        curl_close($ch);

        if (!$response['id']) {
            throw new \InvalidArgumentException('Maingun API returned an error: ' . print_r($response, true));
        }
    }
}