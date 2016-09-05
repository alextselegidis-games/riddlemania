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

class MainMenu {
    constructor(components) {
        this.components = components;
        this.template = require('../../templates/controllers/MainMenu.html');
    }

    register(page, route) {
        page(route, () => this.display());
    }

    display() {
        const content = document.getElementById('content');
        content.innerHTML = this.template();
    }
}

export default MainMenu;