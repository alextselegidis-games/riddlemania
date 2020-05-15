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
import MenuBox from '../../components/MenuBox/MenuBox';
import MenuItem from '../../components/MenuItem/MenuItem';
import {getLanguageCode, translate} from '../../services/Language';
import renderMainMenu from './MainMenu.html';
import './MainMenu.scss';

/**
 * Main Menu Controller
 *
 * This controller displays the "Main Menu" page of the app.
 */
class MainMenu {
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
            ._getIntroduction(getLanguageCode())
            .then((response) => {
                const introduction = document.querySelector('.introduction');
                introduction.innerHTML = marked(response);
            })
            .catch((request) => {
                console.error('Get introduction failed: ', request);
            });

        next();
    }

    /**
     * Display the main menu page.
     */
    display() {
        document.querySelector('[name="theme-color"]').setAttribute('content', '#004099');

        document.body.className = 'main-menu';

        const menuBox = new MenuBox();
        const nextRiddleHash = localStorage.getItem('r4u-riddle');

        if (nextRiddleHash) {
            menuBox.addItem(new MenuItem(translate('continue', 'labels'), `#!/riddles/${nextRiddleHash}`));
        }

        menuBox
            .addItem(new MenuItem(translate('newGame', 'labels'), '#!/riddles/28101d71d773c2d94ee80cb0d48a7477'))
            .addItem(new MenuItem(translate('famousRiddles', 'labels'), '#!/famous-riddles'))
            .addItem(new MenuItem(translate('about', 'labels'), '#!/about'))
            .addItem(new MenuItem(translate('feedback', 'labels'), '#!/feedback'));

        const templateData = {
            menuBox: menuBox.getHtml()
        };

        const content = document.querySelector('main .row');
        content.innerHTML = renderMainMenu(templateData);

        document.querySelector('a[href="#!/riddles/28101d71d773c2d94ee80cb0d48a7477"]').addEventListener('click', (event) => {
            if (localStorage.getItem('r4u-riddle') !== null && !confirm(translate('thisWillResetYourProgress', 'messages'))) {
                event.preventDefault();
                return false;
            }
        });
    }

    /**
     * Get introduction contents.
     *
     * @param {String} languageCode Current language code.
     *
     * @return {Promise} Returns a promise that will be resolved with the introduction contents.
     *
     * @private
     */
    async _getIntroduction(languageCode) {
        const response = await fetch(`storage/content/${languageCode}/introduction.md`, {credentials: 'include'});
        return await response.text();
    }
}

export default MainMenu;