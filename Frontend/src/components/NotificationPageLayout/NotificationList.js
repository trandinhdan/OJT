import React, { useState } from "react";
import NotificationCard from "../Card/NotificationCard";
import { updateNotification } from "../../services/notificationService";
import { Modal } from "react-bootstrap";

function NotificationList({ show, onHide, notifications, onSetReadStatusNotification }) {

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Notifications</Modal.Title>
            </Modal.Header>
            <Modal.Body key={notifications._id}>
                <div>
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification._id} // Add the key prop here
                            notification={notification}
                            onSetReadStatusNotification={onSetReadStatusNotification}
                        />
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default NotificationList;
