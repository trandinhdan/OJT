import React from "react";
import {Link} from "react-router-dom";
import styles from "../Card/NotificationCard.module.css";
import {updateNotification} from "../../services/notificationService";

function NotificationCard({
                              notification,
                              onSetReadStatusNotification,
                          }) {
    const notificationClass = notification.read ? styles.read : styles.unread;

    const handleClick = async () => {
        onSetReadStatusNotification(notification._id);
        await updateNotification({_id: notification._id, read: true});
    };
    // console.log("data", {comment_id: notification.comment_id._id, user_id: notification.user_id._id, ownerUser_id: notification.ownerUser_id});

    // Tạo URL chuyển hướng nếu có
    let toUrl = `/${notification.post_id?._id || ""}`;
    if (notification.comment_id) {
        toUrl += `/${notification.comment_id._id}`;
    }

    // Nội dung thông báo
    let notificationContent;
    if (notification.type === "friend_request") {
        notificationContent = (
            <span>
                <strong>{notification.user_id.fullName}</strong> was sent a friend request
            </span>
        );
    } else if (notification.type === "accepted_friend_request") {
        notificationContent = (
            <span>
                <strong>{notification.user_id.fullName}</strong> was accept a friend request
            </span>
        );

        // } else if (notification.type === "rejected_friend_request") {
        //     notificationContent = (
        //         <span>
        //     <strong>{notification.user_id.fullName}</strong> was remove a friend request
        //   </span>
        //     );
    } else if (notification.type === "tag") {
        notificationContent = (
            <span>
                <strong>{notification.user_id.fullName}</strong> tagged you in a comment
            </span>
        );

    } else {
        notificationContent = (
            <span>
                <strong>{notification.user_id.fullName}</strong> {notification.type} your post
            </span>
        );
    }

    // Hiển thị dưới dạng Link hoặc div dựa trên điều kiện
    return notification.type === "tag" || notification.type === "comment" ? (
        <Link to={toUrl} className={`${styles.notificationCard} ${notificationClass}`} onClick={handleClick}>
            {notificationContent}
        </Link>
    ) : (
        <div className={`${styles.notificationCard} ${notificationClass}`} onClick={handleClick}>
            {notificationContent}
        </div>
    );
}

export default NotificationCard;
