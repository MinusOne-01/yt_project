import { useState, useEffect } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed(){
    
    const [videos, setVideos] = useState([]);
    const [filterList, setFilterList] = useState([]);
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

    const addToFilterList = async (links) => {
        try {
            setFilterList((prev) => {

                if (!prev.includes(links)) {
                    return [...prev, links];
                }
                return prev;
            });
        }
        catch(err){
            setError(err.message);
        }
    }

    const removefromFilterList = async (links) => {
        try {
            setFilterList((prev) => {
                if (!prev || prev.length === 0) return [];
                return prev.filter((g) => g !== links);
            });
        }
        catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        buildFeed();
    }, [])

    return { videos, filterList, addToFilterList, removefromFilterList, loading, error, buildFeed };
}

