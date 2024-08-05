import React, { useState, useEffect } from 'react';

// Custom hook to detect mobile devices
export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 700);
        }

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run effect only once

    return isMobile;
}