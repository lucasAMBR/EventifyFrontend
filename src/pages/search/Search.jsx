import { useEffect } from "react"

export const Search = () => {

        useEffect(() => {
            document.title = "Eventfy - Search"
        }, [])

    return(
        <p>
            Search
        </p>
    )
}