import React, {useState, useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";
import NavBar from "../components/Layout/NavBar";
import Category from "../components/Layout/Category";
import Trending from "../components/Layout/Trending";
import styles from "../pages/RootLayout.module.css";
// Import các dịch vụ để lấy dữ liệu người dùng và thông báo
import {getUserById} from "../services/userService";
import {
    getUnreadNotificationByUserId,
    getNotificationByUserId,
    updateNotification
} from "../services/notificationService";
import {jwtDecode} from "jwt-decode";

const RootLayout = () => {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    const [userDetail, setUserDetail] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8080/${user.userId}`);
        socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            console.log("Received notification: ", notification);
            setNotifications(prevList =>
                Array.isArray(prevList) ? [...prevList, notification] : [notification]
            );
            setUnreadNotifications(prevList =>
                Array.isArray(prevList) ? [...prevList, notification] : [notification]
            );
        };

        return () => socket.close(); // Clean up the socket when the component unmounts
    }, [user.userId]);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getUserById(user.userId);
            setUserDetail(userData);
        };

        const fetchNotifications = async () => {
            const notiData = await getNotificationByUserId(user.userId);
            setNotifications(notiData);
        };

        const fetchUnreadNotifications = async () => {
            const notiData = await getUnreadNotificationByUserId(user.userId);
            setUnreadNotifications(notiData);
        };

        fetchUserData();
        fetchNotifications();
        fetchUnreadNotifications();
    }, [user.userId]);

    const handleSetReadStatusNotification = (notification_id) => {
        setUnreadNotifications(prevList => prevList - 1);
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification._id === notification_id
                    ? {...notification, read: true}
                    : notification
            )
        );
    };

    const isProfilePage = location.pathname.startsWith("/profile");

    return (
        <div>
            <NavBar
                userId={user.userId}
                userName={userDetail.fullName}
                numOfNoti={unreadNotifications.length}
                listNoti={notifications}
                onSetReadStatusNotification={handleSetReadStatusNotification}
            />
            <div className={styles.container}>
                {!isProfilePage && (
                    <div className={styles.leftColumn}>
                        <Category/>
                    </div>
                )}
                <div className={styles.middleColumn}>
                    <main>
                        <Outlet/> {/* Nơi các component của route sẽ được hiển thị */}
                    </main>
                </div>
                {!isProfilePage && (
                    <div className={styles.rightColumn}>
                        <Trending/>
                    </div>
                )}
            </div>
        </div>
    );

}
export default RootLayout;
