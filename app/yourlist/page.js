'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter} from "next/navigation";
import Image from "next/image";

import useChannels from '@/hooks/useChannels';
import useGroups from '@/hooks/useGroups';

import ChannelList from '@/components/ChannelList';
import ChannelForm from '@/components/ChannelForm';
import GroupList from '@/components/GroupList';
import GroupChannelList from '@/components/GroupChannelList';
import GroupForm from '@/components/GroupForm';
import ToggleView from '@/components/ToggleView';


const page = () => {
    
    const { channels, error, addChannel, delChannel } = useChannels();
    const { groups, createGroup, delGroup } = useGroups();

    const [link, setLink] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupFolderMeta, setGroupFolderMeta] = useState([]);
    const [groupView, setGroupView] = useState("off");
    const [groupChannelView, setGroupChannelView] = useState("off");
    const router = useRouter();

  return (
    <>
    <div className='min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40'>

       {/*button for channels and groups view*/}
       <ToggleView groupView={groupView} setGroupView={setGroupView}/>
       
       <div className='relative min-h-screen'>
         {/*Display channels/groups form and a responsive grid*/}      
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${groupView === "off" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <ChannelList channels={channels} delChannel={delChannel} Image={Image}/>
          <ChannelForm link={link} setLink={setLink} addChannel={addChannel} />
        </div>
        
        <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${groupView === "on" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          {/*Display Group folders*/}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${groupChannelView === "off" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>  
          <GroupList groups={groups} delGroup={delGroup} setGroupChannelView={setGroupChannelView} setGroupFolderMeta={setGroupFolderMeta}/>  
          <GroupForm groupName={groupName} setGroupName={setGroupName} createGroup={createGroup} />
          </div>

          {/*Display Channels inside Group folders*/}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${groupChannelView === "on" ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
          <GroupChannelList groupFolderMeta={groupFolderMeta} channels={channels} />
          </div>

        </div>
        </div>

    </div>
    </>
  )
}

export default page
