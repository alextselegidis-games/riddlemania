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

import renderGameOver from './GameOver.html';
import './GameOver.scss';
import {translate} from '../../services/Language';

/**
 * GameOver Controller
 *
 * This controller displays the "GameOver" page of the app.
 */
class GameOver {
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
        next();
    }

    /**
     * Display the Riddles4U end of game page.
     */
    display() {
        document.querySelector('[name="theme-color"]').setAttribute('content', '#004099');
        document.body.className = 'game-over';

        const content = document.querySelector('main .row');
        content.innerHTML = renderGameOver({
            title: translate('congratulations', 'labels'),
            message: translate('gameOver', 'messages'),
            share: translate('share', 'labels'),
            back: translate('back', 'labels')
        });
    }
}

export default GameOver;