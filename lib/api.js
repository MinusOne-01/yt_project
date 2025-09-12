'use client'

//API calls for User Channels

export async function fetchChannel() {

    const res = await fetch('/api/database', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error("Failed to fetch channels");
    return res.json();

}

export async function createchannel(link){

    const res = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
    });
    if (!res.ok) throw new Error("Failed to create channels");
    return res.json();

}

export async function removechannel(id){

    const res = await fetch('/api/database', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to remove channels");
    return res.json();

}

//API calls for User Groups

export async function addGroup(name){

    const res = await fetch('/api/group', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gname: name }),
    });
    if (!res.ok) throw new Error("Failed to add group");
    return res.json();
}



export async function fetchGroups() {

    const res = await fetch('/api/group', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
}