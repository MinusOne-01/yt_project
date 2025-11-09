import React from 'react'
import FilterDropdown from './FilterDropdown'
import TimeFilterDropdown from './TimeFilterDropdown'

const FeedFilterForm = ({groups, extendFeed, updateFilterList}) => {
  
  return (
    <div>
        <div className='fixed bottom-0 w-full p-10 
                      bg-gray-900/95 backdrop-blur-sm
                      border-t border-white/10
                      shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]'>       
          <div className='flex items-center justify-center gap-4'>
            <FilterDropdown groups={groups} updateFilterList={updateFilterList}/>
            <TimeFilterDropdown extendFeed={extendFeed} />
          </div>
        </div> 
    </div>
  )
}

export default FeedFilterForm