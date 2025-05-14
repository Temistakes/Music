import { useState } from "react"

export const useLoading = (cb) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const callback = async () => {
        try {
            setLoading(true);
            await cb();
        }   catch (e) {
            setError(e);
        }   finally {
            setLoading(false);
        }
    }

    return [loading, callback, error];
}