import React from 'react';
import './Button.css';

/**
 * Button Component
 * @param {string} children - Button text
 * @param {string} onClick - Click handler
 * @param {string} variant - Button variant (primary, danger, secondary)
 * @param {object} props - Additional props
 */
export function Button({ children, onClick, variant = 'primary', ...props }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
