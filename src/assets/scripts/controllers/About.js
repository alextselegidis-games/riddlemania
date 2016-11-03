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

import marked from 'marked';
import {getCurrentLanguage, translate} from '../libraries/Languages';
import renderAbout from '../../templates/controllers/About.html';

/**
 * About Controller
 *
 * This controller displays the "About" page of the app.
 */
class About {
    /**
     * Register the controller route.
     *
     * @param {Page} page The routing library instance.
     * @param {String} route The required routing for the controller.
     */
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
    }

    /**
     * Load page data.
     *
     * @param {Page.Context} context The routing library context.
     * @param {Page.Next} next Next routing callback.
     */
    load(context, next) {
        this
            ._getAbout(getCurrentLanguage())
            .then((response) => {
                const about = document.querySelector('.about-content');
                about.innerHTML = marked(response);
            })
            .catch((request) => {
                console.error('Get about error: ', request);
            });

        next();
    }

    /**
     * Display the page contents.
     */
    display() {
        document.body.className = 'about';
        const content = document.querySelector('main .row');
        content.innerHTML = renderAbout({
            back: translate('back', 'labels')
        });
    }

    /**
     * Get the about content with an AJAX request.
     *
     * @param {String} languageCode Current language code.
     *
     * @return {Promise} Returns a promise which will be resolved with the about content.
     *
     * @private
     */
    _getAbout(languageCode) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `storage/content/${languageCode}/about.md`, true);

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(this.response);
                } else {
                    reject(this.response);
                }
            };

            request.onerror = function() {
                reject(request);
            };

            request.send();
        });
    }
}

export default About;