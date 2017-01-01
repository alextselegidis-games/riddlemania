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

import renderAnswerBox from '../../templates/components/AnswerBox.html';
import {addNotification, openNotifications, closeNotifications, clearNotifications} from '../libraries/Notifications';
import {translate, getLanguageCode} from '../libraries/Languages';

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
     * Append to container element.
     *
     * @param {HTMLElement} container The container element to be appended to.
     *
     * @return {AnswerBox} Class instance for chained method calls.
     */
    appendTo(container) {
        const answerBox = document.createElement('div');
        answerBox.innerHTML = renderAnswerBox({
            answerPlaceholder: translate('answerPlaceholder', 'messages'),
            answer: translate('answer', 'labels')
        });
        answerBox
            .querySelector('form.answer-box')
            .addEventListener('submit', event => this._onFormSubmitListener(event));
        container.appendChild(answerBox);
        answerBox.querySelector('input[type=text]').focus();
        return this;
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

        this
            ._postAnswer(answer, getLanguageCode())
            .then(response => {
                if (response.success && response.nextRiddleHash) {
                    document.body.classList.add('success');
                    addNotification(translate('validAnswer', 'messages'));
                    openNotifications();
                    localStorage.setItem('r4u-riddle', response.nextRiddleHash);
                    setTimeout(() => {
                        page(`riddles/${response.nextRiddleHash}`);
                        closeNotifications();
                        clearNotifications();
                        document.body.classList.remove('success');
                    }, 2000);
                } else if (response.success && !response.nextRiddleHash) {
                    document.body.classList.add('success');
                    addNotification(translate('validAnswer', 'messages'));
                    addNotification(`<br><h4>${translate('endOfGame', 'messages')}</h4>`);
                    openNotifications();
                    setTimeout(() => {
                        location.href = '#!/';
                        closeNotifications();
                        clearNotifications();
                        document.body.classList.remove('success');
                    }, 5000);
                } else {
                    document.body.classList.add('failure');
                    addNotification(translate('invalidAnswer', 'messages'));
                    openNotifications();
                    setTimeout(() => {
                        closeNotifications();
                        clearNotifications();
                        document.body.classList.remove('failure');
                    }, 3000);
                }
            })
            .catch(exception => {
                addNotification('Could not post answer!');
                openNotifications();
                setTimeout(() => {
                    closeNotifications();
                    clearNotifications();
                }, 3000);
                console.error('Could not post answer:', exception);
            });
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
    _postAnswer(answer, languageCode) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', `api.php/riddles/${this.hash}/validate?lang=${languageCode}`, true);
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this.response);
                }
            };

            request.onerror = function() {
                reject(this.response);
            };

            request.send(JSON.stringify({answer}));
        });
    }
}

export default AnswerBox;