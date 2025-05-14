import { useEffect } from "react"

export const Subscriptions = () => {

    useEffect(() => {
        document.title = "Eventfy - My Subscriptions"
    }, [])

    return(
        <p>
            Subscriptions
        </p>
    )
}