import React from "react";
import { times, map, last, keys } from "lodash"

import Card from '../standard/Card.jsx'
import Input from '../standard/Input.jsx'
import Button from '../standard/Button.jsx'

const Confirmation = props => {
  const {
    configObject,
    nextStepLabel,
    onSubmit
  } = props

  var str = JSON.stringify(configObject, null, 2);

  return (
      <form className="my-4" onSubmit={onSubmit}>
        <h1 className="text-heading text-dark font-bold">Confirm Your Equipment Configuration</h1>
  
        <pre>
          <code>
            {str}
          </code>
        </pre>

        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 mt-2">
            <Button isOutline label="Previous" disabled />
          </div>
          <div className="col-span-1 mt-2">
            <Button label={nextStepLabel} type="submit" />
          </div>
        </div>
      </form>
  );
}

export default Confirmation;
