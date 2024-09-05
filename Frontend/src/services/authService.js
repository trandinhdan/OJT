
import { redirect } from "react-router-dom";

export const requireAuthLoader = (loader) => async (args) => {
    const isAuthenticated = checkAuthentication();
    if (!isAuthenticated) {
        return redirect("/login");
    }
    return loader ? loader(args) : null;
};


export function checkAuthentication() {
    const token = localStorage.getItem("token");
    return token !== null;
}