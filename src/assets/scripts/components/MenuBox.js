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

import renderMenuBox from '../../templates/components/MenuBox.html';

class MenuBox {
    constructor() {
        this.menuItems = [];
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

        return renderMenuBox(templateData);
    }
}

export default MenuBox;