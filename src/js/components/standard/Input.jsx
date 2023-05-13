import React, { Fragment } from "react";
import PropTypes from 'prop-types';

import classNames from 'classnames';

const Input = props => {
  const {
    isFullWidth,
    textAlign,
    label,
    type,
    error,
    value,
    onChange,
    onClick
  } = props;

  const inputElementClass = classNames({
    'w-full': isFullWidth,
    'block px-3 py-2 border-2 focus:border-2': true,
    'text-right': textAlign == 'right',
    'border-red': error
  });

  return (
    <Fragment>
        {
            label && 
            <label className="block font-medium">{label}</label>
        }
        <input
            type={type}
            className={inputElementClass}
            value={value}
            onChange={onChange}
            onClick={onClick}
            {...props}
        />
        {
            error &&
            <span className="text-red">{error}</span>
        }
    </Fragment>
  );
}

Input.defaultProps = {
  isFullWidth: true,
  textAlign: 'left',
  type: "text",
  isOutline: false,
  isDanger: false,
  value: null
};

Input.propTypes = {
  isFullWidth: PropTypes.bool,
  textAlign: PropTypes.oneOf(['left', 'right', 'center']),
  type:  PropTypes.oneOf(['text', 'email', 'password', 'datetime-local', 'number']),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};

export default Input;