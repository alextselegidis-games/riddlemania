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
import controllers from './controllers';
import components from './components';
import libraries from './libraries';

const routes = {
    '/': new controllers.MainMenu(components),
    '/about': new controllers.About(components),
    '/famous-riddles': new controllers.FamousRiddles(components),
    '/instructions': new controllers.Instructions(components),
    '/riddles/:riddle': new controllers.Riddle(components)
};

export function registerRoutes() {
    page.base(location.pathname);

    for (let route in routes) {
        routes[route].register(page, route);
    }
    page();
}
