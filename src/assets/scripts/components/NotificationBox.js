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
import {openNotifications, closeNotifications} from '../libraries/Notifications';
import renderNotificationBox from '../../templates/components/NotificationBox.html';

class NotificationBox {
    appendTo(container) {
        const templateData = {
            notifications: translate('notifications', 'labels')
        };
        container.innerHTML += renderNotificationBox(templateData);

        return this;
    }

    bindToggleClickListener() {
        document.querySelector('.toggle').addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();

            const notifications = document.querySelector('.notifications');

            if (notifications.style.display === 'none') {
                openNotifications();
            } else {
                closeNotifications();
            }
        });

        return this;
    }

    bindDocumentClickListener() {
        document.addEventListener('click', () => {
            closeNotifications();
        });

        return this;
    }
}

export default NotificationBox;