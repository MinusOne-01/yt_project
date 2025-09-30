import React from 'react'
import FilterDropdown from './FilterDropdown'
import TimeFilterDropdown from './TimeFilterDropdown'

const FeedFilterForm = ({groups, extendFeed, filterList ,addToFilterList, removefromFilterList, filterFeed, removeFilters}) => {
  
  return (
    <div>
        <div className='fixed flex items-center justify-center gap-3 bottom-0 w-full p-4 
    bg-gradient-to-r from-gray-900 to-gray-800 
    md:mb-50 md:bg-transparent'>       
          <div className='w-half'>
            <FilterDropdown groups={groups} filterList={filterList} addToFilterList={addToFilterList} removefromFilterList={removefromFilterList} filterFeed={filterFeed} removeFilters={removeFilters}/>
          </div>
          <div className='font-semibold text-white w-half'>
            <TimeFilterDropdown extendFeed={extendFeed} />
          </div>
        </div> 
    </div>
  )
}

export default FeedFilterForm