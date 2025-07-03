import { ArrowBackIos } from "@mui/icons-material";
import style from "../Profile.module.css";
import { useState } from "react";
import api from "../../../services/Api";


export const ChangePasswordModal = ({setChangePasswordModal}) => {
   
    const [selectedTab, setSelectedTab] = useState("initial");

    const [ requestCodeEmailInput, setRequestCodeEmailInput ] = useState(""); 
    const handleCodeEmailInputChange = (e) => {
        setRequestCodeEmailInput(e.target.value)   
    }

    const [ resetPasswordEmail, setResetPasswordEmail ] = useState("");
    const [ resetPasswordToken, setResetPasswordToken] = useState("");
    const [ resetPasswordNewPassword, setResetPasswordNewPassword] = useState("");
    const [resetPasswordConfirm, setResetPasswordConfirm] = useState("");

    const handlePasswordEmailChange = (e) => {
        setResetPasswordEmail(e.target.value)
    }

    const handlePassordToken = (e) => {
        setResetPasswordToken(e.target.value)
    }

    const handleNewPassword = (e) => {
        setResetPasswordNewPassword(e.target.value);
    }

    const handleConfirm = (e) => {
        setResetPasswordConfirm(e.target.value);
    }

    const handleGenerateCode = async() => {
        try{
            const response = await api.post("auth/request-reset-code", {
                email: requestCodeEmailInput
            });

            if(response.status == 200){
                setSelectedTab("change_password")
            }
        }catch(error){
            console.log(error);
        }
    }

    const handlePassordChange = async() => {
        try{
            const response = await api.post("auth/reset-password", 
                {
                    email: resetPasswordEmail,
                    newPassword: resetPasswordNewPassword,
                    token: resetPasswordToken
                }
            )
            setChangePasswordModal(false);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className={style.change_password_modal_area}>
            <div className={style.change_password_modal_content}>
            <div className={style.change_password_modal_close_button}>
                <button onClick={() => setChangePasswordModal(false)}><ArrowBackIos sx={{color: "#004643"}} /> Close</button>
            </div>
            <h1>Change Password</h1>
            {selectedTab == "initial" && 
            <>
            <div className={style.change_password_modal_initial}>
                <p>To change your password, you need the change password code sent to your email</p>
                <div className={style.change_password_modal_tabs}>
                    <button onClick={() => setSelectedTab("change_password")}>I already have the code</button>
                    <button onClick={() => setSelectedTab("get_code")}>I need a new code</button>
                </div>
            </div>
            </>
            }
            {selectedTab == "change_password" && 
            <>
            <div className={style.change_password_modal_change_password}>
                <p>Enter the code you received by email, this account email and your new password</p>
                <input type="text" placeholder="Code" value={resetPasswordToken} onChange={handlePassordToken}/>
                <input type="email" placeholder="Email" value={resetPasswordEmail} onChange={handlePasswordEmailChange}/>
                <input type="password" placeholder="New Password" value={resetPasswordNewPassword} onChange={handleNewPassword}/>
                <input type="password" placeholder="Confirm New Password" value={resetPasswordConfirm} onChange={handleConfirm}/>
                <button onClick={handlePassordChange}>Change Password</button>
            </div>
            </>
            }
            {selectedTab == "get_code" && 
            <>
            <div className={style.change_password_modal_change_password}>
                <p>Enter this account email to receive the change password code</p>
                <input type="email" placeholder="Email" value={requestCodeEmailInput} onChange={handleCodeEmailInputChange}/>
                <button onClick={handleGenerateCode}>Get Code</button>
            </div>
            </>
            }
            </div>
        </div>
    )
}