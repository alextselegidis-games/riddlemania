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

let currentLanguage = 'en';

export function getCurrentLanguage() {
    return currentLanguage;
}

export function setCurrentLanguage(languageCode) {
    currentLanguage = languageCode;
}

export function getAvailableLanguages() {
    return Object.keys(languages);
}