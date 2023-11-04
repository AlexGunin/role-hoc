import {createContext, PropsWithChildren, useContext} from "react";
import {useUser} from "./UserProvider.tsx";

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'

export type Entity = 'user' | 'comment'

export type EntityAccess = boolean | {
    [key in HttpMethod]?: boolean;
}

export type Access = {
    [key in Entity]?: EntityAccess
}

const ADMIN_ACCESS: Access = {
    user: true,
    comment: {
        get: true
    }
}

const CUSTOMER_ACCESS: Access = {

}

const AccessContext = createContext<Access>({})

const AccessProvider = (props: PropsWithChildren) => {
    const {user} = useUser()

    return <AccessContext.Provider value={user.role === 'admin' ? ADMIN_ACCESS : CUSTOMER_ACCESS}>{props.children}</AccessContext.Provider>
}



const useAccess = () => {
    const context = useContext(AccessContext)

    if(!context) throw new Error('You should use hook useUser inside UserProvider')

    return context
}

export {useAccess, AccessProvider}