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

class MenuBox {
    constructor() {
        this.menuItems = [];
        this.template = require('../../templates/components/MenuBox.html')
    }

    addItem(menuItem) {
        this.menuItems.push(menuItem);
        return this;
    }

    getHtml() {
        let menuItemsHtml = '';

        for (let menuItem of this.menuItems) {
            menuItemsHtml += menuItem.getHtml();
        }

        const templateData = {
            menuItems: menuItemsHtml
        };

        return this.template(templateData);
    }
}

export default MenuBox;