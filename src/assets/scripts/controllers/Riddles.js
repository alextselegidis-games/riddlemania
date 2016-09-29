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

import {translate} from '../libraries/Languages';
import renderRiddles from '../../templates/controllers/Riddles.html';
import AnswerBox from '../components/AnswerBox';
import {addNotification, openNotifications} from '../libraries/Notifications';

class Riddles {
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
        page(route + '/:riddleId', this.load.bind(this), this.display.bind(this));
    }

    load(context, next) {
        this
            ._getRiddle(context.params.riddleId)
            .then(riddle => {
                document.querySelector('.riddle-title').innerHTML(riddle.title);
                document.querySelector('.riddle-content').innerHTML(riddle.content);
                const answerBox = new AnswerBox(riddleId);
                answerBox.appendTo(document.querySelector('.riddle-content'));
            })
            .catch(exception => {
                const notification = addNotification('Could not fetch riddle!');
                openNotifications();
                setTimeout(() => notification.remove(), 3000);
                console.error('Could not fetch riddle:', exception);
            });

        next();
    }

    display() {
        document.body.className = 'riddles';
        const content = document.querySelector('#content');
        content.innerHTML = renderRiddles({
            back: translate('back', 'labels')
        });
    }

    _getRiddle(riddleId) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `api.php/riddles/${riddleId}`, true);

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

            request.send();
        });
    }
}

export default Riddles;