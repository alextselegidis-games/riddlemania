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

import renderAnswerBox from './AnswerBox.html';
import {addNotification, openNotifications, closeNotifications, clearNotifications} from '../../services/Notification';
import {translate, getLanguageCode} from '../../services/Language';
import {MAX_ANSWER_LENGTH, toggleLoadingSpinner} from '../../services/Environment';
import './AnswerBox.scss';

/**
 * Answer Box Component
 *
 * This component handles the answering functionality by making a request to the server, which is also where
 * the validation takes place. This component is used explicitly in the Riddle pages.
 */
class AnswerBox {
    /**
     * Class Constructor
     *
     * @param {String} hash Provide the hash of the current riddle.
     */
    constructor(hash) {
        this.hash = hash;
    }

    /**
     * Append to target element.
     *
     * @param {HTMLElement} target The target element to be appended to.
     *
     * @return {AnswerBox} Class instance for chained method calls.
     */
    appendTo(target) {
        const existingAnswerBox = target.querySelector('form.answer-box');

        if (existingAnswerBox) {
            target.innerHTML = ''; // Remove previous instance.
        }

        const answerBox = document.createElement('div');
        answerBox.innerHTML = renderAnswerBox({
            answerPlaceholder: translate('answerPlaceholder', 'messages'),
            answer: translate('answer', 'labels'),
            maxAnswerLength: MAX_ANSWER_LENGTH
        });
        answerBox
            .querySelector('form.answer-box')
            .addEventListener('submit', event => this._onFormSubmitListener(event));
        target.appendChild(answerBox);
        answerBox.querySelector('input').focus();
        return this;
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
     * Answer Box Form Submit Handler
     *
     * This callback will send the user's answer to the server.
     *
     * @param {Event} event Contains the event information.
     *
     * @private
     */
    _onFormSubmitListener(event) {
        event.preventDefault();

        // If the response is successful then navigate to the next riddle, otherwise display an error notification.
        const answer = document.querySelector('.answer-box input').value;

        // Pre validate the answer.
        if (!answer.length || answer.length > MAX_ANSWER_LENGTH) {
            this._displayFailure(translate('invalidAnswer', 'messages'));
            return;
        }

        toggleLoadingSpinner(true);

        this
            ._postAnswer(answer, getLanguageCode())
            .then(response => {
                if (response.success && response.nextRiddleHash) {
                    document.body.classList.add('success');
                    addNotification(translate('validAnswer', 'messages'));
                    openNotifications();
                    localStorage.setItem('r4u-riddle', response.nextRiddleHash);
                    setTimeout(() => {
                        location.href = `#!/riddles/${response.nextRiddleHash}`;
                        closeNotifications();
                        clearNotifications();
                        document.body.classList.remove('success');
                    }, 2000);
                } else if (response.success && !response.nextRiddleHash) {
                    document.body.classList.add('success');
                    addNotification(translate('validAnswer', 'messages'));
                    location.href='#!/game-over';
                } else {
                    this._displayFailure(translate('invalidAnswer', 'messages'));
                }
            })
            .catch(exception => {
                this._displayFailure('Could not post answer!');
                console.error('Could not post answer:', exception);
            })
            .finally(() => {
                toggleLoadingSpinner(false);
            })
    }

    /**
     * Post the answer to the server.
     *
     * @param {String} answer The answer to be sent for validation.
     * @param {String} languageCode Code of the current language.
     *
     * @return {Promise} Returns a promise which will be resolved with the validation results.
     *
     * @private
     */
    async _postAnswer(answer, languageCode) {
        const response = await fetch(`api.php/riddles/${this.hash}/validate?lang=${languageCode}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answer})
        });

        return await response.json();
    }
}

export default AnswerBox;