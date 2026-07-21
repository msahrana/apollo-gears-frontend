"use client"
import { motion } from "framer-motion"
import carImg from "@/public/assets/hero-car.svg"
import Image from "next/image"
export default function MotionCar() {
  return (
    <motion.div
      initial={{ x: 50 }}
      animate={{ y: 40, x: 0 }}
      transition={{ ease: "easeOut", duration: 2 }}
      className="flex w-3/5 justify-end"
    >
      <div className="relative h-187.5 w-187.5">
        <Image
          src={carImg}
          alt="Hero car"
          fill
          className="rounded-2xl object-contain"
          priority
        />
      </div>
    </motion.div>
  )
}
