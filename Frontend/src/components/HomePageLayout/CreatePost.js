import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createPost } from "../../services/postService";
import styles from "./CreatePost.module.css";

function CreatePost({ userId }) {
    const [formData, setFormData] = useState({
        user_id: userId,
        content: "",
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (name === "content") {
            autoResize(e.target);
        }
    };

    const autoResize = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.content.trim()) {
            alert("Please enter some content before submitting.");
            return;
        }

        const data = new FormData();
        data.append("user_id", formData.user_id);
        data.append("content", formData.content);
        if (formData.image) {
            data.append("image_url", formData.image);
        }

        await createPost(data);
        setFormData({
            user_id: userId,
            content: "",
            image: null,
        });
    };

    return (
        <div className={styles.container}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicText">
                    <Form.Control
                        as="textarea"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write something"
                        className={styles.textarea}
                        rows={1}
                    />
                </Form.Group>
                <Form.Group controlId="formFile" className="mt-3">
                    <Form.Control
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    className={styles.button}
                >
                    Post
                </Button>
            </Form>
        </div>
    );
}

export default CreatePost;
