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

class Riddles {
    constructor(components) {
        this.components = components;
    }

    register(page, route) {
        page(route, this.load.bind(this), this.display.bind(this));
    }

    load(context, next) {

    }

    display(content, next) {

    }
}

export default Riddles;