import { useEffect } from "react"

export const Profile = () => {

        useEffect(() => {
            document.title = "Eventfy - My Profile"
        }, [])

    return(
        <p>
            profile
        </p>
    )
}