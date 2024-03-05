'use client';

import React from 'react';
import styles from './Main.module.scss';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';
import Avatar from '@/app/assets/avatar.png';
import Button from '@/app/components/button/Button';

const Main = () => {
  const handleButtonClick = () => {
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles['text-wrapper']}>
        <TypeAnimation
          preRenderFirstString={true}
          sequence={[0, '', 1000, 'Web Developer']}
          className={styles.title}
          speed={13}
        />
        <p className={styles.text}>
          Hi, I am Code Nico, a Web & Mobile Developer dedicated to crafting user-friendly
          applications. I also enjoy creating engaging content through videos and blog posts about
          programming. Lets explore the world of technology together!
        </p>
        <Button handleClick={handleButtonClick} text="Contact Me" />
      </div>
      <div className={styles['image-wrapper']}>
        <div className={styles['image-bg']}>
          <Image src={Avatar} alt="avatar" className={styles.image} />
        </div>
      </div>
    </div>
  );
};

export default Main;
