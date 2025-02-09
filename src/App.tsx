import { AlignJustify } from "lucide-react"
import SlidingText from "./components/SlidingText"
import { useScroll } from "motion/react"
import { useEffect, useRef } from "react"
import Lenis from "lenis"

function App() {
	
	const slidingContainer = useRef(null)
	const { scrollYProgress } = useScroll({
		target: slidingContainer,
		offset: ["start end", "end start"]
	})

	useEffect(() => {
		const lenis = new Lenis()

		function raf(time: number) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	}, [])

	return (
    	<>
			<header className="py-10 px-8 w-full flex flex-row justify-end fixed">
				<AlignJustify size={28} className="mr-8 cursor-pointer" />
			</header>
			<section id="hero" className="h-[100vh] bg-light overflow-hidden">
				<header className="px-8 py-4 flex items-center justify-between w-full">
					<img src="images/apex-racing.svg" alt="Apex Racing Logo" className="h-20" />
				</header>
				<main className="flex flex-col items-center justify-center h-full pb-32">
					<div ref={slidingContainer}>
						<SlidingText direction="right" left="25%" progress={scrollYProgress}>
							<h1 className="text-[16rem] text-dark font-bold font-new-science uppercase leading-55"><span className="text-apex-red">APEX</span> RACING</h1>
						</SlidingText>
						<SlidingText direction="left" left="-5%" progress={scrollYProgress}>
							<h1 className="text-[16rem] text-dark font-bold font-new-science uppercase leading-55">DRIVING INNOVATION</h1>
						</SlidingText>
					</div>
					<h3 className="text-xl text-dark font-bold font-new-science uppercase mt-16">TRY MOVING YOUR CURSOR...</h3>
				</main>
			</section>
			<div className="h-[100vh]"></div>
    	</>
  	)
}

export default App
