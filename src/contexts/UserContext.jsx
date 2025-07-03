import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [ loggedUser, setLoggedUser ] = useState(null);
    const [ userRole, setUserRole ] = useState(null);

    const [ somethingChanged, setSomethingChanged ] = useState(false);

    return(
        <UserContext.Provider value={{loggedUser, setLoggedUser, userRole, setUserRole, somethingChanged, setSomethingChanged}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => {
    return useContext(UserContext);
}