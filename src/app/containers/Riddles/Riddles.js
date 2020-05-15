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

import {translate, getLanguageCode} from '../../services/Language';
import renderRiddles from './Riddles.html';
import AnswerBox from '../../components/AnswerBox/AnswerBox';
import {addNotification, openNotifications, closeNotifications, clearNotifications} from '../../services/Notification';
import './Riddles.scss';

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
            })
            .finally(() => {
                document.querySelector('.btn.back').style.visibility = 'visible';
            });

        next();
    }

    /**
     * Display the page contents.
     */
    display() {
        document.querySelector('[name="theme-color"]').setAttribute('content', '#4c0099');
        document.body.className = 'riddles';
        const content = document.querySelector('main .row');
        content.innerHTML = renderRiddles({
            back: translate('back', 'labels')
        });
        document.querySelector('.btn.back').style.visibility = 'hidden';
    }

    /**
     * Get the riddle information with an AJAX request.
     * The hash of the riddle to be loaded.
     * @param {String} hash Unique riddle hash string.
     * @param {String} languageCode Code of the language to be used.
     *
     * @return {Promise} Returns a promise that will be resolved with the riddle data.
     *
     * @private
     */
    async _getRiddle(hash, languageCode) {
        const response = await fetch(`api.php/riddles/${hash}?lang=${languageCode}`, {credentials: 'include'});
        return await response.json();
    }
}

export default Riddles;