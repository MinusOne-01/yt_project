import { useState, useEffect } from "react";
import { addGroup, fetchGroups, removeGroup, insertinGroup, removefromGroup } from "@/lib/api";

export default function useGroups(){

    const [groups, setGroups] = useState([]);
    const [groupsloading, setGroupsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllgrp = async () => {
        try {
            setGroupsLoading(true);
            const data = await fetchGroups();
            setGroups(data);
            setError(null);
            setGroupsLoading(false);
        }
        catch(err){
            setError(err.message);
        }
    }

    const createGroup = async (name) => {
        try {
            const data = await addGroup(name);
            setGroups((prev) => [...prev, data]);
            setError(null);
        }
        catch(err){
            setError(err.message);
        }
    }

    const delGroup = async (id) => {
        try{
            await removeGroup(id);
            setGroups((prev) => prev.filter((g) => g.id !== id));
        }
        catch(err){
            setError(err.message);
        }
    }

    const addToGroup = async (linkId, channelId, groupId) => {       
        const prevGroups = [...groups];
        try{
            setGroups((prev) =>
                prev.map(g =>
                g.id === groupId ? {...g, links: [...(g.links || []), {channelId : channelId}] } : g                
            ));
            await insertinGroup(linkId, groupId);
        }
        catch(err){
            setGroups(prevGroups);
            setError(err.message);
        }
    }

    const delfromGroup = async (linkId, channelId, groupId) => {
        const prevGroups = [...groups];
        try{
            setGroups((prev) =>
                prev.map(g =>
                    g.id === groupId
                        ? { ...g, links: g.links.filter(link => link.channelId !== channelId) }
                        : g
                )
            );
            await removefromGroup(linkId, groupId);
        }
        catch(err){
            setGroups(prevGroups);
            setError(err.message);
        }
    }

    useEffect(() => {
        getAllgrp();
    }, [])

    return { groups, groupsloading, createGroup, delGroup, addToGroup, delfromGroup, refetch: getAllgrp};

}