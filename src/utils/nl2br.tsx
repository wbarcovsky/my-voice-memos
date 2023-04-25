import React, { ReactNode } from 'react';

export function nl2br(text: string): ReactNode {
  return text.split('\n').map(function (item, idx) {
    return (
      <span key={idx}>
        {item}
        <br />
      </span>
    );
  });
}
