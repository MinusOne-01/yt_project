'use client';
import React, { useState, useEffect } from 'react';

import useGroups from '@/hooks/useGroups';
import useFeed from '@/hooks/useFeed';

import GroupSelectForm from '@/components/GroupSelectForm';
import FeedView from '@/components/FeedView';
import FeedFilterForm from '@/components/FeedFilterForm';
import VideoPlayer from '@/components/VideoPlayer';
import LoadingScreen from '@/components/LoadingScreen';
import FadeWrapper from '@/components/FadeWrapper';

export default function Feed() {

  const { videos, extendFeed, filterFeed, removeFilters, filterList, addToFilterList, removefromFilterList, loading, error } = useFeed();
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
  <div className="relative min-h-screen bg-gradient-to-r from-[#FF8235] to-[#30E8BF] pb-40">
    <div>
      {groupSelectorView ? (
        <GroupSelectForm
          groups={groups}
          addToFilterList={addToFilterList}
          removefromFilterList={removefromFilterList}
          filterFeed={filterFeed}
          setGroupSelectorView={setGroupSelectorView}
        />
      ) : (
        <>
          {/* Loading screen */}
          <FadeWrapper show={loading}>
            <LoadingScreen />
          </FadeWrapper>

          {/* Feed view */}
          <FadeWrapper show={!loading}>
            <div>
              <FeedView videos={videos} VideoPlayer={VideoPlayer} />
              <FeedFilterForm
                groups={groups}
                extendFeed={extendFeed}
                filterList={filterList}
                addToFilterList={addToFilterList}
                removefromFilterList={removefromFilterList}
                filterFeed={filterFeed}
                removeFilters={removeFilters}
              />
            </div>
          </FadeWrapper>
        </>
      )}
    </div>
  </div>
);

}

