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

// Controllers
import About from './controllers/About';
import FamousRiddles from './controllers/FamousRiddles';
import Instructions from './controllers/Instructions';
import MainMenu from './controllers/MainMenu';
import Riddle from './controllers/Riddle';

// Components
import AnswerBox from './components/AnswerBox';
import ContentBox from './components/ContentBox';
import LanguageSwitch from './components/LanguageSwitch';
import MenuBox from './components/MenuBox';
import MenuItem from './components/MenuItem';
import SocialShare from './components/SocialShare';

const components = {
    AnswerBox,
    ContentBox,
    LanguageSwitch,
    MenuBox,
    MenuItem,
    SocialShare
};

const routes = {
    '/': new MainMenu(components),
    '/about': new About(components),
    '/famous-riddles': new FamousRiddles(components),
    '/instructions': new Instructions(components),
    '/riddles/:riddle': new Riddle(components)
};

export function registerRoutes() {
    for (let route in routes) {
        routes[route].register(page, route);
    }
    page();
}
