import React from "react";

import Card from '../../components/standard/Card.jsx';
import Input from '../../components/standard/Input.jsx';
import Button from '../../components/standard/Button.jsx';

const BasicDetails = props => {
  const {
    isEditflow,
    nextStepLabel,
    errors,

    name,
    model,
    type,
    lat,
    lng,
    installationDate,
    numberOfModes,
    maintenanceDate,
    maintenancePeriod,

    updateName,
    updateModel,
    updateModes,
    updateType,
    updateLat,
    updateLng,
    updateInstallationDate,
    updateMaintenanceDate,
    updateMaintenancePeriod,

    onSubmit
  } = props;

  return (
      <form className="my-4" onSubmit={onSubmit}>
        <h1 className="text-heading text-dark font-bold">
          { isEditflow ? "Edit Equipment Details" : "Add New Equipment" }</h1>
        <h2 className="text-cardHeading text-dark-50">Basic Details</h2>
        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input
              label="Equipment Name"
              error={errors?.name}
              value={name}
              onChange={e => updateName(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Equipment Model"
              error={errors?.model}
              value={model}
              onChange={e => updateModel(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <label className="block font-bold">Equipment Type</label>
            <select
              value={type}
              disabled={isEditflow}
              className="block px-3 py-2 w-full bg-background rounded outline-none"
              onChange={e => updateType(e.target.value)}
            >
              <option value="point_machine">Point Machine</option>
              <option value="dc_track">DC Track</option>
              <option value="signal">Signal</option>
            </select>
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min={1}
              label="Number of modes"
              disabled={isEditflow}
              error={errors?.numberOfModes}
              value={numberOfModes}
              onChange={e => updateModes(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Input
              type="number"
              label="Latitude"
              step="any"
              error={errors?.lat}
              value={lat}
              onChange={e => updateLat(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Input
              type="number"
              label="Longitude"
              step="any"
              error={errors?.lng}
              value={lng}
              onChange={e => updateLng(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <Input
              type="date"
              label="Installation Date"
              error={errors?.installationDate}
              value={installationDate}
              onChange={e => updateInstallationDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <Input
              type="date"
              label="Last Maintenance Date"
              error={errors?.maintenanceDate}
              value={maintenanceDate}
              onChange={e => updateMaintenanceDate(e.target.value)}
            />
          </div>
          <div className="col-span-1">
            <label className="block font-bold">Maintenance Period</label>
            <select
              value={maintenancePeriod}
              className="block px-3 py-2 w-full bg-background rounded outline-none"
              onChange={e => updateMaintenancePeriod(e.target.value)}
            >
              <option value="NULL" hidden >Select a Value</option>
              <option value="15">15 Days</option>
              <option value="30">1 Month</option>
              <option value="360">1 Year</option>
            </select>
          </div>
          {
            !isEditflow && (
              <>
                <div className="col-span-1 mt-2">
                  <Button isOutline label="Previous" disabled />
                </div>
                <div className="col-span-1 mt-2">
                  <Button label={nextStepLabel} type="submit" />
                </div>
              </>
            )
          }
          {
            isEditflow && ( <Button label={nextStepLabel} type="submit" />)
          }
          
        </div>
      </form>
  );
}

export default BasicDetails;
