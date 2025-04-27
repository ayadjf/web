import React from 'react'
import { BiSearch } from 'react-icons/bi'



const ContentHeader = () => {
  return (
    <div className="content--header">
      
        <div className="header--activity">
      <div className="search-box">
        <input type="text" placeholder='Search'/>
        <BiSearch className='icon'/>

      </div>
      
    </div>
    </div>
  )
}

export default ContentHeader
