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

import '../styles/index.pcss';
import {registerRoutes} from './libraries/Routes';
import {registerErrorHandler} from './libraries/Environment';
import {loadAllSections, getAvailableLanguages, getCurrentLanguage} from './libraries/Languages';
import LanguageSwitch from './components/LanguageSwitch';
import NotificationBox from './components/NotificationBox';

loadAllSections()
    .then(() => {
        registerRoutes();
        registerErrorHandler();

        const header = document.querySelector('header');

        const notificationBox = new NotificationBox();
        notificationBox.appendTo(header);

        const languageSwitch = new LanguageSwitch(getAvailableLanguages());
        languageSwitch
            .setCurrentLanguage(getCurrentLanguage())
            .appendTo(header);

        notificationBox
            .bindToggleClickListener()
            .bindDocumentClickListener();
        languageSwitch.bindLanguageClickListener();
    });