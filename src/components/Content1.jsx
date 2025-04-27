import React from 'react'
import ContentHeader1 from './ContentHeader1'
import './Content.css'
import Welco1 from './Welco1'
const data=[
  {
    title:'System',
  },
  {
    title:'archi',
  },
  {
    title:'analyse1'
  }

]



const Content1 = () => {
  return (
    <div className="content">
      <ContentHeader1/>
      <Welco1/>
      <div className="add">
      <h2>Your modules:</h2>
      <div className='h-auto bg-slate-600'>
        <div className='h-[400px] w-3/4 m-auto border'>
        data.map((item,index)=>{
          return(
            <div key={index}></div>
          )
        })
        
        </div>
      </div>
      
      </div>
     
    </div>
  )
}

export default Content1
