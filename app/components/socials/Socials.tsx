import React from 'react';
import styles from './Socials.module.scss';
import GithubSVG from '@/app/assets/github.svg';
import YoutubeSVG from '@/app/assets/youtube.svg';
import Item from './item/Item';

const Socials = () => {
  return (
    <div className={styles.container}>
      <Item href="/" icon={GithubSVG} alt="github" />
      <Item href="/" icon={YoutubeSVG} alt="youtube" />
    </div>
  );
};

export default Socials;
