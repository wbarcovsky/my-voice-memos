import React, { useEffect } from 'react';
import styles from './Card.module.css';
import { Spinner } from 'components/Spinner/Spinner';

interface MainCardProps {
  title?: string;
  content: React.ReactNode;
  buttons?: React.ReactNode;
  isLoading?: boolean;
}

export const Card: React.FC<MainCardProps> = ({ title = 'My voice memos', content, buttons, isLoading }) => {
  const [actualLoading, setActualLoading] = React.useState(isLoading);
  // Delay before spinner will show
  useEffect(() => {
    if (isLoading) {
      setActualLoading(null);
      setTimeout(() => {
        if (actualLoading === null) setActualLoading(true);
      }, 100);
    } else {
      setActualLoading(false);
    }
  }, [isLoading]);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>{title}</p>
      </div>
      <div className={styles.content}>
        {actualLoading ? (
          <div className={styles.loader}>
            <Spinner />
          </div>
        ) : (
          content
        )}
      </div>
      {buttons && !actualLoading && <div className={styles.bottomWrapper}>{buttons}</div>}
    </div>
  );
};
