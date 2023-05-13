import React, { useState } from "react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import classNames from 'classnames';
import { parseInvenseTime } from '../../../helpers/time-utils';
import ICImage from '../../../images/icons/ic-icon.svg';
import { Colors } from "./Color.jsx";

export const Table = props => {
  const {
    heading , 
  } = props;

  return (
    <div className="relative w-full bg-light shadow rounded" style={{backgroundColor : Colors.bgColor}}>
      {
        heading &&
        <div className="w-full px-4 py-2 border-b text-subHeading text-dark font-bold">{heading}</div>
      }
      <table className="table-auto min-w-full divide-gray-200">
          {props.children}
      </table>
    </div>
  );
}

Table.defaultProps = {
};

Table.propTypes = {
};

export const TableRow = props => {
  const {styles} = props
  return (
    <tr className="border-b" style={styles}>
      {props.children}
    </tr>
  );
}

export const TableHeader = props => {
  const {
    cols,
    rows,
    className
  } = props;

  return (
    <th colSpan={cols} rowSpan={rows} className={className}>
        {props.children}
    </th>
  );
}

export const TableData = props => {
  const {
    className,
    cols,
    rows,
    isStickeyLeft,
    isStickeyRight,
    customStyle
  } = props;

  let styles = {};
  
  if(customStyle) {
    styles = { ...customStyle , overflow : "hidden" , paddingRight : "6px"}
  }

  const paramClass = classNames({
    'relative w-28 p-2': true,
    'sticky border-r top-0 left-0 bg-light': isStickeyLeft,
    'sticky border-l top-0 right-0 bg-light': isStickeyRight,
    [className]: true
  })

  return (
    <td colSpan={cols} rowSpan={rows} className={paramClass} style={styles} >
        {props.children}
    </td>
  );
}
