import styled from "@emotion/styled"
import { css } from "@emotion/react"

const sharedTraits = css`
  margin-left: 1em;
  li {
    margin: 3px 0;
    line-height: 1.4em;
  }
`

export const CustomOL = styled.ol`
  ${sharedTraits}
`

export const CustomUL = styled.ul`
  ${sharedTraits}
`