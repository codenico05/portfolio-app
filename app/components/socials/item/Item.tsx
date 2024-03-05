'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Socials.module.scss';
import { motion } from 'framer-motion';

interface Props {
  alt: string;
  icon: string;
  href: string;
}

const Item = ({ alt, icon, href }: Props) => {
  const MotionLink = motion(Link);
  return (
    <MotionLink
      whileHover={{ scale: 1.15, rotate: '10deg', transition: { duration: 0.5 } }}
      href={href}
      className={styles.item}
    >
      <Image src={icon} alt={alt} />
    </MotionLink>
  );
};

export default Item;
