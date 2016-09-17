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

class About {
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
    }

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

    display() {
        document.body.className = 'about';
        const template = require('../../templates/controllers/About.html');
        const content = document.querySelector('#content');
        content.innerHTML = template({
            back: translate('back', 'labels')
        });
    }

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