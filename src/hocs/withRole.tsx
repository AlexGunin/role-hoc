import {UserRole, useUser} from "../providers";
import {NoAccess} from "../pages";
import {FC} from "react";

export const withRole = <P extends Record<string, unknown>,>(Component: FC<P>, role: UserRole) => (props: P) => {
    const {user} = useUser()

    if(user.role !== role) return <NoAccess/>

    return <Component {...props}/>
}
