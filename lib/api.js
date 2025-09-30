'use client'

//API calls for User Channels

export async function fetchChannel() {

    const res = await fetch('/api/channeldb', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error("Failed to fetch channels");
    return res.json();

}

export async function createChannel(link){

    const res = await fetch('/api/channeldb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
    });
    if (!res.ok) throw new Error("Failed to create channels");
    return res.json();

}

export async function removeChannel(id){

    const res = await fetch('/api/channeldb', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to remove channels");
    return res.json();

}

//API calls for User Groups

export async function addGroup(name){

    const res = await fetch('/api/groupdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gname: name }),
    });
    if (!res.ok) throw new Error("Failed to add groupdb");
    return res.json();
}

export async function fetchGroups() {

    const res = await fetch('/api/groupdb', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error("Failed to fetch groups");
    return res.json();
}

export async function removeGroup(id) {

    const res = await fetch('/api/groupdb', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error("Failed to remove groupdb");
    return res.json();
}

export async function insertinGroup(linkId, groupId) {

    const res = await fetch('/api/groupFolderdb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, groupId }),
    });
    if (!res.ok) throw new Error("Failed to insert in groupFolderdb");
    return res.json();
}

export async function removefromGroup(linkId, groupId) {

    const res = await fetch('/api/groupFolderdb', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkId, groupId }),
    });
    if (!res.ok) throw new Error("Failed to remove from groupFolderdb");
    return res.json();
}

// API call for feed

export async function fetchVideos(days) {

        const res = await fetch(`/api/feedBuilder?days=${days}`);
        if (!res.ok) throw new Error('Failed to fetch videos');
        return res.json();
}

