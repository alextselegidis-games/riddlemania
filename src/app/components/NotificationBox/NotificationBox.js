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

import {translate} from '../../../app/services/Language';
import {openNotifications, closeNotifications} from '../../services/Notification';
import renderNotificationBox from './NotificationBox.html';
import './NotificationBox.pcss';

/**
 * Notification Box Component
 *
 * This component displays an icon with notification display functionality. The notification content can be
 * handled with the Notifications library.
 */
class NotificationBox {
    /**
     * Append to container.
     *
     * @param {HTMLElement} container The container element to be appended to.
     *
     * @return {NotificationBox} Class instance for chained method calls.
     */
    appendTo(container) {
        const templateData = {
            notifications: translate('notifications', 'labels')
        };

        const tmp = document.createElement('div');
        tmp.innerHTML = renderNotificationBox(templateData);
        container.appendChild(tmp.firstChild);

        return this;
    }

    /**
     * Bind toggle click listener.
     *
     * @return {NotificationBox} Class instance for chained method calls.
     */
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

    /**
     * Bind document click listener.
     *
     * @return {NotificationBox} Class instance for chained method calls.
     */
    bindDocumentClickListener() {
        document.addEventListener('click', () => {
            closeNotifications();
        });

        return this;
    }
}

export default NotificationBox;