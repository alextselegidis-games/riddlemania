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

import './index.pcss';
import {registerRoutes} from './services/Route';
import {registerErrorHandler} from './services/Environment';
import {loadAllSections, getAvailableLanguages, getLanguageCode} from './services/Language';
import LanguageSwitch from './components/LanguageSwitch/LanguageSwitch';
import NotificationBox from './components/NotificationBox/NotificationBox';

loadAllSections()
    .then(() => {
        registerRoutes();
        registerErrorHandler();

        const tools = document.querySelector('header .tools');

        const languageSwitch = new LanguageSwitch(getAvailableLanguages());
        languageSwitch
            .setCurrentLanguage(getLanguageCode())
            .appendTo(tools)
            .bindLanguageClickListener();

        const notificationBox = new NotificationBox();
        notificationBox
            .appendTo(tools)
            .bindToggleClickListener()
            .bindDocumentClickListener();
    });