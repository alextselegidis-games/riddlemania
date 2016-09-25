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

import page from 'page';
import {setCurrentLanguage, loadAllSections} from '../libraries/Languages';

class LanguageSwitch {
    constructor(availableLanguages) {
        this.availableLanguages = availableLanguages;
        this.currentLanguage = 'en';
    }

    setCurrentLanguage(languageCode) {
        this.currentLanguage = languageCode;
        return this;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    appendTo(container) {
        const languages = [];

        for (let languageCode in this.availableLanguages) {
            languages.push({
                code: languageCode,
                name: this.availableLanguages[languageCode],
                default: languageCode === this.currentLanguage
            });
        }

        const template = require('../../templates/components/LanguageSwitch.html');
        const templateData = {
            languages
        };
        container.innerHTML += template(templateData);

        return this;
    }

    bindLanguageClickListener() {
        document.querySelector('.language-switch').addEventListener('click', event => {
            event.preventDefault();

            if (event.target.tagName !== 'A' || event.target.parentNode.classList.contains('active')) {
                return;
            }

            setCurrentLanguage(event.target.getAttribute('data-language'));

            loadAllSections().then(() => {
                const route = location.hash.replace('#!', '');
                page(route);
            });

            document.querySelector('.language-switch .active').classList.remove('active');
            event.target.parentNode.classList.add('active');
        });
    }
}

export default LanguageSwitch;