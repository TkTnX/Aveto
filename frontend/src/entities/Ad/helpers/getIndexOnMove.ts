'use client'
import { useState } from 'react'

export function getIndexOnMove(length: number) {
	const [currentIndex, setCurrentIndex] = useState(0)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const { left, width } = e.currentTarget.getBoundingClientRect()
		const x = e.clientX - left

		const zoneWidth = width / length
		const newIndex = Math.floor(x / zoneWidth)

		setCurrentIndex(newIndex)
	}

	const handleMouseLeave = () => setCurrentIndex(0)

	return {
		currentIndex,
		handleMouseLeave,
		handleMouseMove
	}
}
