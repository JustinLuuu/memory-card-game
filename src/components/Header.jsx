import React, { useEffect, useRef } from 'react'

export const Header = () => {
    const brainRef = useRef(null);

    const switchShowBrain = () => {
        const isDisplaying = brainRef.current.style.display == "block";
        brainRef.current.style.display = isDisplaying ? "none" : "block";
    }

    useEffect(() => {
      //  setInterval(switchShowBrain, 1000);
    }, []);

    return (
        <header className="header-main">
            <h1>
                Memory Game {/*<span ref={brainRef}>🧠</span>*/}
            </h1>
        </header>
    )
}
