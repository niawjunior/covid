import React from 'react'
import styled from 'styled-components';

const StyledText = styled.div`
  font-size: 50px;
`
const Confirmed = (props) => {
  return (
    <div>
      <div className="font-bold text-lg mb-2 text-center text-white mt-4">
        ผู้ป่วยสะสม
      </div>
      <StyledText className="font-bold text-center text-green-400 mt-3">
        { props.confirmed.sum.toLocaleString() }
      </StyledText>
      <div className="font-bold text-center text-white mt-3 text-sm">
        คน
      </div>
   </div>
  )
}

export default Confirmed