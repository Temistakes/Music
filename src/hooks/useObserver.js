import { useRef } from "react";
import { useEffect } from "react"

export const useObserver = (el, cb, loading, canLoad) => {
    const observer = useRef();

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        if (!canLoad) return;
        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                cb();
            }
        }
        observer.current = new IntersectionObserver(callback);
        observer.current.observe(el.current);
    }, [loading, canLoad]);
}