import { ReactNode, useRef, useEffect, useState } from 'react'
import ReactDom from 'react-dom'

export const BodyRenderer = (props: {
  children: ReactNode
  portalId?: string
}) => {
  const { children, portalId } = props
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLElement>()

  useEffect(() => {
    if (portalId) {
      const portal = document.getElementById(portalId)
      if (portal) {
        containerRef.current = portal
        setReady(true)
      }
    } else {
      containerRef.current = document.createElement('div')
      document.body.appendChild(containerRef.current)
      setReady(true)
    }
    return () => {
      if (!portalId) {
        containerRef.current?.remove()
      }
    }
  }, [portalId])

  if (ready && containerRef.current) {
    return ReactDom.createPortal(children, containerRef.current)
  }

  return null
}
