import { useState, useEffect } from "react";
import api from "../../../services/Api";
import { useUserContext } from "../../../contexts/UserContext";
import QRCode from "react-qr-code";
import { useRef } from "react";
import style from "../Events.module.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const GenerateConfirmationCodeModal = ({setGenerateConfirmationCodeModalIsOpen, eventId, eventType}) => {

    const { loggedUser } = useUserContext();
   
    const [loading, setLoading] = useState(false);

    const [confirmationCode, setConfirmationCode] = useState("");

    const generateQRCode = () => {
        const qrCode = `http://localhost:5173/confirmation?code=${confirmationCode}&type=${eventType}`;
        return qrCode;
    }

    const handleGenerateConfirmationCode = async() => {
        setLoading(true);
        try {
            const response = await api.post(`/confirmation/${loggedUser}/generate/${eventId}`);

            setConfirmationCode(response.data.code);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const svgRef = useRef(null);

    const downloadQRCode = () => {
        const svg = svgRef.current;
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgString], {type: "image/svg+xml"});
        const url = URL.createObjectURL(svgBlob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.svg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    useEffect(() => {
        handleGenerateConfirmationCode();
    }, []);

    return (
        <div className={style.cancel_modal_area}>
            <div className={style.cancel_modal}>
            <p className={style.close_add_event} onClick={() => setGenerateConfirmationCodeModalIsOpen(false)}><ArrowBackIosIcon sx={{fill: "#004643"}}/> Close</p>
                <h2>Generate Presence Confirmation QR Code</h2>
                {loading ? 
                <p>Loading...</p> 
                : 
                <div className={style.qr_code_area}>
                    <QRCode value={generateQRCode()} size={200} ref={svgRef}/>  
                    <button onClick={downloadQRCode}>Download QR Code</button> 
                    <p>Or link: {generateQRCode()}</p>
                </div>
                }
        </div>
        </div>
    );
};