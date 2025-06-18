'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function PageLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center
                     bg-white dark:bg-stone-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          aria-hidden
        >
          <motion.div
            className="w-32 h-32 drop-shadow-lg pointer-events-none"
            animate={{
              y: [0, -24, 0, -12, 0],
              rotate: [0, 5, -5, 3, 0],
              opacity: [1, 0.8, 1, 0.8, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image src="/LogoIcone.png" alt="Logo loading" width={128} height={128} priority />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
