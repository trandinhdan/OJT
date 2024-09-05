import React from "react";

function Trending() {
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
            <h5>Trending in blog</h5>
            <ul style={{ listStyleType: "none", textAlign: "left" }}>
                <li>#vietnam</li>
                <li>#trending</li>
            </ul>
        </div>
    );
}

export default Trending;
