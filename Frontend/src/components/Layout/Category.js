import React from "react";
import { SlHome } from "react-icons/sl";
import { SlGraph } from "react-icons/sl";
import { SlEarphonesAlt } from "react-icons/sl";
import { SlBubbles } from "react-icons/sl";
import { LiaUserFriendsSolid } from "react-icons/lia";
function Category() {
    return (
        <div
            className="category"
            style={{
                border: "2px solid #ccc",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                width: "200px",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                <li
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                    }}
                >
                    <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                        <SlHome style={{ marginLeft: "10px" }} />
                        <span style={{ marginLeft: "15px" }}>Home</span>
                    </a>
                </li>
                    {/*<li*/}
                    {/*    style={{*/}
                    {/*        display: "flex",*/}
                    {/*        alignItems: "center",*/}
                    {/*        padding: "10px 0",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <a href="#" style={{ textDecoration: "none", color: "inherit" }}>*/}
                    {/*        <SlGraph style={{ marginLeft: "10px" }} />*/}
                    {/*        <span style={{ marginLeft: "15px" }}>Trend</span>*/}
                    {/*    </a>*/}
                    {/*</li>*/}
                <li
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                    }}
                >
                    <a
                        href="/everyone"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <LiaUserFriendsSolid style={{ marginLeft: "10px" }} />
                        <span style={{ marginLeft: "15px" }}>Friends</span>
                    </a>
                </li>
                <li
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                    }}
                >
                    <a
                        href="/messages"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <SlBubbles style={{ marginLeft: "10px" }} />
                        <span style={{ marginLeft: "15px" }}>Message</span>
                    </a>
                </li>
                <li
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                    }}
                >
                    <a
                        href="#"
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <SlEarphonesAlt style={{ marginLeft: "10px" }} />
                        <span style={{ marginLeft: "15px" }}>Support</span>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Category;
