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

import renderMenuBox from './MenuBox.html';
import './MenuBox.scss';

/**
 * Menu Box Component
 *
 * This component displays the main menu box. It serves as a container of MenuItem instances.
 */
class MenuBox {
    /**
     * Class Constructor
     */
    constructor() {
        /**
         * @type {MenuItem[]}
         */
        this.menuItems = [];
    }

    /**
     * Add item in the menu box.
     *
     * @param {MenuItem} menuItem The MenuItem instance to be added to the box.
     *
     * @return {MenuBox} Class instance for chained method calls.
     */
    addItem(menuItem) {
        this.menuItems.push(menuItem);
        return this;
    }

    /**
     * Get the components HTML.
     */
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