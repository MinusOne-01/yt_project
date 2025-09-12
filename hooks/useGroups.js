import { useState, useEffect } from "react";
import { addGroup, fetchGroups } from "@/lib/api";

export default function useGroups(){

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllgrp = async () => {
        try {
            setLoading(true);
            const data = await fetchGroups();
            setGroups(data);
            setError(null);
            setLoading(false);
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

    return { getAllgrp, createGroup };

}