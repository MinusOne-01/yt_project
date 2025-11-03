'use client';
import React, { useState, useEffect } from 'react';

import useGroups from '@/hooks/useGroups';
import useFeed from '@/hooks/useFeed';

import GroupSelectForm from '@/components/GroupSelectForm';
import FeedView from '@/components/FeedView';
import FeedFilterForm from '@/components/FeedFilterForm';
import VideoCard from '@/components/VideoCard';
import LoadingScreen from '@/components/LoadingScreen';
import FadeWrapper from '@/components/FadeWrapper';

export default function Feed() {

  const { videos, extendFeed, removeFilters, filterList, addToFilterList, removefromFilterList, loading, error } = useFeed();
  const { groups, groupsloading } = useGroups();
  const [groupSelectorView, setGroupSelectorView] = useState(true);

  console.log("filterlist->",filterList);
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
    <div>
      {groupSelectorView ? (
        <GroupSelectForm
          groups={groups}
          filterList={filterList}
          addToFilterList={addToFilterList}
          removefromFilterList={removefromFilterList}
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
              <FeedView videos={videos} VideoCard={VideoCard} />
              <FeedFilterForm
                groups={groups}
                extendFeed={extendFeed}
                filterList={filterList}
                addToFilterList={addToFilterList}
                removefromFilterList={removefromFilterList}
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

