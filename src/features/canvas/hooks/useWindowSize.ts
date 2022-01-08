import { useState, useEffect } from 'react'

const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
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
