import React, { ReactNode } from 'react';

export function nl2br(text: string): ReactNode {
  return text.split('\n').map((item, idx) => (
    <span key={idx}>
      {item}
      <br />
    </span>
  ));
}
