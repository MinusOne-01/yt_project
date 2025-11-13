'use client';
import React, { useState, useEffect } from 'react';

import useGroups from '@/hooks/useGroups';
import useFeed from '@/hooks/useFeed';

import GroupSelectForm from '@/components/GroupSelectForm';
import FeedView from '@/components/FeedView';
import FeedFilterForm from '@/components/FeedFilterForm';
import LoadingScreen from '@/components/LoadingScreen';
import FadeWrapper from '@/components/FadeWrapper';

export default function Feed() {

  const { videos, extendFeed, updateFilterList, loading, error } = useFeed();
  const { groups, groupsloading } = useGroups();
  const [groupSelectorView, setGroupSelectorView] = useState(true);

  if (error) {
    return (
      <div>
        <p className="text-white font-medium text-lg">
          Error: {error}
        </p>
      </div>
    );
  }

  return (
  <div>
    <div className='h-screen flex flex-col overflow-y-auto scrollbar-hide'>
      {groupSelectorView ? (
        <GroupSelectForm groups={groups} updateFilterList={updateFilterList} setGroupSelectorView={setGroupSelectorView} groupsloading={groupsloading}/>
      ) : (
        <>
          {/* Loading screen */}
          <FadeWrapper show={loading}>
            <LoadingScreen />
          </FadeWrapper>

          {/* Feed view */}
          <FadeWrapper show={!loading}>
            <div>
              <FeedView videos={videos} />
              <FeedFilterForm groups={groups} extendFeed={extendFeed} updateFilterList={updateFilterList}
              />
            </div>
          </FadeWrapper>
        </>
      )}
    </div>
  </div>
);

}

