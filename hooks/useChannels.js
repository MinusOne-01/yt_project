import { useEffect, useState } from "react";
import { fetchChannel, createChannel, removeChannel } from "@/lib/api";

export default function useChannels(){
   
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getAllch = async () => {
        try{
            setLoading(true);
            const data = await fetchChannel();
            setChannels(data);
            setError(null);
            setLoading(false);
        }
        catch(err){
            setError(err.message);
        }
    }

    const addChannel = async (link) => {
        try{
            const data = await createChannel(link);
            setChannels((prev) => [...prev, data]);
            setError(null);
        }
        catch(err){
            setError(err.message);
        }
    } 

    const delChannel = async (id) => {
        try{
            await removeChannel();
            setChannels((prev) => prev.filter((c) => c.channelID !== id))
        }
        catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        getAll();
    },[])

    return {channels, error, addChannel, delChannel, refetch: getALlch};


}