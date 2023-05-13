import React, { useEffect } from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";

import {
  BASIC_DETAILS,
  PARAMETER_DETAILS,
  CONFIRMATION,
} from "../constants/addDevicesWizard";

import {
  reset,
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
  createDevice,
} from "../../slices/addDeviceWizardSlice";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import WizardStepLayout from "../components/layout/WizardStepLayout.jsx";
import Card from "../components/standard/Card.jsx";
import BasicDetails from "../components/add-device-wizard/BasicDetails.jsx";
import DeviceParameters from "../components/add-device-wizard/DeviceParameters.jsx";
import Confirmation from "../components/add-device-wizard/Confirmation.jsx";

const AddDeviceWizard = (props) => {
  const history = useHistory();
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { isLoading: isProjectsLoading, projects } = useSelector(
    (state) => state.projects
  );
  const {
    basicDetails,
    currentStep,
    deviceParametersByMode,
    finalConfig,
    initEvents,
  } = useSelector((state) => state.addDevice);

  useEffect(() => {
    dispatch(reset());

    return () => dispatch(reset());
  }, []);

  const handleBasicDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(addDeviceBasicDetails());
  };

  const handleParametersDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(submitDeviceParametersByMode());
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    const currentCompanyId = projects[projectId].companyId;
    const attributes = {
      ...finalConfig,
      companyId: currentCompanyId,
    };
    console.log("Final Config:- " + JSON.stringify(finalConfig));
    dispatch(createDevice(projectId, attributes, initEvents));
    setTimeout(() => {
      const path = generatePath("/:projectId", { projectId });
      history.push(path);
    }, 2000);
  };

  function renderStep() {
    switch (currentStep) {
      case BASIC_DETAILS: {
        return (
          <WizardStepLayout numberOfSteps={3} activeStep={1}>
            <BasicDetails
              errors={basicDetails.errors}
              name={basicDetails.name}
              model={basicDetails.model}
              type={basicDetails.type}
              numberOfModes={basicDetails.numberOfModes}
              lat={basicDetails.lat}
              lng={basicDetails.lng}
              installationDate={basicDetails.installationDate}
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
              nextStepLabel="Continue: Add Parameters"
              onSubmit={handleBasicDetailsSubmit}
            />
          </WizardStepLayout>
        );
      }

      case PARAMETER_DETAILS: {
        return (
          <WizardStepLayout numberOfSteps={3} activeStep={2}>
            <DeviceParameters
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
              nextStepLabel="Continue: Review"
              onSubmit={handleParametersDetailsSubmit}
            />
          </WizardStepLayout>
        );
      }

      case CONFIRMATION: {
        return (
          <WizardStepLayout numberOfSteps={3} activeStep={3}>
            <Confirmation
              configObject={finalConfig}
              nextStepLabel="Confirm: Submit"
              onSubmit={handleConfirmation}
            />
          </WizardStepLayout>
        );
      }

      default:
        break;
    }
  }

  return <DashboardLayout>{renderStep()}</DashboardLayout>;
};

export default AddDeviceWizard;
