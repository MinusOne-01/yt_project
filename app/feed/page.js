'use client';
import React, { useState, useEffect } from 'react';

import useGroups from '@/hooks/useGroups';
import useFeed from '@/hooks/useFeed';

import GroupSelectForm from '@/components/GroupSelectForm';
import FeedView from '@/components/FeedView';
import FeedFilterForm from '@/components/FeedFilterForm';
import VideoPlayer from '@/components/VideoPlayer';

export default function Feed() {

  const { videos, filterFeed, removeFilters, filterList, addToFilterList, removefromFilterList, loading, error } = useFeed();
  const { groups, groupsloading } = useGroups();
  const [groupSelectorView, setGroupSelectorView] = useState(true);
  console.log("filterlist->",filterList);
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF8235] to-[#30E8BF]">
        <p className="text-white font-medium text-lg">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40">

      <div>
      {loading || groupSelectorView ? (
        <div>
          
          <GroupSelectForm  groups={groups} addToFilterList={addToFilterList} removefromFilterList={removefromFilterList} filterFeed={filterFeed} setGroupSelectorView={setGroupSelectorView}/>

        </div>
      ) : (
        <div className={`transition-opacity duration-700 ease-in-out opacity-100"}`}>
  
        <FeedView videos={videos} VideoPlayer={VideoPlayer}/>
        <FeedFilterForm  groups={groups} filterList={filterList} addToFilterList={addToFilterList} removefromFilterList={removefromFilterList} filterFeed={filterFeed} removeFilters={removeFilters}/>

        </div>
      )}
      </div>

    </div>
  );
}

