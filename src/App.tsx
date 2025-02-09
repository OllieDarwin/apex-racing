import { AlignJustify } from "lucide-react"
import SlidingText from "./components/SlidingText"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useCallback, useRef, useState } from "react"
import Cursor from "./components/Cursor"
function App() {
	const slidingContainer = useRef(null)
	const { scrollYProgress } = useScroll()

	// BACKGROUND COLOUR ANIMATE ON SCROLL
	const [style, setStyle] = useState({
		backgroundColor: "light",
		color: "dark",
	})

	const handleScroll = useCallback((latest: number) => {
		requestAnimationFrame(() => {
			const startPoint = 0.5
			const endPoint = 0.6
			const progress = Math.max(
				0,
				Math.min((latest - startPoint) / (endPoint - startPoint), 1)
			)

			const interpolateColor = (start: number[], end: number[]): string =>
				start
					.map((channel, i) =>
						Math.round(channel + (end[i] - channel) * progress)
					)
					.join(", ")

			setStyle({
				backgroundColor: `rgb(${interpolateColor(
					[243, 243, 243],
					[24, 24, 24]
				)})`,
				color: `rgb(${interpolateColor([243, 243, 243], [24, 24, 24])
					.split(", ")
					.map((channel) => 255 - parseInt(channel))
					.join(", ")})`,
			})
		})
	}, [])

	useMotionValueEvent(scrollYProgress, "change", handleScroll)

	return (
		<motion.div
			style={{
				backgroundColor: style.backgroundColor,
			}}
			className="bg-light cursor-none"
		>
			<Cursor color="#EE3150" size={20} lag={0.1} />
			<header className="py-10 px-8 w-full flex flex-row justify-end fixed">
				<AlignJustify
					size={28}
					color={style.color}
					className="mr-8 cursor-pointer"
				/>
			</header>
			<section id="hero" className="h-[100vh] overflow-hidden">
				<header className="px-8 py-4 flex items-center justify-between w-full">
					<img
						src="images/apex-racing.svg"
						alt="Apex Racing Logo"
						className="h-20"
					/>
				</header>
				<main className="flex flex-col items-center justify-center h-full pb-32">
					<div ref={slidingContainer}>
						<SlidingText
							direction="right"
							left="15%"
							progress={scrollYProgress}
						>
							<h1 className="text-[16rem] text-dark font-bold font-new-science uppercase leading-55">
								<span className="text-apex-red">Apex</span> Racing
							</h1>
						</SlidingText>
						<SlidingText direction="left" left="10%" progress={scrollYProgress}>
							<h1 className="text-[16rem] text-dark font-bold font-new-science uppercase leading-55">
								Driving Innovation
							</h1>
						</SlidingText>
					</div>
					<h3 className="text-xl text-dark font-bold font-new-science uppercase mt-16">Try moving your cursor...</h3>
				</main>
			</section>

			<div className="h-[20vh]"></div>

			<section
				id="countdown"
				className="flex flex-col items-center justify-center"
			>
				<h3 className="text-xl text-dark font-bold font-new-science uppercase mt-16">F1 in Schools Northwest Regionals</h3>
				<div className="grid-cols-3 grid gap-16 mt-8">
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-[7rem] text-dark font-bold font-new-science leading-25">30</h1>
						<h4 className="text-2xl text-dark font-bold font-new-science lowercase">days</h4>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-[7rem] text-dark font-bold font-new-science leading-25">15</h1>
						<h4 className="text-2xl text-dark font-bold font-new-science lowercase">hours</h4>
					</div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-[7rem] text-dark font-bold font-new-science leading-25">25</h1>
						<h4 className="text-2xl text-dark font-bold font-new-science lowercase">minutes</h4>
					</div>
				</div>
			</section>
			<div className="h-[20vh]"></div>
			<section
				id="about"
				className="h-[100vh] flex flex-row items-center justify-between gap-32 px-32"
			>
				<div className="w-[35%] bg-light h-[70%]"></div>
				<div className="w-1/2 pr-56">
					<h3 className="text-2xl text-light font-bold font-new-science uppercase mt-16">About the team</h3>
					<p className="text-xl text-zinc-300 font-[200] mt-4 leading-8">
						We are students at the University of Liverpool Maths School
						competing in the 2024-25 season of F1 in Schools in the Professional
						Class. Our first step of the competition is the Northwest regionals
						on the 26th February in Manchester, where we aim to be promoted to
						the National finals.
					</p>
					<p className="text-xl text-zinc-300 font-[200] mt-3 leading-8">
						Together we are working hard to deliver a car that will perform at a
						high standard, along with a plethora of complimentary documents also
						adhering to a high production standard.
					</p>
					<div className="font-new-science font-bold text-sm text-white bg-apex-red px-5 py-2 inline-block uppercase align-middle mt-8 cursor-pointer hover:bg-apex-red-highlight leading-5">
						Contact Us
					</div>
				</div>
			</section>
			<section id="sponsors" className="flex flex-col items-center justify-center">
				<h3 className="text-2xl text-light font-bold font-new-science uppercase mt-16">Our Sponsors</h3>
				<p className="text-xl text-zinc-300 font-[200] mt-2 leading-8">
					In order to fund our project we sought both resourceful and financial help from a series of sponsors.
				</p>
				<div className="flex flex-row gap-32 h-24 w-1/2 items-center justify-center mt-4">
					<img src="images/sponsors/edit.svg" className="h-24" alt="Edit Brand Studio Logo" />
					<img src="images/sponsors/ulmas.png" className="h-18 w-56" alt="University of Liverpool Maths School Logo" />
				</div>
			</section>
		</motion.div>
	)
}

export default App
