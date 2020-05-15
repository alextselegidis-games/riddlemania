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

import marked from 'marked';
import {getLanguageCode, translate} from '../../services/Language';
import renderAbout from './About.html';
import './About.scss';

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
            ._getAbout(getLanguageCode())
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
        document.querySelector('[name="theme-color"]').setAttribute('content', '#007599');
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
    async _getAbout(languageCode) {
        const response = await fetch(`storage/content/${languageCode}/about.md`, {credentials: 'include'});
        return await response.text();
    }
}

export default About;