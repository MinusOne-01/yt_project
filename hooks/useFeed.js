import { useState, useEffect } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed(){
    
    const [allVideos, setAllVideos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currData, setCurrData] = useState('');

    const buildFeed = async () => {
        try {
            setCurrData(2);
            const data = await fetchVideos(2);
            setLoading(false);
            setVideos(data.videos || []);
            setAllVideos(data.videos || []);
        }
        catch (err) {
            setError(err.message);
        }
    }

    const extendFeed = async (days) => {
        try {
            setLoading(true);
            if(currData >= days){
                const now = new Date();
                const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
                setVideos(allVideos.filter(video => new Date(video.published) >= cutoff));
                if (filterFeed.length !== 0) filterFeed();

            } else {
                setCurrData(days);
                const data = await fetchVideos(days);
                setAllVideos(data.videos || []);
                setVideos(data.videos);
                if (filterFeed.length !== 0) filterFeed();
            }
            setLoading(false);
        }
        catch (err) {
            setError(err.message);
        }
    }

    const filterFeed = async () => {
        try {
            console.log("filterdata->", filterList);
            const allLinks = filterList.flatMap(group => group.links); 

            const showChannels = new Set(allLinks.map(link => link.channelId));
            console.log("showchannel->", showChannels);
            console.log("allvids->",allVideos);

            if (showChannels.size === 0) {
                setVideos([]);
            } else {
                setVideos((prev) => prev.filter(v => showChannels.has(v.channelId)));
            }
        }
        catch (err) {
            setError(err.message);
        }
    }

    const removeFilters = async () => {
        console.log("Filters removed!");
        setVideos(allVideos);
    }

    const addToFilterList = async (group) => {
        try {
            if(group.length === 0) return;
            setFilterList((prev) => {

                if (!prev.includes(group.id)) {
                    return [...prev, group];
                }
                return prev;
            });
        }
        catch(err){
            setError(err.message);
        }
    }

    const removefromFilterList = async (group) => {
        try {
            if(group.length === 0){
                return;
            }
            setFilterList((prev) => {
                if (!prev || prev.length === 0) return [];
                return prev.filter((g) => g.id !== group.id);
            });
        }
        catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        buildFeed();
    }, [])

    return { videos, extendFeed, filterFeed, removeFilters, filterList, addToFilterList, removefromFilterList, loading, error };
}

