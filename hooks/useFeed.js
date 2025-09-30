import { useState, useEffect } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed(){
    
    const [allVideos, setAllVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const buildFeed = async () => {
        try {
            const data = await fetchVideos();
            setLoading(false);
            setVideos(data.videos || []);
            setAllVideos(data.videos || []);
        }
        catch (err) {
            setError(err.message);
        }
    }
    
    const removeFilters = async () => {
        console.log("Filters removed!");
        setVideos(allVideos);
    }

    const filterFeed = async () => {
        try {
            console.log("filterdata->", filterList);

            const showChannels = new Set(filterList.flat().map(f => f.channelId));
            console.log("showchannel->", showChannels);
            console.log("allvids->",allVideos);

            if (showChannels.size === 0) {
                setVideos([]);
            } else {
                setVideos(allVideos.filter(v => showChannels.has(v.channelId)));
            }
        }
        catch (err) {
            setError(err.message);
        }
    }

    const addToFilterList = async (links) => {
        try {
            if(links.length === 0) return;
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
            if(links.length === 0){
                return;
            }
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

    return { videos, filterFeed, removeFilters, filterList, addToFilterList, removefromFilterList, loading, error };
}

