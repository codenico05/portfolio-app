'use client';

import React from 'react';
import styles from './Main.module.scss';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Mesh from '@/app/assets/mesh.png';
import Avatar from '@/app/assets/avatar.png';
import Button from '@/app/components/button/Button';
import { Variants, motion } from 'framer-motion';

const Main = () => {
  const textVariants: Variants = {
    initial: {
      x: -400,
      opacity: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleButtonClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const MTypeAnimation = motion(TypeAnimation);

  return (
    <div className={styles.container}>
      <motion.div variants={textVariants} className={styles['text-wrapper']}>
        <MTypeAnimation
          whileInView={{ x: 0, opacity: 1, transition: { duration: 0.5 } }}
          variants={textVariants}
          initial="initial"
          preRenderFirstString={true}
          sequence={['', 'Web Developer']}
          className={styles.title}
          speed={13}
        />
        <Image src={Mesh} className={styles.mesh} alt="mesh" />

        <motion.p
          className={styles.text}
          variants={textVariants}
          initial="initial"
          whileInView={{ x: 0, opacity: 1, transition: { duration: 1 } }}
        >
          Hi, I am Code Nico, a Web & Mobile Developer dedicated to crafting user-friendly
          applications. I also enjoy creating engaging content through videos and blog posts about
          programming. Lets explore the world of technology together!
        </motion.p>
        <Button handleClick={handleButtonClick} text="Contact Me" />
      </motion.div>
      <div className={styles['image-wrapper']}>
        <div className={styles['image-bg']}>
          <Image src={Avatar} alt="avatar" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Main;
