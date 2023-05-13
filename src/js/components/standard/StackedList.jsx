import React from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isArray } from 'lodash';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import ScrollContainer from 'react-indiana-drag-scroll'
import { Colors } from "./Color.jsx";
import "../../../styles/StackedList.css"


export const StackedListContainer = props => {

  const {
    heading
  } = props;

  return (
    <div className="relative  shadow rounded" style={{backgroundColor : Colors.bgColor}}>
      {
        heading && (<div className="w-full p-2 border-b text-subHeading text-dark font-bold">{heading}</div>)
      }
      <div className="">
        {props.children}
      </div>
    </div>
  );
}

StackedListContainer.defaultProps = {
  heading: null
};

StackedListContainer.propTypes = {
  heading: PropTypes.string
};

export const StackedListItem = props => {

  const listClass = classNames({
    'relative flex flex-col md:flex-row border-b border-t equipBox': true,
    'bg-red-50': props.isAlert,
    'cursor-pointer': props.onClick && typeof props.onClick == 'function'
  });


  return (<>
    <div className={listClass} onClick={props.onClick} >
      <div className="flex-0 border-r flex flex-col justify-center equipLef">
        <div className="p-4 equipLeft" style={{ width: 150 }}>
            <div className="font-cardHeading font-bold equipLeftName " style={{textAlign : "center"}}>{props.name}</div>
            <div className="font-cardHeading">{props.type}</div>
        </div>
      </div>
      <ScrollContainer horizontal className="flex-1 grid md:flex">
        {props.children}
      </ScrollContainer>
    </div>
    </>)

}

StackedListItem.defaultProps = {
};

StackedListItem.propTypes = {
};

export const StackedListParam = props => {
  
  const {
    name,
    unit,
    value,
    isStickeyLeft,
    isStickeyRight,
    customStyle
  } = props;

  const paramClass = classNames({
    'p-4 flex-1 flex flex-col justify-center text-center equipright': true,
    'sticky md:border-r top-0 left-0 bg-light': isStickeyLeft,
    'sticky md:border-l top-0 right-0 bg-light': isStickeyRight
  });
  
  let styles = {minWidth:100 ,  borderBottom : Colors.boxBorder , marginBottom : '-1px'}
  if(customStyle) {
    styles = {...styles, ...customStyle}
  }
  
  return (<>
    <div className={paramClass} style={styles} >
      <div className="font-cardHeading">{name} { unit ? `- ${unit}` : null } </div>
      {
        isArray(value) &&
        <Sparklines data={value} height={30} >
            <SparklinesLine color="rgba(47, 73, 209, 1)" />
            <SparklinesReferenceLine type="mean" />
        </Sparklines>
      }
      {
        !isArray(value) &&
        <div className="font-cardHeading font-bold">{value}</div>
      }
    </div>
    </>)
}

StackedListParam.defaultProps = {
};

StackedListParam.propTypes = {
};
