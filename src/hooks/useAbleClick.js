import { useRef } from "react";

export const useAbleClick = () => {
    const refClickDisabled = useRef(false);

    const handleDisableClick = () => {
        refClickDisabled.current = true;
    }

    const handleAbleClick = () => {
        refClickDisabled.current = false;
    }

    return [refClickDisabled, handleDisableClick, handleAbleClick];
}