import React, { useRef, useState } from "react";
import { useAutosizeTextArea } from "../../hooks/useAutosizeTextArea";
import styles from './Textarea.module.css';

interface TextareaProps {
  placeholder: string;
  onChange?: (value: string) => void;
  value: string;
}

export const Textarea: React.FC<TextareaProps> = ({placeholder, onChange, value}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

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
}
