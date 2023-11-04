import {Access, Entity, HttpMethod, useAccess} from "../providers";
import {FC} from "react";

type Method =  boolean | HttpMethod | HttpMethod[]

interface WithAccessProps <P extends Record<string, unknown>, > {
    Component: FC<P> | keyof HTMLElementTagNameMap,
    entity: Entity;
    method: Method;
}

// get, put, post, delete
const AMOUNT_METHODS = 4

const hasAccess = (access: Access, strEntity: Entity, method: Method) => {
    const entityAccess = access?.[strEntity]

    if(!access || !entityAccess) return false

    if(typeof entityAccess === 'boolean') {
        return entityAccess
    }

    if(typeof method === 'boolean') {
        const values = Object.values(access)
        return access[strEntity] === true || (values.length === AMOUNT_METHODS && values.every(Boolean))
    }

    const arrMethods = Array.isArray(method ) ? method : [method]

    return arrMethods.every((met) => entityAccess[met])
}

export const withAccess = <P extends Record<string, unknown>, >(args: WithAccessProps<P>) =>  (props: P) => {
    const {entity, method, Component} = args
    const access = useAccess()

    if(!hasAccess(access, entity, method)) {
        return null
    }

   return <Component {...props} />
}