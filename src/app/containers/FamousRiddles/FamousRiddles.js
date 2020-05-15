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
import renderFamousRiddles from './FamousRiddles.html';
import './FamousRiddles.scss';

/**
 * Famous Riddles Controller
 *
 * This controller displays the "Famous Riddles" page of the app.
 */
class FamousRiddles {
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
            ._getFamousRiddles(getLanguageCode())
            .then((response) => {
                const famousRiddles = document.querySelector('.famous-riddles-content');
                famousRiddles.innerHTML = marked(response);
            })
            .catch((request) => {
                console.error('Get famous riddles error: ', request);
            });

        next();
    }

    /**
     * Display the page contents.
     */
    display() {
        document.querySelector('[name="theme-color"]').setAttribute('content', '#007599');
        document.body.className = 'famous-riddles';
        const content = document.querySelector('main .row');
        content.innerHTML = renderFamousRiddles({
            back: translate('back', 'labels')
        });
    }

    /**
     * Get famous riddles content.
     *
     * @param {String} languageCode Current language code.
     *
     * @return {Promise} Returns a promise that will be resolved with the famous riddles content.
     *
     * @private
     */
    async _getFamousRiddles(languageCode) {
        const response = await fetch(`storage/content/${languageCode}/famous-riddles.md`, {credentials: 'include'});
        return await response.text();
    }
}

export default FamousRiddles;