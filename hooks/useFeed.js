import { useState, useEffect, useCallback } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed() {
    const [allVideos, setAllVideos] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [daysToShow, setDaysToShow] = useState(2);

    // Derived state: compute filtered videos based on allVideos, filterList, and daysToShow
    const videos = useCallback(() => {
        let filtered = allVideos;

        // Apply date filter
        if (daysToShow) {
            const now = new Date();
            const cutoff = new Date(now.getTime() - daysToShow * 24 * 60 * 60 * 1000);
            filtered = filtered.filter(video => new Date(video.published) >= cutoff);
        }

        // Apply group filter
        if (filterList.length > 0) {
            const allLinks = filterList.flatMap(group => group.links);
            const showChannels = new Set(allLinks.map(link => link.channelId));
            
            if (showChannels.size > 0) {
                filtered = filtered.filter(v => showChannels.has(v.channelId));
            } else {
                filtered = [];
            }
        }

        return filtered;
    }, [allVideos, filterList, daysToShow]);

    // Initial feed build
    const buildFeed = async () => {
        try {
            setLoading(true);
            const data = await fetchVideos(2);
            setAllVideos(data.videos || []);
            setDaysToShow(2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Extend feed to show older videos
    const extendFeed = async (days) => {
        try {
            setLoading(true);
            
            // If we need more data than we currently have, fetch it
            if (daysToShow < days) {
                const data = await fetchVideos(days);
                setAllVideos(data.videos || []);
            }
            
            // Update the days filter (this will trigger re-filtering via the computed videos)
            setDaysToShow(days);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // These functions now just manage filterList - the actual filtering happens in the computed videos
    const addToFilterList = (group) => {
        if (!group || group.length === 0) return;
        
        setFilterList((prev) => {
            // Check if group already exists by id
            if (prev.some(g => g.id === group.id)) {
                return prev;
            }
            return [...prev, group];
        });
    };

    const removefromFilterList = (group) => {
        if (!group || group.length === 0) return;
        
        setFilterList((prev) => {
            return prev.filter((g) => g.id !== group.id);
        });
    };

    const removeFilters = () => {
        setFilterList([]);
    };

    // Initial load
    useEffect(() => {
        buildFeed();
    }, []);

    return {
        videos: videos(), // Call the memoized function to get current filtered videos
        extendFeed,
        removeFilters,
        filterList,
        addToFilterList,
        removefromFilterList,
        loading,
        error,
        daysToShow
    };
}