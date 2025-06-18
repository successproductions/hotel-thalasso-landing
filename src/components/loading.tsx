'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-stone-900">
      <motion.div
        className="w-32 h-32 drop-shadow-lg"
        animate={{
          y: [0, -24, 0, -12, 0],       
          rotate: [0, 5, -5, 3, 0],      
          opacity: [1, 0.8, 1, 0.8, 1],  
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src="/Logo-Dakhla-Club-colors.png"
          alt="logo loading"
          width={128}
          height={128}
          priority
        />
      </motion.div>
    </div>
  )
}
