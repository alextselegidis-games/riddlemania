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

const routes = {
    '/': new controllers.MainMenu(),
    '/about': new controllers.About(),
    '/famous-riddles': new controllers.FamousRiddles(),
    '/instructions': new controllers.Instructions(),
    '/riddles/:riddle': new controllers.Riddle()
};

export function registerRoutes() {
    page.base(location.pathname);

    for (let route in routes) {
        routes[route].register(page, route);
    }
    page();
}
