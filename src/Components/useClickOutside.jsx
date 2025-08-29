import { useEffect } from 'react';

/**
 * A custom hook that triggers a callback when a click is detected outside of a referenced element.
 * @param {React.RefObject<HTMLElement>} ref - The ref of the element to monitor.
 * @param {() => void} callback - The function to call when a click outside is detected.
 */
export const useClickOutside = (ref, callback) => {
    useEffect(() => {
        const handleClickOutside = (event) => {
            // If the ref exists and the click was not inside the ref's element, call the callback
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        // Add the event listener to the document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove the listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]); // Re-run the effect if the ref or callback changes
};