'use client';

import React from 'react';
import { Variants, motion } from 'framer-motion';
import styles from '../Sidebar.module.scss';

interface Props {
  text: string;
  variants: Variants;
}

const ListItem = ({ text, variants }: Props) => {
  return (
    <motion.li
      initial
      whileHover={{
        color: 'rgb(255,165,0)',
        scale: 1.05,
        rotate: '5deg',
        transition: { duration: 0.5 },
      }}
      variants={variants}
      className={styles.text}
    >
      <a href={`#${text.toLowerCase()}`}>{text}</a>
    </motion.li>
  );
};

export default ListItem;
