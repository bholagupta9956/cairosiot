import React, { useEffect } from "react";
import { CopyBlock } from "react-code-blocks";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";

import {
  initialize,
  updateName,
  updateModel,
  updateType,
  updateModes,
  updateLat,
  updateLng,
  updateInstallationDate,
  updateMaintenanceDate,
  updateMaintenancePeriod,
  addDeviceBasicDetails,
  updateDeviceModeName,
  updateDeviceModeValue,
  updateDeviceParameterType,
  updateDeviceParameterKeyCode,
  updateDeviceParameterName,
  updateDeviceParameterUnit,
  updateDeviceParameterValue,
  addNewDeviceParameter,
  removeDeviceParameter,
  submitDeviceParametersByMode,
  updateDeviceParameterMinValue,
  updateDeviceParameterMaxValue,
  updateDeviceParameterGaugeMinValue,
  updateDeviceParameterGaugeMaxValue,
  updateDeviceParameterMergeInGraph,
  updateDeviceParameterShowAverage,
  updateDeviceParameterActive,
  updateDeviceBasicDetails,
  updateDeviceParameters,
} from "../../../slices/editDeviceSlice.js";
import { fetchDeviceDetailsRealTime } from "../../../slices/devicesSlice";

import Card from "../standard/Card.jsx";
import Button from "../standard/Button.jsx";

import BasicDetails from "../add-device-wizard/BasicDetails.jsx";
import DeviceParameters from "../add-device-wizard/DeviceParameters.jsx";

import config from "../../../../config";

import { formatToInvenseTimeNative } from "../../../helpers/time-utils";

const { sub } = require("date-fns");

const Settings = (props) => {

  const { deviceDetails, handleDepricateDevice, handleDeleteDevice } = props;

  console.log(deviceDetails , "deviceDetails here");

  const dispatch = useDispatch();

  const {
    basicDetails,
    currentStep,
    deviceParametersByMode,
    finalConfig,
    initEvents,
  } = useSelector((state) => state.editDevice);

  useEffect(() => {
    dispatch(initialize(deviceDetails));
  }, []);

  const handleBasicDetailsSubmit = (e) => {
    e.preventDefault();
    const refetchDeviceDetails = () =>
      dispatch(
        fetchDeviceDetailsRealTime(
          deviceDetails.projectId,
          deviceDetails.deviceId
        )
      );
    dispatch(
      updateDeviceBasicDetails(
        deviceDetails.projectId,
        deviceDetails.deviceId,
        basicDetails,
        refetchDeviceDetails
      )
    );
  };

  const handleParametersDetailsSubmit = (e) => {
    e.preventDefault();
    const refetchDeviceDetails = () =>
      dispatch(
        fetchDeviceDetailsRealTime(
          deviceDetails.projectId,
          deviceDetails.deviceId
        )
      );
    dispatch(
      updateDeviceParameters(
        deviceDetails.projectId,
        deviceDetails.deviceId,
        deviceParametersByMode,
        refetchDeviceDetails
      )
    );
  };

  return (
    <>
      <div className="my-4">
        <Card>
          <BasicDetails
            isEditflow
            errors={basicDetails.errors}
            name={basicDetails.name}
            model={basicDetails.model}
            type={basicDetails.type}
            numberOfModes={basicDetails.numberOfModes}
            lat={basicDetails.lat}
            lng={basicDetails.lng}
            installationDate={basicDetails.installationDate}
            maintenanceDate={basicDetails.maintenanceDate}
            maintenancePeriod={basicDetails.maintenancePeriod}
            updateName={(value) => dispatch(updateName(value))}
            updateModel={(value) => dispatch(updateModel(value))}
            updateType={(value) => dispatch(updateType(value))}
            updateModes={(value) => dispatch(updateModes(value))}
            updateLat={(value) => dispatch(updateLat(value))}
            updateLng={(value) => dispatch(updateLng(value))}
            updateInstallationDate={(value) =>
              dispatch(updateInstallationDate(value))
            }
            updateMaintenanceDate={(value) =>
              dispatch(updateMaintenanceDate(value))
            }
            updateMaintenancePeriod={(value) =>
              dispatch(updateMaintenancePeriod(value))
            }
            nextStepLabel="Update Details"
            onSubmit={handleBasicDetailsSubmit}
          />
        </Card>
      </div>

      <div className="my-4">
        <Card>
          <DeviceParameters
            isEditflow
            deviceParametersByMode={deviceParametersByMode}
            updateDeviceModeName={(value) =>
              dispatch(updateDeviceModeName(value))
            }
            updateDeviceModeValue={(value) =>
              dispatch(updateDeviceModeValue(value))
            }
            updateDeviceParameterType={(value) =>
              dispatch(updateDeviceParameterType(value))
            }
            updateDeviceParameterKeyCode={(value) =>
              dispatch(updateDeviceParameterKeyCode(value))
            }
            updateDeviceParameterName={(value) =>
              dispatch(updateDeviceParameterName(value))
            }
            updateDeviceParameterUnit={(value) =>
              dispatch(updateDeviceParameterUnit(value))
            }
            updateDeviceParameterValue={(value) =>
              dispatch(updateDeviceParameterValue(value))
            }
            updateDeviceParameterMinValue={(value) =>
              dispatch(updateDeviceParameterMinValue(value))
            }
            updateDeviceParameterMaxValue={(value) =>
              dispatch(updateDeviceParameterMaxValue(value))
            }
            updateDeviceParameterGaugeMinValue={(value) =>
              dispatch(updateDeviceParameterGaugeMinValue(value))
            }
            updateDeviceParameterGaugeMaxValue={(value) =>
              dispatch(updateDeviceParameterGaugeMaxValue(value))
            }
            updateDeviceParameterMergeInGraph={(value) =>
              dispatch(updateDeviceParameterMergeInGraph(value))
            }
            updateDeviceParameterShowAverage={(value) =>
              dispatch(updateDeviceParameterShowAverage(value))
            }
            updateDeviceParameterActive={(value) =>
              dispatch(updateDeviceParameterActive(value))
            }
            addNewDeviceParameter={(value) =>
              dispatch(addNewDeviceParameter(value))
            }
            removeDeviceParameter={(value) =>
              dispatch(removeDeviceParameter(value))
            }
            nextStepLabel="Update Parameter Details"
            onSubmit={handleParametersDetailsSubmit}
          />
        </Card>
      </div>

      <div className="my-4">
        <Card>
          <div className="text-heading text-dark font-bold">Danger Zone</div>
          <div className="my-4 flex items-center">
            <div className="flex-1">
              <div className="font-bold"> Depricate this Equipment </div>
              <div>
                {" "}
                You can tempororily disable equipment. This can be later
                reverted.{" "}
              </div>
            </div>
            <div className="flex-0 w-44">
              <Button
                isOutline
                isDanger
                label="Depricate Equipment"
                onClick={(e) => handleDepricateDevice(e)}
              />
            </div>
          </div>
          <hr />
          <div className="my-4 flex items-center">
            <div className="flex-1">
              <div className="font-bold"> Delete this equipment </div>
              <div>
                {" "}
                Once you delete a equipment, there is no going back. Please be
                certain.
              </div>
            </div>
            <div className="flex-0 w-44">
              <Button
                isDanger
                label="Delete Equipment"
                onClick={(e) => handleDeleteDevice(e)}
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Settings;
