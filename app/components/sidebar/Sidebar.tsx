'use client';

import { useState } from 'react';
import { Variants, motion } from 'framer-motion';
import styles from './Sidebar.module.scss';
import Menu from '../menu/Menu';
import ListItem from './ListItem/ListItem';
import { v4 as uuidv4 } from 'uuid';

const listVariants: Variants = {
  initial: {
    opacity: 0,
    y: -20,
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
  closed: {
    y: -20,
    opacity: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const mobileListVariants: Variants = {
  initial: {
    y: -400,
  },
  open: {
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
    },
  },
  closed: {
    y: -400,
    transition: {
      duration: 0.5,
      staggerChildren: 0.05,
    },
  },
};

const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const listArray: Array<string> = ['About', 'Blog', 'Contact'];

  return (
    <div className={styles.sidebar}>
      <motion.div className={styles.sidebar} animate={open ? 'open' : 'closed'}>
        <Menu setOpen={setOpen} />
      </motion.div>
      <motion.div
        initial="initial"
        variants={mobileListVariants}
        animate={open ? 'open' : 'closed'}
        className={styles['mobile-items']}
      >
        {listArray.map((item) => (
          <motion.span
            whileTap={{ color: 'rgb(255,165,0)' }}
            variants={mobileListVariants}
            key={uuidv4()}
            className={styles['mobile-item']}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>

      <motion.ul
        variants={listVariants}
        animate={open ? 'open' : 'closed'}
        initial="initial"
        className={styles['text-container']}
      >
        {listArray.map((item) => (
          <ListItem key={uuidv4()} variants={listVariants} text={item} />
        ))}
      </motion.ul>
    </div>
  );
};

export default Sidebar;
