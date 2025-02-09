import { motion, MotionValue, useTransform } from "motion/react"
import { ReactNode } from "react"

interface SlidingText {
    children: ReactNode,
    direction: "left" | "right",
    left: string,
    progress: MotionValue<number>
}

function SlidingText({ children, direction, left, progress }: SlidingText) {
    const slideDirection = direction == "left" ? -1 : 1
    const translateX = useTransform(progress, [0, 1], [300 * slideDirection, -300 * slideDirection])
    return (
        <motion.div style={{x: translateX, left: left}} className="relative flex whitespace-nowrap">
            { children }
        </motion.div>
    )
}

export default SlidingText