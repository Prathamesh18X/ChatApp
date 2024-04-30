import React from 'react'
import GroupStripe from './GroupStripe';
import useGetGroups from '../../hooks/useGetGroups.js';
const GroupList = () => {
  const { loading, groups } = useGetGroups();
  return (
    <div className="py-2 flex flex-col w-full overflow-auto">
      {groups.length > 1 &&!loading ? groups.map((group, /*idx*/) => (
        
        <GroupStripe
          key={group._id}
          group={group}
          // lastIdx={idx === group.length - 1}
        />
        
      )) : (
        <div className='flex items-center justify-center'>
          <div className='text-center '>Not Participant in any Group</div>
        </div>
          )}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}
    </div>
  )
}

export default GroupList