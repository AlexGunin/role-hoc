import {UserRole, useUser} from "../providers";
import {NoAccess} from "../pages";
import {FC, ReactElement} from "react";

interface WithRoleArgs<P extends Record<string, unknown>> {
    Component: FC<P> | keyof HTMLElementTagNameMap,
    role?: UserRole;
    exclude?: UserRole | UserRole[];
    include?: UserRole | UserRole[]
}

type DisabledBehavior = {
    disabled?: boolean;
    title?: string
}

interface WithRoleNoAccessBehavior<P extends  Record<string, unknown>> extends WithRoleArgs<P>{
    behavior: 'no-access-page'
}

interface WithRoleDisabledBehavior<P extends DisabledBehavior> extends WithRoleArgs<P>{
    behavior: 'disabled'
}

interface WithRoleNullishBehavior<P extends Record<string, unknown>> extends WithRoleArgs<P>{
    behavior: 'nullish'
}

type WithRole =  {
    <P extends Record<string, unknown>, >(args: WithRoleNoAccessBehavior<P>): (props: P) => ReactElement;
    <P extends Record<string, unknown>, >(args: WithRoleDisabledBehavior<P & DisabledBehavior>): (props: P & DisabledBehavior) => ReactElement;
    <P extends Record<string, unknown>, >(args: WithRoleNullishBehavior<P>): (props: P) => ReactElement;
}

const fitRole = (currentRole: UserRole, role?: UserRole, include?: UserRole | UserRole[], exclude?: UserRole | UserRole[]) => {
    if(!include && !exclude) return currentRole === role

    const arrInclude = Array.isArray(include) ? include : [include]
    const arrExclude = Array.isArray(exclude) ? exclude : [exclude]

    if(include && exclude) {
        return arrInclude.includes(currentRole) && !arrExclude.includes(currentRole)
    }

    return include ? arrInclude.includes(currentRole) : !arrExclude.includes(currentRole)

}

export const withRole: WithRole = (args) => (props) => {
    const {role, behavior, Component, exclude, include} = args
    const {user} = useUser()

    if(!fitRole(user.role, role, include, exclude)) {
        switch (behavior) {
            case "disabled":
                return <Component {...props} disabled={true} title="У вас нет достаточно прав, чтобы выполнить это действие"/>
            case "no-access-page":
                return <NoAccess/>
            case 'nullish':
                return <></>
        }
    }

    return <Component {...props}/>
}
