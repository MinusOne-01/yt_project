import { useState, useEffect } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed(){
    
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buildFeed = async () => {
        try {
            const data = await fetchVideos();
            setLoading(false);
            setVideos(data || []);
        }
        catch (err) {
            setError(err.message);
        }
    }

    useEffect(() => {
        buildFeed();
    }, [])

    return { videos, loading, error, buildFeed };
}

