'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter} from "next/navigation";
import Image from "next/image";

import useChannels from '@/hooks/useChannels';
import useGroups from '@/hooks/useGroups';

import ToggleView from '@/components/ToggleView';
import ChannelList from '@/components/ChannelList';
import ChannelForm from '@/components/ChannelForm';
import GroupList from '@/components/GroupList';
import GroupChannelList from '@/components/GroupChannelList';
import GroupForm from '@/components/GroupForm';
import GroupEditForm from '@/components/GroupEditForm';

const page = () => {
    
    const { channels, loading, error, addChannel, delChannel } = useChannels();
    const { groups, createGroup, delGroup, addToGroup, delfromGroup } = useGroups();

    const [link, setLink] = useState('');
    const [groupName, setGroupName] = useState('');
    const [groupFolderId, setGroupFolderId] = useState('');
    
    const [groupView, setGroupView] = useState(false);
    const [groupChannelView, setGroupChannelView] = useState(false);
    const [groupEditView, setGroupEditView] = useState(false);

    const router = useRouter();

  return (
  <>
    <div className='h-screen flex flex-col overflow-hidden'>
      
      {/* Fixed toggle at top */}
      <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm">
        <ToggleView groupView={groupView} setGroupView={setGroupView}/>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide relative">
        
        {/* Channels section */}      
        <div className={`absolute inset-0 overflow-y-auto scrollbar-hide pt-25 transition-opacity duration-700 ease-in-out pb-100
                   ${ !groupView ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
        }`}>
            <div className={`transition-all duration-500 ${loading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
            <ChannelList channels={channels} delChannel={delChannel} Image={Image}/>
            </div>
            <ChannelForm link={link} setLink={setLink} addChannel={addChannel} router={router}/>
        </div>

        {/* Groups section */}
          <div className={`absolute inset-0 overflow-y-auto scrollbar-hide pt-25 transition-opacity duration-700 ease-in-out pb-100
                      ${ (groupView && !groupChannelView && !groupEditView) ? "opacity-100 z-10" : "opacity-0 pointer-events-none z-0"
          }`}>
            <GroupList groups={groups} delGroup={delGroup} setGroupChannelView={setGroupChannelView} setGroupFolderId={setGroupFolderId} />
            <GroupForm groupName={groupName} setGroupName={setGroupName} createGroup={createGroup} router={router} />
          </div>      
      
        {/* Display Channels inside Group folders */}
          <div className={`absolute inset-0 overflow-y-auto scrollbar-hide pt-25 transition-opacity duration-700 ease-in-out pb-100
                     ${ (groupView && groupChannelView && !groupEditView) ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            <GroupChannelList groups={groups} groupFolderId={groupFolderId} channels={channels} setGroupChannelView={setGroupChannelView} setGroupEditView={setGroupEditView} Image={Image} />
          </div>
              
        {/* Display group folder edit form */}
          <div className={`absolute inset-0 overflow-y-auto scrollbar-hide pt-25 transition-opacity duration-700 ease-in-out pb-100
                      ${ (groupView && groupChannelView && groupEditView) ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}>
            <GroupEditForm groups={groups} groupFolderId={groupFolderId} channels={channels} addToGroup={addToGroup} delfromGroup={delfromGroup} setGroupEditView={setGroupEditView} Image={Image}/>
          </div>
            
      </div>
    </div>
  </>
)
}

export default page
