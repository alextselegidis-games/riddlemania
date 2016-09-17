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

const languages = {
    en: 'English',
    gr: 'Ελληνικά'
};

const sections = {};

let currentLanguage = 'en';

export function getCurrentLanguage() {
    return currentLanguage;
}

export function setCurrentLanguage(languageCode) {
    currentLanguage = languageCode;
}

export function getAvailableLanguages() {
    return languages;
}

export function loadSection(name) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open('GET', `storage/translations/${getCurrentLanguage()}/${name}`, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                sections[name] = JSON.parse(this.response);
                resolve(this.response);
            } else {
                throw new Error('Could not load translation file: ', this.response);
            }
        };

        request.onerror = function() {
            throw new Error('Could not load translation file: ', request);
        };

        request.send()
    });
}

export function translate(key, section) {
    return sections[section][key];
}