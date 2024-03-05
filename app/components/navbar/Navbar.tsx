'use client';

import React from 'react';
import styles from './Navbar.module.scss';
import { K2D } from 'next/font/google';
import Sidebar from '../sidebar/Sidebar';
import Socials from '../socials/Socials';
import ArrowImage from '@/app/assets/arrow.png';
import Image from 'next/image';
import { Variants, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const k2d = K2D({ weight: '500', subsets: ['latin'] });

const Navbar = () => {
  const variants: Variants = {
    initial: {
      opacity: 0,
      y: -100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const titleArray: string[] = ['C', 'o', 'd', 'e', 'N', 'i', 'c', 'o', '.'];
  return (
    <nav className={styles.navbar}>
      <Sidebar />
      <motion.div className={styles.title} variants={variants} initial="initial" animate="animate">
        {titleArray.map((char) => (
          <motion.h1
            variants={variants}
            key={uuidv4()}
            className={`${styles.title} ${k2d.className}`}
          >
            {char}
          </motion.h1>
        ))}

        <Image src={ArrowImage} alt="arrow" className={styles.arrow} />
      </motion.div>

      <Socials />
    </nav>
  );
};

export default Navbar;
