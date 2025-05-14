import { useEffect, useRef, useState } from "react"

export const useAudioTime = (getPosition) => {
    const ref = useRef();
    const [time, setTime] = useState(0);
    const [isStopped, setStopped] = useState(false);

    const stop = () => {
        setStopped(true);
    }

    const play = () => {
        setStopped(false);
    }

    useEffect(() => {
        const animate = () => {
            setTime(getPosition());
            ref.current = requestAnimationFrame(animate);
        }

        if (!isStopped) {
            ref.current = requestAnimationFrame(animate);
        }   else {
            cancelAnimationFrame(ref.current);
        }

        return () => {
            if (ref.current) {
                cancelAnimationFrame(ref.current);
            }
        };
    }, [getPosition, isStopped]);

    return [time, stop, play];
}