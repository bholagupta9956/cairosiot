import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isArray, map } from "lodash";

import { Table, TableData, TableHeader, TableRow } from "./Table.jsx";
import { Colors } from "./Color.jsx";
import { colors } from "@material-ui/core";

export const StackedListContainer = (props) => {
  const { heading } = props;

  return (
    <div className="relative bg-light shadow rounded">
      <div className="w-full p-4 border-b text-subHeading text-dark font-bold">
        {heading}
      </div>
      <div className="">{props.children}</div>
    </div>
  );
};

StackedListContainer.defaultProps = {
  heading: "List Heading",
};

StackedListContainer.propTypes = {
  heading: PropTypes.string,
};

export const StackedListItem = (props) => {
  const listClass = classNames({
    "relative flex border-b": true,
    "bg-red-50": props.isAlert,
    "cursor-pointer": props.onClick,
  });

  return (
    <>
      <div className={listClass} onClick={props.onClick}>
        <div
          className="flex-0 border-r flex flex-col justify-center"
          style={{
            borderBottom: Colors.boxBorder,
            borderRight: Colors.boxBorder,
            borderLeft: Colors.boxBorder,
          }}
        >
          <div className="p-4 " style={{ width: 200 }}>
            <div
              className="font-cardHeading font-bold"
              style={{ textAlign: "center" }}
            >
              {props.name}
            </div>
          </div>
        </div>
        {props.children}
      </div>
    </>
  );
};

StackedListItem.defaultProps = {};

StackedListItem.propTypes = {};

export const StackedListParam = (props) => {
  const { displaydata } = props;

  const [parameterData, setParameterData] = useState({ mode: "", data: [] });
  const [currentDateTime , setCurrentDateTime] = useState("00-00-2022 00:00:00")

  let strDateTime = "";

  if (displaydata.timestamp) {
    var date = new Date(displaydata.timestamp);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");

    const hour = String(date.getUTCHours()).padStart(2, "0");
    const minute = String(date.getUTCMinutes()).padStart(2, "0");
    const second = String(date.getUTCSeconds()).padStart(2, "0");

    strDateTime =
      day + "-" + month + "-" + year + " " + hour + ":" + minute + ":" + second;

  }

  const tableRowStyles = {
    borderBottom: `1px solid blue`,
    borderRight: `1px solid blue`,
    borderLeft: `1px solid blue`,
  };

  const getCurrentDate = () => {
    var date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const day = String(date.getDate()).padStart(2, "0");

    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");

    strDateTime =
      day + "-" + month + "-" + year + " " + hour + ":" + minute 

      setCurrentDateTime(strDateTime)
  };

  useEffect(() => {
    if (displaydata.modeValue === "Forward") {
    }

    getCurrentDate();
  }, []);

  return (
    <>
      <Table className="table table-bordered">
        {map(displaydata.parameters, (param) => (
          <>
            <TableRow styles={tableRowStyles}>
              {param.key != "010" && param.name && (
                <>
                  <TableData customStyle={{ minWidth: 152, width: 152 }}>
                    {param.name}
                  </TableData>
                  <TableData customStyle={{ maxWidth: 300, minWidth: 300 }}>
                    {param.value + " "}
                    {param.unit}
                  </TableData>
                  <TableData customStyle={{ width: 200 }}>
                    {currentDateTime}
                  </TableData>
                </>
              )}
            </TableRow>
          </>
        ))}
      </Table>
    </>
  );
};

StackedListParam.defaultProps = {};

StackedListParam.propTypes = {};
