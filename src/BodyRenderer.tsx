import { ReactNode, useRef } from 'react'
import { portalElementId } from './TooltipsPortal'
import ReactDom from 'react-dom'

export const BodyRenderer = (props: { children: ReactNode }) => {
  const portalElement = useRef(document.getElementById(portalElementId))
  const { children } = props

  if (portalElement.current) {
    return ReactDom.createPortal(children, portalElement.current)
  } else {
    return null
  }
}
