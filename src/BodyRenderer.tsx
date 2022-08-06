import { ReactNode, useRef, useEffect, useState } from 'react'
import ReactDom from 'react-dom'

export const BodyRenderer = (props: { children: ReactNode }) => {
  const [ready, setReady] = useState(false)
  const containerRef = useRef<HTMLElement>()

  useEffect(() => {
    containerRef.current = document.createElement('div')
    document.body.appendChild(containerRef.current)
    setReady(true)
    return () => {
      containerRef.current?.remove()
    }
  }, [])

  if (ready && containerRef.current) {
    return ReactDom.createPortal(props.children, containerRef.current)
  }

  return null
}
