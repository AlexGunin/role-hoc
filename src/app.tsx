import React, {FC} from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useUser} from "./providers";

interface AppProps {

}

export const App: FC<AppProps> = (props) => {
    const {} = props;

    const {user, toggleUser} = useUser()

    return (
        <div>
            <span>Current user: {user.role}</span>
            <button onClick={toggleUser}>Change user</button>
            <RouterProvider router={router} />
        </div>
    );
};

App.displayName = 'App';