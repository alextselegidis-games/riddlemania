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

        $mail = new PHPMailer(true);

        //Server settings
        $mail->isSMTP();
        $mail->Host = SMTP_PROTOCOL . '://' . SMTP_HOST . ':' . SMTP_PORT;
        $mail->SMTPOptions = [
            'ssl' => [
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            ]
        ];
        $mail->SMTPAuth = true;
        $mail->Username = SMTP_USERNAME;
        $mail->Password = SMTP_PASSWORD;

        //Recipients
        $mail->setFrom(REPLY_TO_EMAIL);
        $mail->addAddress(CONTACT_EMAIL);

        $message = [
            'Email:',
            $email,
            'Messsage:',
            nl2br($message)
        ];

        //Content
        $mail->isHTML();
        $mail->Subject = 'Riddles4U - Feedback Message';
        $mail->Body = implode('<br><br>', $message);

        // Send
        $mail->send();
    }
}