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
        const menuBox = new this.components.MenuBox();

        menuBox
            .addItem(new this.components.MenuItem('Play', '#/riddle/1'))
            .addItem(new this.components.MenuItem('FamousRiddles', '#/famous-riddles'))
            .addItem(new this.components.MenuItem('About', '#/about'));

        const templateData = {
            mainMenu: menuBox.getHtml(),
            introTitle: 'Introduction',
            introMessage: 'This is a sample introduction message.'
        };

        const content = document.getElementById('content');
        content.innerHTML = this.template(templateData);
    }
}

export default MainMenu;