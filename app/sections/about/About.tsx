'use client';

import TagCloud from '@/app/components/tag-sphere/TagSphere';
import React, { useEffect, useState } from 'react';
import styles from './About.module.scss';
import { K2D } from 'next/font/google';
import Skill from './skill/Skill';
import ReactSVG from '@/app/assets/react.svg';
import JestSVG from '@/app/assets/jest.svg';
import NodeSVG from '@/app/assets/node-js.svg';
import { v4 as uuidv4 } from 'uuid';
import { Skill as TSkill } from '@/app/types';

const k2d = K2D({ weight: '500', subsets: ['latin'] });

const About = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [radius, setRadius] = useState<number>(calculateRadius());

  function calculateRadius() {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;

      if (screenWidth < 1440) {
        if (screenWidth < 1024) {
          if (screenWidth < 768) {
            return 100;
          }
          return 250;
        }
        return 280;
      }
    }
    return 300;
  }

  useEffect(() => {
    function handleResize() {
      setRadius(calculateRadius());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleClick(skill: Skill) {
    setSelectedIndex(Number(skill.id));
  }

  const skills: Array<string> = [
    'SASS',
    'JavaScript',
    'TypeScript',
    'Native',
    'Detox',
    'Tailwind',
    'Sass',
    'MUI',
    'Express',
    'MongoDB',
    'React',
    'Node.js',
    'StoryBook',
    'Jest',
    'Git',
    'GitHub',
    'REST API',
  ];

  const skillsArray: TSkill[] = [
    {
      label: 'Frontend Development with React.js',
      text: `Skilled in building responsive and dynamic user interfaces using 
      React.js, a popular JavaScript library for building user interfaces.
       Proficient in creating reusable components, managing state with hooks and context,
        and optimizing performance for fast rendering.`,
      image: ReactSVG,
      id: '0',
    },
    {
      label: 'Backend Development with Node.js',
      text: `Experienced in building server-side applications and APIs using Node.js,
       a runtime environment for executing JavaScript code outside the browser.`,
      image: NodeSVG,
      id: '1',
    },
    {
      label: 'React Native Mobile App Development',
      text: `Proficient in developing cross-platform mobile applications using React Native,
       a JavaScript framework for building native mobile apps. Skilled in creating engaging user interfaces and smooth user experiences across
       iOS and Android platforms.`,
      image: ReactSVG,
      id: '2',
    },
    {
      label: 'Testing and Quality Assurance',
      text: `Knowledgeable in writing comprehensive tests for both frontend and backend code to ensure functionality,
       reliability, and performance.Proficient in implementing test-driven development (TDD) practices to achieve high code coverage and maintainable codebases.`,
      image: JestSVG,
      id: '3',
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={`${k2d.className} ${styles.title}`}>About</h1>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {skillsArray.map((skill) => (
            <Skill
              key={uuidv4()}
              skill={skill}
              closed={Number(skill.id) === selectedIndex}
              onClickSkill={handleClick}
            />
          ))}
        </ul>
        <div className={styles['tag-container']}>
          <TagCloud speed={0.05} radius={radius} maxSpeed={0.1} margin={0}>
            {skills.map((skill, i) => (
              <p
                key={i}
                style={{
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {skill}
              </p>
            ))}
          </TagCloud>
        </div>
      </div>
    </div>
  );
};

export default About;
