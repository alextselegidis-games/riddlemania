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
import renderNotificationBox from '../../templates/components/NotificationBox.html';

class NotificationBox {
    appendTo(container) {
        const templateData = {
            notifications: translate('notifications', 'labels'),
            notificationsPlaceholder: translate('notificationsPlaceholder', 'messages')
        };
        container.innerHTML += renderNotificationBox(templateData);

        return this;
    }

    bindToggleClickListener() {
        document.querySelector('.toggle').addEventListener('click', event => {
            event.preventDefault();

            const notifications = document.querySelector('.notification-box > div');

            if (notifications.style.display === 'none') {
                notifications.style.display = 'block';
            } else {
                notifications.style.display = 'none';
            }
        });
    }
}

export default NotificationBox;