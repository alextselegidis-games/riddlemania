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
import './MainMenu.pcss';

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

    display() {
        document.body.className = 'main-menu';

        const menuBox = new MenuBox();
        const nextRiddleHash = localStorage.getItem('r4u-riddle') || '28101d71d773c2d94ee80cb0d48a7477';

        menuBox
            .addItem(new MenuItem(translate('play', 'labels'), `#!/riddles/${nextRiddleHash}`))
            .addItem(new MenuItem(translate('famousRiddles', 'labels'), '#!/famous-riddles'))
            .addItem(new MenuItem(translate('about', 'labels'), '#!/about'));

        const templateData = {
            menuBox: menuBox.getHtml()
        };

        const content = document.querySelector('main .row');
        content.innerHTML = renderMainMenu(templateData);
    }

    _getIntroduction(languageCode) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `storage/content/${languageCode}/introduction.md`, true);

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

export default MainMenu;