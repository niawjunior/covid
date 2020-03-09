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
  const { confirmed, recovered, deaths } = data
  const sum = confirmed.sum + recovered.sum + deaths.sum || 0
  const percentage = (type * 100) / sum || 0
  return (
    <StyledHover className="bg-gray-700 rounded-full flex items-center justify-center">
      {percentage.toFixed(2)} %
    </StyledHover>
  )
}

export default Percentage
