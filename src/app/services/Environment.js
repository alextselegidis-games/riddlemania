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

/**
 * Register Global Error Handler
 *
 * Handles the application errors by providing extra logging information.
 */
export function registerErrorHandler() {
    window.onerror = function() {
        let opacity = 1;

        const fadeAnimationInterval = setInterval(() => {
            opacity -= 0.1;
            document.body.style.opacity = opacity;

            if (opacity < 0.3) {
                clearInterval(fadeAnimationInterval);
            }
        }, 100);

        console.error('Riddles4U Error Handler: ', arguments);
    };
}