import React from "react";
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Button = props => {
  const { label, type, isDanger, isOutline, isFullWidth, onClick, disabled } = props;

  const styles = classNames({
    'p-2 font-medium': true,
    'w-full': isFullWidth,
    'text-light': !isOutline,
    'text-primary': isOutline && !isDanger,
    'text-red': isOutline && isDanger,
    'bg-primary': !isOutline && !isDanger,
    'bg-primary-50': !isDanger && disabled,
    'bg-red': !isOutline && isDanger,
    'bg-red-50': isDanger && disabled,
    'bg-light': isOutline,
    'border': isOutline,
    'border-primary': isOutline && !isDanger,
    'border-red': isOutline && isDanger,
  });
  return (
    <button type={type} className={styles} onClick={onClick} {...props}>
        {label}
    </button>
  );
}

Button.defaultProps = {
  isOutline: false,
  isDanger: false,
  isFullWidth: true,
  type: 'button'
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type:  PropTypes.oneOf(['button', 'submit']),
  isOutline: PropTypes.bool,
  isDanger: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;