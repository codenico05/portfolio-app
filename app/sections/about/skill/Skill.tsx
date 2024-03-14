'use client';

import React from 'react';
import styles from '../About.module.scss';
import { K2D } from 'next/font/google';
import Image from 'next/image';
import { Skill } from '@/app/types';

interface Props {
  skill: Skill;
  closed?: boolean;
  onClickSkill: (skill: Skill) => void;
}

const k2d = K2D({ weight: '500', subsets: ['latin'] });

const Skill = ({ skill, closed, onClickSkill }: Props) => {
  return (
    <li className={`${styles['skill-wrapper']} ${k2d.className}`}>
      <div className={styles.heading}>
        <span className={styles.index}>
          {Number(skill.id) < 10 ? 0 : ''}
          {skill.id}
        </span>
        <h3 onClick={() => onClickSkill(skill)} className={styles.label}>
          {skill.label}
        </h3>
        <Image className={styles.image} src={skill.image} alt="test" />
      </div>
      {closed && <p className={styles.text}>{skill.text}</p>}
    </li>
  );
};

export default Skill;
