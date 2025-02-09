import { motion, useMotionValue } from "motion/react"
import { useEffect, useState } from "react"

interface CursorProps {
    color: string
    size: number
    lag: number
}

function Cursor({ color="#EE3150", size=20, lag=0.15 }: CursorProps) {
    const [isVisible, setIsVisible] = useState(true)

    const mouseX = useMotionValue(window.innerWidth / 2)
    const mouseY = useMotionValue(window.innerHeight / 2)
    const cursorX = useMotionValue(window.innerWidth / 2)
    const cursorY = useMotionValue(window.innerHeight / 2)

    useEffect(() => {
        let animationFrame: number
    
        const handleMouseMove = (e: MouseEvent) => {
          mouseX.set(e.clientX)
          mouseY.set(e.clientY)
        };
    
        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)
    
        const updateCursor = () => {
          const dx = mouseX.get() - cursorX.get()
          const dy = mouseY.get() - cursorY.get()
    
          cursorX.set(cursorX.get() + dx * lag)
          cursorY.set(cursorY.get() + dy * lag)
    
          animationFrame = requestAnimationFrame(updateCursor)
        }
    
        // Hide the default cursor
        document.body.style.cursor = 'none'
    
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseenter', handleMouseEnter)
        window.addEventListener('mouseleave', handleMouseLeave)
    
        updateCursor() // Start animation loop
    
        return () => {
          cancelAnimationFrame(animationFrame)
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseenter', handleMouseEnter)
          window.removeEventListener('mouseleave', handleMouseLeave)
          document.body.style.cursor = 'auto'
        };
      }, [lag, mouseX, mouseY, cursorX, cursorY])
    

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: size,
                height: size,
                borderRadius: '50%',
                backgroundColor: color,
                pointerEvents: 'none',
                translateX: cursorX,
                translateY: cursorY,
                opacity: isVisible ? 1 : 0,
                z: 1000
            }}
        />
    )
}

export default Cursor