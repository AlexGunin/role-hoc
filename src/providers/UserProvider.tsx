import {createContext, PropsWithChildren, useContext, useState} from "react";


export type UserRole = 'admin' | 'customer'

interface User {
    id: string;
    name: string;
    role: UserRole;
}

interface IUserContext {
    user: User;
    toggleUser: () => void;
}

const ADMIN_USER: User = {
    id: '1',
    name: 'Admin',
    role: 'admin'
}

const CUSTOMER_USER: User = {
    id: '2',
    name: 'Customer',
    role: 'customer'
}

const UserContext = createContext<IUserContext | null>(null)


const UserProvider = (props: PropsWithChildren) => {
    const [user, setUser] = useState(ADMIN_USER)
    const toggleUser = () => {
        setUser(prev => prev === ADMIN_USER ? CUSTOMER_USER : ADMIN_USER )
    }

    return <UserContext.Provider value={{
        user, toggleUser
    }}>{props.children}</UserContext.Provider>
}



const useUser = () => {
    const context = useContext(UserContext)

    if(!context) throw new Error('You should use hook useUser inside UserProvider')

    return context
}

export {useUser, UserProvider}