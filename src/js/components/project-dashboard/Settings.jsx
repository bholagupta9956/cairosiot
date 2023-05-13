import React from "react";

import Card from '../standard/Card.jsx'
import Button from '../standard/Button.jsx'


const { sub } = require('date-fns')


const Settings = props => {
  const {
    handleDepricateDevice,
    handleDeleteDevice
  } = props ;


  return (
    <div className="h-full">
      <Card>
        <div className="text-heading text-dark font-bold">Danger Zone</div>
        <div className="my-4 flex items-center">
          <div className="flex-1">
            <div className="font-bold"> Depricate this location </div>
            <div> You can tempororily disable this location. This can be later reverted. </div>
          </div>
          <div className="flex-0 w-44">
            <Button
              isOutline
              isDanger
              label="Depricate Location"
              onClick={(e) => handleDepricateDevice(e)}
            />
          </div>
        </div>
        <hr/>
        <div className="my-4 flex items-center">
          <div className="flex-1">
            <div className="font-bold"> Delete this location </div>
            <div> Once you delete a location, there is no going back. Please be certain.</div>
          </div>
          <div className="flex-0 w-44">
            <Button
              isDanger
              label="Delete Location"
              onClick={(e) => handleDeleteDevice(e)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Settings;
