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
import MenuBox from '../components/MenuBox';
import MenuItem from '../components/MenuItem';
import {getCurrentLanguage} from '../libraries/Language';

class MainMenu {
    constructor() {
        this.template = require('../../templates/controllers/MainMenu.html');
    }

    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
    }

    load(context, next) {
        this
            ._getIntroduction(getCurrentLanguage())
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
        const menuBox = new MenuBox();

        menuBox
            .addItem(new MenuItem('Play', '#!/riddles/1'))
            .addItem(new MenuItem('FamousRiddles', '#!/famous-riddles'))
            .addItem(new MenuItem('About', '#!/about'));

        const templateData = {
            menuBox: menuBox.getHtml(),
            introTitle: 'Introduction',
            introMessage: 'This is a sample introduction message.'
        };

        const content = document.getElementById('content');
        content.innerHTML = this.template(templateData);
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