import React, { useCallback } from 'react';
import styles from './Textarea.module.css';

interface TextareaProps {
  placeholder: string;
  onChange?: (value: string) => void;
  value: string;
}

export const Textarea: React.FC<TextareaProps> = ({ placeholder, onChange, value }) => {
  // Autoresize logic
  const textAreaRef = useCallback((node) => {
    if (node) {
      node.style.height = '0px';
      const scrollHeight = node.scrollHeight;
      node.style.height = scrollHeight + 'px';
    }
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;
    if (onChange) onChange(val);
  };

  return (
    <textarea
      className={styles.textarea}
      onChange={handleChange}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={1}
      value={value}
    />
  );
};
