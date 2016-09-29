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
import {addNotification, openNotifications} from '../libraries/Notifications';

class AnswerBox {
    constructor(hash) {
        this.hash = hash;
    }

    appendTo(container) {
        const answerBox = document.createElement();
        answerBox.innerHTML = renderAnswerBox();
        answerBox.addEventListener('click', this._onAnswerClickListener);
        container.appendChild(answerBox);
        return this;
    }

    _onAnswerClickListener() {
        // If the response is successful then navigate to the next riddle, otherwise display an
        // error notification.
        const answer = document.querySelector('.answer-box input').value;

        this
            ._postAnswer(answer)
            .then(response => {
                if (response.success) {
                    page(`riddles/${response.nextRiddleHash}`);
                } else {
                    const notification = addNotification('The provided answer is not valid.');
                    openNotifications();
                    setTimeout(() => notification.remove(), 3000);
                }
            })
            .catch(exception => {
                const notification = addNotification('Could not post answer!');
                openNotifications();
                setTimeout(() => notification.remove(), 3000);
                console.error('Could not post answer:', exception);
            });
    }

    _postAnswer(answer) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', `api.php/riddles/${this.hash}/validate`);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(this.response);
                } else {
                    reject(this.response);
                }
            };

            request.onerror = function() {
                reject(this.response);
            };

            request.send({answer});
        });
    }
}

export default AnswerBox;