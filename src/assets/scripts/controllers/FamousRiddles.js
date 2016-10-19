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
import renderFamousRiddles from '../../templates/controllers/FamousRiddles.html';

class FamousRiddles {
    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
    }

    load(context, next) {
        this
            ._getFamousRiddles(getCurrentLanguage())
            .then((response) => {
                const famousRiddles = document.querySelector('.famous-riddles-content');
                famousRiddles.innerHTML = marked(response);
            })
            .catch((request) => {
                console.error('Get famous riddles error: ', request);
            });

        next();
    }

    display() {
        document.body.className = 'famous-riddles';
        const content = document.querySelector('#content');
        content.innerHTML = renderFamousRiddles({
            back: translate('back', 'labels')
        });
    }

    _getFamousRiddles(languageCode) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', `storage/content/${languageCode}/famous-riddles.md`, true);

            request.onload = function() {
                if (this.status >= 200 && this.status < 400) {
                    resolve(this.response);
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

export default FamousRiddles;