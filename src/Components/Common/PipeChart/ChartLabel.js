import { XFilled } from '@ant-design/icons'
import React from 'react'

const ChartLabel = () => {
  return (
    <div className='labelChart' style={{width: "100%", display: "flex", paddingLeft: "30px", marginBottom: "40px"}}>
        <div className='assignment'>
            <p className='caption1' style={{marginBottom: "5px"}}><span style={{fontSize: "10px", color: "#F4BE37", marginRight: "15px"}}><XFilled /> </span> Assignment/Lab</p>
            <p className='caption1' style={{marginBottom: "5px"}}><span style={{fontSize: "10px", color: "#FF9F40", marginRight: "15px"}}><XFilled /> </span> Concept/Lecture</p>
            <p className='caption1' style={{marginBottom: "5px"}}><span style={{fontSize: "10px", color: "#0D2535", marginRight: "15px"}}><XFilled /> </span> Guide/Review</p>
            <p className='caption1' style={{marginBottom: "5px"}}><span style={{fontSize: "10px", color: "#5388D8", marginRight: "15px"}}><XFilled /> </span> Test/Quiz</p>
            <p className='caption1' style={{marginBottom: "5px"}}><span style={{fontSize: "10px", color: "#206EE5", marginRight: "15px"}}><XFilled /> </span> Exam</p>
        </div>
    </div>
  )
}

export default ChartLabel