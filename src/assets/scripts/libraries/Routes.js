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
import MainMenu from '../controllers/MainMenu';
import About from '../controllers/About';
import FamousRiddles from '../controllers/FamousRiddles';
import Riddle from '../controllers/Riddle';

const routes = {
    '/': new MainMenu(),
    '/about': new About(),
    '/famous-riddles': new FamousRiddles(),
    '/riddles/:riddle': new Riddle()
};

export function registerRoutes() {
    let base = location.pathname;

    if (base.includes('.html')) {
        base = base.split('/');
        base.pop();
        base = base.join('/');
    }

    page.base(base);

    for (let route in routes) {
        routes[route].register(page, route);
    }
    page({
        hashbang: true
    });
}
