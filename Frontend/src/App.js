import React from "react";
import {Navigate} from "react-router-dom";
import HomePage, {homepageLoader} from "./pages/HomePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import ProfilePage from "./pages/ProfilePage";
import {profileLoader} from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AllUserPage, {AllUserPageLoader} from "./pages/AllUserPage";
import FriendRequestPage, {FriendRequestPageLoader} from "./pages/FriendRequestPage";
import ListFriendPage, {ListFriendPageLoader} from "./pages/ListFriendPage";
import NotificationPostPage, {NotificationPostPageLoader} from "./pages/NotificationPost";
import {checkAuthentication, requireAuthLoader } from "./services/authService";

// Higher-order component for authentication
const RequireAuth = ({ children }) => {
    const isAuthenticated = checkAuthentication();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: (
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                ),
                loader: requireAuthLoader(homepageLoader),
            },
            {
                path: "/profile/:userId",
                element: (
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                ),
                loader: requireAuthLoader(profileLoader),
            },
            {
                path: "/friends",
                element: (
                    <RequireAuth>
                        <ListFriendPage />
                    </RequireAuth>
                ),
                loader: requireAuthLoader(ListFriendPageLoader),
            },
            {
                path: "/everyone",
                element: <AllUserPage />,
                loader: AllUserPageLoader,
            },
            {
                path: "/friendrequest",
                element: <FriendRequestPage />,
                loader: requireAuthLoader(FriendRequestPageLoader),
            },
            {
                path: "/:postId/:commentId",
                element: <NotificationPostPage />,
                loader: requireAuthLoader(NotificationPostPageLoader),
            },
            {
                path: "/:postId",
                element: <NotificationPostPage />,
                loader: requireAuthLoader(NotificationPostPageLoader),
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;