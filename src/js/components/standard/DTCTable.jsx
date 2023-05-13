import React from "react";
import { map } from 'lodash';

import Card from './Card.jsx';

import { DTCparser } from '../../../helpers/utils';

const DTCTable = props => {
  const { DTC } = props;
  const DTCData = DTCparser(DTC);
  return (
    <Card>
      <h2 className="text-cardHeading text-dark font-bold">DTC Table</h2>
      <table className="table-auto w-full divide-gray-200">
        <tr className="bg-primary">
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light tracking-wider">SR#</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light tracking-wider">DTC Code</th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-light tracking-wider">DTC Value</th>
        </tr>
        {
          map(DTCData, (element, index) => {
            const { name, value } = element;
            return (
              <tr className="bg-light border-t-2 border-bg-gray-300">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark tracking-wider">{index}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark tracking-wider">{name}</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-dark tracking-wider">{value}</th>
              </tr>
            )
          })
        }
      </table>
    </Card>
  );
}

DTCTable.defaultProps = {
};

DTCTable.propTypes = {
};

export default DTCTable;
