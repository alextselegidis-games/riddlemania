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
let currentLanguageCode = localStorage.getItem('r4u-language-code') || 'en';

/**
 * Get current language code.
 *
 * @return {String} Returns the language code.
 */
export function getLanguageCode() {
    return currentLanguageCode;
}

/**
 * Set current language code.
 *
 * @param {String} languageCode Provide one of the available language codes.
 */
export function setLanguageCode(languageCode) {
    currentLanguageCode = languageCode;
    localStorage.setItem('r4u-language-code', languageCode);
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
export async function loadAllSections() {
    const sections = [];

    const names = [
        'labels',
        'messages'
    ];

    for (let name of names) {
        sections.push(await loadSection(name));
    }

    return sections;
}

/**
 * Load a specific translation section from the server.
 *
 * @param {String} name The section name to be loaded.
 *
 * @return {Promise} Returns a promise which will be resolved once the section is loaded.
 */
export async function loadSection(name) {
    const response = await fetch(`storage/translations/${getLanguageCode()}/${name}.json`, {credentials: 'include'});

    sections[name] = await response.json();

    return sections[name];
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