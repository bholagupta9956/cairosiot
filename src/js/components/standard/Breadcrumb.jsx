import React from "react";
import PropTypes from 'prop-types';
import { map } from 'lodash';
import classNames from 'classnames';

const Breadcrumb = props => {
  const { routes, currentRoute } = props;

  const styles = classNames({
    'p-2 font-medium': true,
    'w-full': isFullWidth,
    'text-light': !isOutline,
    'text-primary': isOutline && !isDanger,
    'text-red': isOutline && isDanger,
    'bg-primary': !isOutline && !isDanger,
    'bg-red': !isOutline && isDanger,
    'bg-light': isOutline,
    'border': isOutline,
    'border-primary': isOutline && !isDanger,
    'border-red': isOutline && isDanger,
  });
  return (
    <div className="my-4 flex rounded">
      {
        map(routes, route => {
          return (<div className="p-4 bg-light cursor-pointer">Devices List</div>)
        })
      }
      <div className="p-4 bg-light cursor-pointer">Devices List</div>
      <div className="p-4 bg-primary cursor-pointer text-white">Member & Permission</div>
    </div>
  );
}

Breadcrumb.defaultProps = {
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type:  PropTypes.oneOf(['button', 'submit']),
  isOutline: PropTypes.bool,
  isDanger: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Breadcrumb;