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

class MenuItem {
    constructor(title, url) {
        this.title = title;
        this.url = url;
        this.template = require('../../templates/components/MenuItem.html');
    }

    getHtml() {
        const templateData = {
            title: this.title,
            url: this.url
        };

        return this.template(templateData);
    }
}

export default MenuItem;