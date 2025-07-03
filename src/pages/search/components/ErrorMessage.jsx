import style from "./ErrorMessage.module.css"

export const ErrorMessage = ({ message }) => {

    return(
        <div className={style.error_message}>
            <p>Error: { message }</p>
        </div>
    )
}