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

import {translate} from '../libraries/Languages';

class NotificationBox {
    appendTo(container) {
        const template = require('../../templates/components/NotificationBox.html');
        const templateData = {
            notifications: translate('notifications', 'labels'),
            notificationsPlaceholder: translate('notificationsPlaceholder', 'messages')
        };
        container.innerHTML += template(templateData);

        this._bindClickEventListener();
    }

    _bindClickEventListener() {
        document.querySelector('.notification-box img').addEventListener('click', () => {
            const notifications = document.querySelector('.notification-box > div');
            debugger;
            if (notifications.style.display === 'none') {
                notifications.style.display = 'block';
            } else {
                notifications.style.display = 'none';
            }
        });
    }
}

export default NotificationBox;