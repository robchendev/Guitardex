import styled from "@emotion/styled"
import { v, maxq } from '../globalstyles/variables'
import { COLORS } from '../globalstyles/theme'

export const TrashContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 ${v.borderRadius} ${v.borderRadius} 0;
  height: 100%;
  width: 4.5em;
  ${maxq[1]} {
    width: 3.5em;
  }
`
export const Trash = styled.span`
  font-family: 'Fredoka';
  font-size: 22px;
  letter-spacing: .6px;
  height: 100%;
  width: 100%;
  border: none;
  background: var(--color-bg, ${COLORS.bg.light});
  border-radius: ${v.borderRadius};
  margin-bottom: ${v.mdSpacing};
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
`
export const TrashIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: var(--color-checkMarkColor, ${COLORS.checkMarkColor.light});
  font-size: 30px;
  :hover {
    color: var(--color-link, ${COLORS.link.light});
  }
`
export const DexList = styled.ul`
  padding-bottom: 1em;
  list-style-type: none;
  li {
    display: flex;
    align-items: center;
    margin: 0 0 5px 0;
  }
  transition: 0.3s ease padding;
`
export const EmptyList = styled.div`
  div {
    margin: 0 0 5px 0;
  }
`
export const EmptyListEntries = styled.div`
  background-color: var(--color-bg, ${COLORS.bg.light}) !important;
  transition: 0.3s ease margin;
  border-radius: ${v.borderRadius};
  user-select: none;
  position: relative;
  h4 {
    margin-bottom: 0;
  }
  cursor: pointer;
`
export const InputCounterContainer = styled.div`
  position: relative;
`
export const InputCounter = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  visibility: hidden;
  color: var(--color-placeholder, ${COLORS.placeholder.light});
`
export const MobileReminder = styled.span`
  visibility: hidden;
`
export const SaveNameInput = styled.div`
  input {
    border: none;
    margin-bottom: 2px;
    text-align: center;
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 1.8em;
    ${maxq[1]} {
      font-size: 1.4em;
      letter-spacing: 0;
    }
    font-weight: 500;
    width: 100%;
    outline: none;
    color: inherit;
    background: transparent;
    ::placeholder, :-ms-input-placeholder, ::-ms-input-placeholder {
      color: ${COLORS.text.placeholder};
      opacity: 1;
    }
    :focus, :placeholder-shown {
      background-color: var(--color-bg, ${COLORS.bg.light});
    }
    :placeholder-shown {
      border-radius: ${v.borderRadius};
    }
    :focus {
      & ~ ${InputCounterContainer} ${InputCounter} {
        visibility: visible;
      }
      & ~ ${InputCounterContainer} ${InputCounter} ${MobileReminder} {
        ${maxq[1]} {
          visibility: visible;
        }
      }
      margin-bottom: 0px;
      border-bottom: 2px solid var(--color-bg3, ${COLORS.bg3.light});
      border-radius: ${v.borderRadius} ${v.borderRadius} 0 0;
    }
  }
  margin-bottom: calc(1.8em - 2px);
`
export const InputBox = styled.input`

`
export const ExportSave = styled.div`
  background: var(--color-bg, ${COLORS.bg.light});
  border-radius: ${v.borderRadius};
  input {
    resize: none;
    white-space: nowrap;
    width:100%;
    padding: 0 ${v.smSpacing};
    font-family: inherit;
    letter-spacing: inherit;
    font-size: 16px;
    width: 100%;
    outline: none;
    border: none;
    background: transparent;
    color: var(--color-placeholder, ${COLORS.placeholder.light});
    ::-webkit-scrollbar {
      display: none;
    }
    padding: calc(${v.smSpacing} * 1.3);
  }
  button {
    width:30%;
    padding: calc(${v.smSpacing} * 1.3);
    color: #fff;
    background-color: var(--color-primary, ${COLORS.primary.light});
    border: none;
    border-radius: 0 ${v.borderRadius} ${v.borderRadius} 0;
    cursor: pointer;
    transition: 0.3s ease;
    :hover {
      background: #6D28D9;
    }
    position: relative;
    :before {
      content: "";
      position: absolute;
      left: -2em;
      top: 0;
      width: 2em;
      height: 100%;
      background: linear-gradient(to left, var(--color-bg, ${COLORS.bg.light}), transparent); 
    }
  }
  ${maxq[1]} {
    button {
      width: 50%;
    } 
  }
  display: flex;
  align-items:center;
  margin-bottom: ${v.mdSpacing};
`
export const DeleteAllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const DeleteAll = styled.button`
  width:20%; 
  padding: calc(${v.smSpacing} * 1.3);
  color: #fff;
  background-color: var(--color-primary, ${COLORS.primary.light});
  border: none;
  border-radius: ${v.borderRadius};
  ${maxq[1]} {
    width:32%;
  }
  cursor: pointer;
  transition: 0.3s ease;
  :hover {
    background: #6D28D9;
  }
`
export const HelpLinkDiv = styled.div`
  padding: calc(${v.smSpacing} * 1.5) ${v.mdSpacing};
`
export const SavedDexItem = styled.div`

  transition: 0.3s ease;
  transition-property: margin;
  border-radius: ${v.borderRadius};
  user-select: none;
  position: relative;
  width: 100%;
  h4 {
    margin-bottom: 0;
  }
`
export const DragIconContainer = styled.div`
  position: absolute;
  transition: 0.3s ease opacity;
  margin-top: 0.3em;
  color: var(--color-placeholder, ${COLORS.placeholder.light});
  font-size: 1.7em;
  margin-left: -0.25em;
  pointer-events: none;
`
export const MoveableContainer = styled.div`
  display: flex;
  width: 100%;
`
export const EmptyListEntryContainer = styled.div`
  color: var(--color-text, ${COLORS.text.light});
  :hover {
    ${EmptyListEntries} {
      margin-left: 1em;
      color: var(--color-link, ${COLORS.link.light}) !important;
      ${maxq[1]} {
        margin-left: 0;
      }
    }
  }
`