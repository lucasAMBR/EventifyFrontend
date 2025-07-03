import style from "../Feed.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useRef } from "react";

export const ImageSelector = ({ onfilesSelected, max = 3 }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).slice(0, max);
        onfilesSelected(files);
    };

    return (
        <div className={style.file_selector_button}>
            <button
                className={style.image_selector_button}
                type="button"
                onClick={handleButtonClick}
            >
                <AddPhotoAlternateIcon sx={{ fill: "#004643" }} />
            </button>

            <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />
        </div>
    );
};
