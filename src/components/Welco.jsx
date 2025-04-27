import React from 'react'
import chp from '../assets/chp.png'
const Welco = () => {
  return (
    <div className='Card'>
      <h2 className="TeacherName">Hello Sehad!</h2>
      <div className="description">
        Kuizu makes it easy for educatoros to create,manage and share quizzes effortlessly.Designed for offline use,our platform ensure seamless access in classroms without internet dependency.Start building engaging assesments today!
       <img src={chp} alt="" className="chp" />
      </div>
    </div>
  )
}

export default Welco
