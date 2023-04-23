import React from 'react';
import styles from './Card.module.css';

interface MainCardProps {
  title: string;
  content: React.ReactNode;
  buttons?: React.ReactNode;
}

export const Card: React.FC<MainCardProps> = ({ title, content, buttons }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.content}>{content}</div>
      {buttons && <div className={styles.bottomWrapper}>{buttons}</div>}
    </div>
  );
};
