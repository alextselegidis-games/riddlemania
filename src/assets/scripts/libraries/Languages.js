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

/**
 * Available Languages
 *
 * @type {Object}
 */
const languages = {
    en: 'English',
    el: 'Ελληνικά'
};

/**
 * Loaded Translation Sections
 *
 * @type {Object}
 */
const sections = {};

/**
 * Current Language Code
 *
 * @type {String}
 */
let currentLanguage = localStorage.getItem('r4u-language') || 'en';

/**
 * Get current language code.
 *
 * @return {String} Returns the language code.
 */
export function getLanguageCode() {
    return currentLanguage;
}

/**
 * Set current language code.
 *
 * @param {String} languageCode Provide one of the available language codes.
 */
export function setLanguageCode(languageCode) {
    currentLanguage = languageCode;
    localStorage.setItem('r4u-language', languageCode);
}

/**
 * Get the available languages object.
 *
 * @return {Object} The object contains the language codes and names.
 */
export function getAvailableLanguages() {
    return languages;
}

/**
 * Load all translation sections from the server.
 *
 * @return {Promise.<*>} Returns a promise which will be resolved once all the sections are fetched.
 */
export function loadAllSections() {
    const promises = [];
    const sections = [
        'labels',
        'messages'
    ];

    for (let name of sections) {
        promises.push(loadSection(name));
    }

    return Promise.all(promises);
}

/**
 * Load a specific translation section from the server.
 *
 * @param {String} name The section name to be loaded.
 *
 * @return {Promise} Returns a promise which will be resolved once the section is loaded.
 */
export function loadSection(name) {
    return new Promise((resolve) => {
        var request = new XMLHttpRequest();
        request.open('GET', `storage/translations/${getLanguageCode()}/${name}.json`, true);

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

/**
 * Get the translation for a specific key.
 *
 * @param {String} key The translation key.
 * @param {String} section The translation section.
 *
 * @return {String} Returns the translation content.
 */
export function translate(key, section) {
    return sections[section][key];
}