import { useState, useEffect } from 'react'

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize())
  useEffect(() => {
    const onResize = () => {
      setWindowSize(getWindowSize())
    }
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return windowSize
}
