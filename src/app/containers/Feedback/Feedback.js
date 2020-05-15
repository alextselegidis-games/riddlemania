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

import renderFeedback from './Feedback.html';
import './Feedback.scss';
import {translate} from '../../services/Language';
import {validateEmail} from '../../services/Validation';
import {addNotification, openNotifications, clearNotifications, closeNotifications} from '../../services/Notification';
import {toggleLoadingSpinner} from '../../services/Environment';

/**
 * Feedback Controller
 *
 * This controller displays the "Feedback" page of the app.
 */
class Feedback {
    /**
     * Register the controller route.
     *
     * @param {Page} page The routing library instance.
     * @param {String} route The required routing for the controller.
     */
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this))
    }

    /**
     * Load page data.
     *
     * @param {Page.Context} context The routing library context.
     * @param {Page.Next} next Next routing callback.
     */
    load (context, next)  {
        next();
    }

    /**
     * Display the page contents.
     */
    display() {
        document.querySelector('[name="theme-color"]').setAttribute('content', '#007599');
        document.body.className = 'feedback';
        const content = document.querySelector('main .row');
        content.innerHTML = renderFeedback({
            feedback: translate('feedback', 'labels'),
            yourFeedbackIsImportant: translate('yourFeedbackIsImportant', 'messages'),
            email: translate('email', 'labels'),
            message: translate('message', 'labels'),
            back: translate('back', 'labels'),
            submit: translate('submit', 'labels')
        });

        const form = document.body.querySelector('form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            const data = {
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                recaptchaToken: document.querySelector('[name="g-recaptcha-response"]').value
            };

            if (!validateEmail(data.email)) {
                this._displayFailure(translate('invalidEmailAddress', 'messages'));
                return;
            }

            if (!data.message.length) {
                this._displayFailure(translate('emptyMessage', 'messages'));
                return;
            }

            if (!data.recaptchaToken.length) {
                this._displayFailure(translate('recaptchaFailed', 'messages'));
                return;
            }

            toggleLoadingSpinner(true);

            const response = await fetch('api.php/feedback', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (json.success) {
                this._displaySuccess(translate('thankYouForYourFeedback', 'messages'));
                location.href = '#!/';
            } else {
                this._displayFailure(translate('anUnexpectedErrorOccurred', 'messages'));
            }

            toggleLoadingSpinner(false);
        });

        this._loadReCaptcha();
    }

    /**
     * Display the success animation.
     *
     * @param {String} message Message to be displayed.
     */
    _displaySuccess(message) {
        document.body.classList.add('success');
        addNotification(message);
        openNotifications();
        setTimeout(() => {
            closeNotifications();
            clearNotifications();
            document.body.classList.remove('success');
        }, 3000);
    }

    /**
     * Display the failure animation.
     *
     * @param {String} message Message to be displayed.
     */
    _displayFailure(message) {
        document.body.classList.add('failure');
        addNotification(message);
        openNotifications();
        setTimeout(() => {
            closeNotifications();
            clearNotifications();
            document.body.classList.remove('failure');
        }, 3000);
    }

    /**
     * Load the recaptcha component in the form.
     *
     * @private
     */
    _loadReCaptcha() {
        if (document.getElementById('google-recaptcha-script')) {
            if (window.grecaptcha) {
                window.onloadReCaptchaCallback();
            }

            return; // Script is already loaded.
        }

        window.onloadReCaptchaCallback = () => {
            grecaptcha.render('google-recaptcha', {
                sitekey: '6LeyXjUUAAAAADy96ZKn0kHqo3No6KaN8xWCxqEx'
            });
        };

        const script = document.createElement('script');
        script.setAttribute('id', 'google-recaptcha-script');
        script.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=onloadReCaptchaCallback&render=explicit');
        script.setAttribute('assync', '');
        script.setAttribute('defer', '');
        document.body.appendChild(script);
    }
}

export default Feedback;