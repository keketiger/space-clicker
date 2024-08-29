import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [isShrinking, setIsShrinking] = useState(false)
  const [clicksPerSecond, setClicksPerSecond] = useState(0)
  const clickCountRef = useRef(0)
  const lastCLickTimeRef = useRef(Date.now())

  useEffect(() => {
    const calculateClicksPerSecond = () => {
      const now = Date.now()
      const timeElapsed = (now - lastCLickTimeRef.current) / 1000

      if (timeElapsed > 0) {
        setClicksPerSecond(clickCountRef.current / timeElapsed)
      }

      lastCLickTimeRef.current = now
      clickCountRef.current = 0
    }

    const interval = setInterval(calculateClicksPerSecond, 1000)

    return () => clearInterval(interval);
  }, [])

  const handleLogoClick = () => {
    const now = Date.now()
    clickCountRef.current += 1
    setCount((count) => count + 1)
    setIsShrinking(true)

    setTimeout(() => {
      setIsShrinking(false)
    }, 150)
  }

  return (
    <>
      <div className='container'>
        <div className='space-container'>
          <div className='space-clicker-render'>
            <img
              src={reactLogo}
              className={`logo react ${isShrinking ? 'shrink' : ''}`}
              alt="React logo"
              onMouseDown={handleLogoClick}
            />
            <h1>{count}</h1>
            <h4>{clicksPerSecond.toFixed(2)} Clics par seconde</h4>
          </div>
        </div>
        <div className='upgrade-container'>
          <h1>Amélioration</h1>
        </div>
      </div>
    </>
  )
}

export default App
