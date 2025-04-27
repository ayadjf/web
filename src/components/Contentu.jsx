import React from 'react'
import ContentHeader from './ContentHeader'
import './Contentu.css'
import Welco from './Welco'

import { MdAddCircleOutline } from 'react-icons/md'
import tech from '../assets/tech.png';
const Content = () => {
  return (
    <div className="content">
      <ContentHeader/>
      <Welco/>
      <div className="add">
      <h2>Your modules:</h2>
      <div className="addm">
               Add Your module 
       <MdAddCircleOutline onClick={()=>alert("Module added!")} className='iconp'/>
      </div>
      
      </div>
      <img src={tech} alt="" className="tech" />
    </div>
  )
}

export default Content
