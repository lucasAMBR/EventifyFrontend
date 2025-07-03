import { useState, useEffect } from "react";
import api from "../../../services/Api";
import style from "../Login.module.css";
import { ArrowBack } from "@mui/icons-material";
import { ErrorMessage } from "./ErrorMessage";
import { useUserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export const DefaultRegister = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Eventfy - Register";
    }, []);

    const { loggedUser, setLoggedUser, setUserRole } = useUserContext();

    const [userType, setUserType] = useState("default");

    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [cpfInput, setCpfInput] = useState("");
    const [birthInput, setBirthInput] = useState("");
    const [contactInput, setContactInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [profilePicInput, setProfilePicInput] = useState(null);

    const handleReturnClick = () => {
        navigate("/");
    };

    const handleNameChange = (e) => {
        setNameInput(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
    };
    const handleCpfChange = (e) => {
        setCpfInput(e.target.value);
    };
    const handleBirthChange = (e) => {
        setBirthInput(e.target.value);
    };
    const handleContactChange = (e) => {
        setContactInput(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPasswordInput(e.target.value);
    };
    const handleProfilePicChange = (e) => {
        setProfilePicInput(e.target.files[0]);
    };

    const clearInputs = () => {
        setNameInput("");
        setEmailInput("");
        setCpfInput("");
        setBirthInput("");
        setContactInput("");
        setPasswordInput("");
        setProfilePicInput(null);
    };

    const handleSwitchUserType = (type) => {
        setUserType(type);
        clearInputs();
    };

    const handleDefaultUserSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage(null);

        const formData = new FormData();

        formData.append("email", emailInput);
        formData.append("name", nameInput);
        formData.append("password", passwordInput);
        if (profilePicInput) {
            formData.append("profilePic", profilePicInput);
        }
        formData.append("birth", birthInput);
        formData.append("cpf", cpfInput);

        setLoading(true);

        try {
            const response = await api.post("/user/register-normal", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            handleLoginAction(emailInput, passwordInput);
        } catch (apiError) {
            console.log(apiError);
            setErrorMessage(apiError);
            setLoading(false);
        }
    };

    const handleOrganizerUserSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage(null);

        const formData = new FormData();

        formData.append("email", emailInput);
        formData.append("name", nameInput);
        formData.append("password", passwordInput);
        if (profilePicInput) {
            formData.append("profilePic", profilePicInput);
        }
        formData.append("contact", contactInput);
        formData.append("cpf", cpfInput);

        setLoading(true);

        try {
            const response = await api.post("/user/register-organizer", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setLoading(false);

            handleLoginAction(emailInput, passwordInput);
        } catch (apiError) {
            console.log(apiError);
            setErrorMessage(apiError);
            setLoading(false);
        }
    };

    const handleLoginAction = async (email, password) => {
        setLoading(true);

        const formData = new FormData();

        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await api.post("/auth/login", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setLoggedUser(response.data.id);
            setUserRole(response.data.role);
            setLoading(false);
            navigate("/home");
        } catch (apiError) {
            console.log(apiError);
            setErrorMessage(apiError);
            setLoading(false);
        }
    };

    return (
        <div className={style.form}>
            <div className={style.return_button} onClick={handleReturnClick}>
                <ArrowBack className={style.arrow} sx={{ fill: "#FFFFFF" }} />
            </div>
            <div className={style.section_area}></div>
            <p className={style.section_title}>You are a:</p>
            <div className={style.section_option}>
                <span
                    className={userType == "default" ? style.active : style.default}
                    onClick={() => handleSwitchUserType("default")}
                >
                    Default
                </span>
                |
                <span
                    className={userType == "organizer" ? style.active : style.default}
                    onClick={() => handleSwitchUserType("organizer")}
                >
                    Organizer
                </span>
            </div>
            {errorMessage != null ? (
                        <ErrorMessage message={errorMessage.message} />
                    ) : (
                        ""
                )}
            {userType == "default" && (
                <form className={style.login_form} onSubmit={handleDefaultUserSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="your name here"
                        value={nameInput}
                        onChange={handleNameChange}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="example@email.com"
                        value={emailInput}
                        onChange={handleEmailChange}
                    />
                    <label>CPF</label>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="xxxxxxxxxxx"
                        value={cpfInput}
                        onChange={handleCpfChange}
                    />
                    <label>Birth</label>
                    <input
                        type="date"
                        className={style.input}
                        value={birthInput}
                        onChange={handleBirthChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        className={style.input}
                        placeholder="insert your password"
                        value={passwordInput}
                        onChange={handlePasswordChange}
                    />
                    <div className={style.profile_pic_area}>
                        <p className={style.profile_pic_title}>Profile pic</p>
                        <input
                            id="file-upload"
                            type="file"
                            name="Profile pic"
                            onChange={handleProfilePicChange}
                        />
                    </div>
                    <button type="submit" className={style.submit}>
                        Register
                    </button>
                </form>
            )}
            {userType == "organizer" && (
                <form className={style.login_form} onSubmit={handleOrganizerUserSubmit}>
                    <label>Name</label>
                    <input
                        type="text"
                        className={style.input}
                        value={nameInput}
                        onChange={handleNameChange}
                        placeholder="your name here"
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        className={style.input}
                        value={emailInput}
                        onChange={handleEmailChange}
                        placeholder="example@email.com"
                    />
                    <label>CPF</label>
                    <input
                        type="text"
                        className={style.input}
                        value={cpfInput}
                        onChange={handleCpfChange}
                        placeholder="XXXXXXXXXXX"
                    />
                    <label>Contact</label>
                    <input
                        type="text"
                        className={style.input}
                        value={contactInput}
                        onChange={handleContactChange}
                        placeholder="+55 (12) 3456-7890"
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        className={style.input}
                        value={passwordInput}
                        onChange={handlePasswordChange}
                        placeholder="password"
                    />
                    <div className={style.profile_pic_area}>
                        <p className={style.profile_pic_title}>Profile pic</p>
                        <input
                            id="file-upload"
                            type="file"
                            name="Profile pic"
                            onChange={handleProfilePicChange}
                        />
                    </div>
                    <button type="submit" className={style.submit}>
                        Register
                    </button>
                </form>
            )}
        </div>
    );
};
