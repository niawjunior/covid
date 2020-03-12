import styled from "styled-components"
import tw from "tailwind.macro"

const CardSummary = styled.div`
  ${tw`bg-gray-800 rounded overflow-hidden shadow-lg h-56`}
`

const CardHeader = styled.div`
  ${tw`font-bold text-lg mb-2 text-center text-white mt-4`}
`

const BadgeTopRight = styled.span`
  ${tw`float-right text-base text-white  bg-red-500 px-2`}
`

const CardSummaryNumber = styled.div`
  ${tw`font-bold text-center`}
  ${props => (props.isBig ? tw`text-6xl` : tw`text-xl mt-5`)};
`

const PercentageTextWrap = styled.div`
  ${tw`font-bold text-center flex justify-center text-white mt-5 text-sm`}
`

export const Styled = {
  CardSummary,
  BadgeTopRight,
  CardHeader,
  CardSummaryNumber,
  PercentageTextWrap,
}
