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

import {translate} from './Languages';

// @todo Add animation effect to the notification open/close.

export function addNotification(message) {
    const notification = document.createElement('li');
    notification.innerHTML = message;
    document.querySelector('.notifications ul').appendChild(notification);
    return notification;
}

export function clearNotifications() {
    document.querySelector('.notifications ul').innerHTML = '';
}

export function openNotifications() {
    const list = document.querySelector('.notifications ul');

    if (list.querySelectorAll('li').length === 0) {
        const placeholder = document.createElement('li');
        placeholder.textContent = translate('notificationsPlaceholder', 'messages');
        placeholder.className = 'placeholder';
        list.appendChild(placeholder);
    }

    document.querySelector('.notifications').style.display = 'block';
}

export function closeNotifications() {
    document.querySelector('.notifications').style.display = 'none';

    const list = document.querySelector('.notifications ul');

    if (list.querySelector('.placeholder')) {
        list.querySelector('.placeholder').remove();
    }
}