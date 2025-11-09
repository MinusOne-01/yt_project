import { useState, useEffect, useCallback } from "react";
import { fetchVideos } from "@/lib/api";

export default function useFeed() {
    const [allVideos, setAllVideos] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [daysToShow, setDaysToShow] = useState(2);
    const [daysOfData, setDaysOfData] = useState(2);

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
            setDaysOfData(2);
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
            if (daysOfData < days) {
                const data = await fetchVideos(days);
                setAllVideos(data.videos || []);
                setDaysToShow(days);
                setDaysOfData(days);
            }
            else{
            // Update the days filter (this will trigger re-filtering via the computed videos)
            setDaysToShow(days);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // To apply new filters, just changing state to trigger re-render
    const updateFilterList = (groups) => {
        setLoading(true);
        setFilterList(groups);
        setLoading(false);
    }

    // Initial load
    useEffect(() => {
        buildFeed();
    }, []);

    return {
        videos: videos(), // Call the memoized function to get current filtered videos
        extendFeed,
        updateFilterList,
        loading,
        error
    };
}