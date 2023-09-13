import clsx from 'clsx';
import './ErrorField.css';

function ErrorField({ isActive, children }) {
  return (
    <span className={clsx('error-field', isActive && 'error-field_active')}>{children}</span>
  );
}

export default ErrorField;
