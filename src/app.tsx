import React, {FC} from 'react';
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {useUser} from "./providers";
import {withRole} from "./hocs/withRole.tsx";
import cls from './app.module.css';
import {withAccess} from "./hocs/withAccess.tsx";

interface AppProps {

}

const AdminButton = withRole({
    Component: 'button',
    exclude: ['customer'],
    behavior: 'disabled'
} )

const GetUserButton = withAccess({
    Component: 'button',
    entity: 'user',
    method: 'get'
} )

export const App: FC<AppProps> = (props) => {
    const {} = props;

    const {user, toggleUser} = useUser()

    return (
        <div className={cls.container}>
            <p>Current user: {user.role}</p>

            <div className={cls.controls}>
                <button onClick={toggleUser}>Change user</button>
                <AdminButton>AdminButton</AdminButton>
                <GetUserButton>GetUserButton</GetUserButton>
            </div>

            <RouterProvider router={router} />
        </div>
    );
};

App.displayName = 'App';