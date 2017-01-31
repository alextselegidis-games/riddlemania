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

import {translate, getLanguageCode} from '../libraries/Languages';
import renderRiddles from '../../templates/controllers/Riddles.html';
import AnswerBox from '../components/AnswerBox';
import {addNotification, openNotifications, closeNotifications, clearNotifications} from '../libraries/Notifications';

/**
 * Riddles Controller
 *
 * This controller displays the "Riddles" page of the app.
 */
class Riddles {
    /**
     * Register the controller route.
     *
     * @param {Page} page The routing library instance.
     * @param {String} route The required routing for the controller.
     */
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
        page(route + '/:hash', this.load.bind(this), this.display.bind(this));
    }

    /**
     * Load page data.
     *
     * @param {Page.Context} context The routing library context.
     * @param {Page.Next} next Next routing callback.
     */
    load(context, next) {
        this
            ._getRiddle(context.params.hash, getLanguageCode())
            .then(riddle => {
                document.querySelector('.riddle-title').innerHTML = riddle.title;
                document.querySelector('.riddle-content').innerHTML = riddle.content;
                const answerBox = new AnswerBox(context.params.hash);
                answerBox.appendTo(document.querySelector('.answer-box-content'));
            })
            .catch(exception => {
                addNotification('Could not fetch riddle!');
                openNotifications();
                setTimeout(() => {
                    closeNotifications();
                    clearNotifications();
                }, 3000);
                console.error('Could not fetch riddle:', exception);
            });

        next();
    }

    /**
     * Display the page contents.
     */
    display() {
        document.body.className = 'riddles';
        const content = document.querySelector('main .row');
        content.innerHTML = renderRiddles({
            back: translate('back', 'labels')
        });
    }

    /**
     * Get the riddle information with an AJAX request.
     *
     * @param {String} hash The hash of the riddle to be loaded.
     * @param {String} languageCode Code of the language to be used.
     *
     * @return {Promise} Returns a promise that will be resolved with the riddle data.
     *
     * @private
     */
    _getRiddle(hash, languageCode) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `api.php/riddles/${hash}?lang=${languageCode}`, true);

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

            request.send();
        });
    }
}

export default Riddles;