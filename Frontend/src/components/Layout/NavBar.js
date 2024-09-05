import React, { useState } from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import userService from "../../services/userService";
import { FaBell } from 'react-icons/fa';
import NotificationList from "../NotificationPageLayout/NotificationList"; // Ensure correct path
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar({ userId, userName, numOfNoti, listNoti, onSetReadStatusNotification }) {
    // console.log("userID: ", userId);
    const [modalShow, setModalShow] = useState(false);

    const handleLogout = async () => {
        await userService.logoutUser();
        window.location.href = "/login";
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const searchValue = event.target.elements.search.value;
        console.log("Search value:", searchValue);
    };

    const handleProfileClick = () => {
        window.location.href = "/profile/" + userId;
    };

    const handleNotificationClick = () => {
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                width: "100%",
                zIndex: 1000,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                fontFamily: "sans-serif",
            }}
        >
            <Navbar expand="lg" className="custom-navbar bg-body-tertiary">
                <Container>
                    <Navbar.Brand
                        href="/"
                        style={{ font: "Arrival, san serif", fontWeight: "bold" }}
                    >
                        MyBlog
                    </Navbar.Brand>
                    <Form className="d-flex" onSubmit={handleSearchSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            name="search"
                        />
                    </Form>
                    <Nav
                        className="ms-auto my-2 my-lg-0"
                        style={{ maxHeight: "100px" }}
                        navbarScroll
                    >
                        <Nav.Link onClick={handleNotificationClick}>
                            <FaBell /> {/* Icon component */}
                            {numOfNoti}
                            {/*{numOfNoti > 0 && <span className="badge">{numOfNoti}</span>}*/}
                        </Nav.Link>
                        <Nav.Link as={Link} onClick={handleProfileClick}>
                            {userName}
                        </Nav.Link>
                        <Nav.Link as={Link} to="#" onClick={handleLogout}>
                            Logout
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <NotificationList show={modalShow} onHide={handleClose} notifications={listNoti} onSetReadStatusNotification={onSetReadStatusNotification} />
        </div>
    );
}

export default NavBar;
