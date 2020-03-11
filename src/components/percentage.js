import React from "react"
import styled from "styled-components"

const StyledHover = styled.div`
  height: 4.2rem;
  width: 4.2rem;
  &:hover {
    transform: scale(1.2);
  }
`

const Percentage = ({ data, type }) => {
  const percentage = (data / type) * 100
  return (
    <StyledHover className="bg-gray-700 text-xs rounded-full border-2 border-blue-500 flex items-center justify-center">
      {percentage.toFixed(2)} %
    </StyledHover>
  )
}

export default Percentage
