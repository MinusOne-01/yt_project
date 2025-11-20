import React, { useState } from 'react'
import FilterDropdown from './FilterDropdown'
import TimeFilterDropdown from './TimeFilterDropdown'
import UserMenu from './UserMenu'

const FeedFilterForm = ({groups, extendFeed, updateFilterList}) => {
   
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div>
        <div className='fixed bottom-0 w-full p-6 md:p-10 
                      bg-gray-900/95 backdrop-blur-sm
                      border-t border-white/10
                      shadow-[0_-4px_24px_0_rgba(0,0,0,0.5)]'>       
          <div className='flex items-center justify-center gap-2 md:gap-4'>

            <FilterDropdown
            groups={groups}
            updateFilterList={updateFilterList}
            parentIsOpen={activeDropdown === "groups"}
            onToggle={() => setActiveDropdown(activeDropdown === "groups" ? null : "groups")}
            />

            <TimeFilterDropdown
            extendFeed={extendFeed}
            parentIsOpen={activeDropdown === "time"}
            onToggle={() => setActiveDropdown(activeDropdown === "time" ? null : "time")}
            />

            <UserMenu
            parentIsOpen={activeDropdown === "user"}
            onToggle={() => setActiveDropdown(activeDropdown === "user" ? null : "user")}
            />

          </div>
        </div> 
    </div>
  )
}

export default FeedFilterForm