import {createContext, PropsWithChildren, useContext} from "react";

interface IAccessContext {

}

const AccessContext = createContext<IAccessContext>({})


const AccessProvider = (props: PropsWithChildren) => {




    return <AccessContext.Provider value={{}}>{props.children}</AccessContext.Provider>
}



const useAccess = () => {
    const context = useContext(AccessContext)

    if(!context) throw new Error('You should use hook useUser inside UserProvider')

    return context
}

export {useAccess, AccessProvider}