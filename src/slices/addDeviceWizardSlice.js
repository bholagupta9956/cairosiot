import { createSlice } from "@reduxjs/toolkit";
import { range, map, mapValues, reduce, forEach, isEmpty } from "lodash";

import { makePostRequest } from "../middleware/axios";

import config from "../../config";

import createDeviceV2MockResponse from "../mocks/createDeviceV2.json";

import {
  BASIC_DETAILS,
  PARAMETER_DETAILS,
  CONFIRMATION,
} from "../js/constants/addDevicesWizard";

import { formatToInvenseTimeNative } from "../helpers/time-utils";

import validateBasicDetails from "../validators/AddDeviceWizard/BasicDetails";
import validateModeDetails from "../validators/AddDeviceWizard/ModeDetails";
import validateParameterDetails from "../validators/AddDeviceWizard/ParameterDetails";

const { sub } = require("date-fns");

import { TIMESTAMP } from "../js/constants/parameterTypes";

const initialState = {
  steps: [BASIC_DETAILS],
  currentStep: BASIC_DETAILS,
  basicDetails: {
    name: null,
    model: null,
    type: "point_machine",
    lat: null,
    lng: null,
    installationDate: null,
    maintenanceDate: null,
    maintenancePeriod: null,
    numberOfModes: 1,
    errors: null,
  },
  deviceParametersByMode: {
    "001": {
      modeName: null,
      modeValue: null,
      errors: null,
      parameters: {
        0: {
          type: "text",
          keyCode: null,
          value: null,
          name: null,
          min: null,
          max: null,
          mergeInGraph: null,
          showAverage: null,
          minGauge: null,
          maxGauge: null,
          errors: null,
        },
      },
    },
  },
  finalConfig: {},
  initEvents: [],
};

export const addDeviceWizardSlice = createSlice({
  name: "addDeviceWizard",
  initialState,
  reducers: {
    reset: () => initialState,
    updateName: (state, action) => {
      state.basicDetails.name = action.payload;
    },
    updateModel: (state, action) => {
      state.basicDetails.model = action.payload;
    },
    updateModes: (state, action) => {
      state.basicDetails.numberOfModes = action.payload;
    },
    updateType: (state, action) => {
      state.basicDetails.type = action.payload;
    },
    updateLat: (state, action) => {
      state.basicDetails.lat = action.payload;
    },
    updateLng: (state, action) => {
      state.basicDetails.lng = action.payload;
    },
    updateInstallationDate: (state, action) => {
      state.basicDetails.installationDate = action.payload;
    },
    updateMaintenanceDate: (state, action) => {
      state.basicDetails.maintenanceDate = action.payload;
    },
    updateMaintenancePeriod: (state, action) => {
      state.basicDetails.maintenancePeriod = action.payload;
    },
    addDeviceBasicDetails: (state, action) => {
      const errors = validateBasicDetails(state.basicDetails);
      if (!isEmpty(errors)) {
        state.basicDetails.errors = errors;
        return;
      }
      const numberOfModes = state.basicDetails.numberOfModes;
      const sequence = range(numberOfModes);
      const deviceParametersByMode = reduce(
        sequence,
        (result, item) => {
          result[item] = {
            parameters: {
              0: {
                type: TIMESTAMP,
                keyCode: "001",
                value: null,
                name: "Timestamp",
              },
            },
          };
          return result;
        },
        {}
      );
      state.deviceParametersByMode = deviceParametersByMode;
      state.currentStep = PARAMETER_DETAILS;
      state.steps.push(PARAMETER_DETAILS);
    },
    updateDeviceModeName: (state, action) => {
      const { modeId, value } = action.payload;
      state.deviceParametersByMode[modeId].modeName = value;
    },
    updateDeviceModeValue: (state, action) => {
      const { modeId, value } = action.payload;
      state.deviceParametersByMode[modeId].modeValue = value;
    },
    updateDeviceParameterType: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].type = value;
    },
    updateDeviceParameterKeyCode: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].keyCode =
        value;
    },
    updateDeviceParameterName: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].name = value;
    },
    updateDeviceParameterUnit: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].unit = value;
    },
    updateDeviceParameterValue: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].value =
        value;
    },
    updateDeviceParameterMinValue: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].minValue =
        value;
    },
    updateDeviceParameterMaxValue: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].maxValue =
        value;
    },
    updateDeviceParameterGaugeMinValue: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[
        parameterId
      ].gaugeMinValue = value;
    },
    updateDeviceParameterGaugeMaxValue: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[
        parameterId
      ].gaugeMaxValue = value;
    },
    updateDeviceParameterMergeInGraph: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[
        parameterId
      ].mergeInGraph = value;
    },
    updateDeviceParameterShowAverage: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].showAverage =
        value;
    },
    updateDeviceParameterActive: (state, action) => {
      const { modeId, parameterId, value } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId].active =
        value;
    },
    addNewDeviceParameter: (state, action) => {
      const { modeId, parameterId } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId] = {
        type: "text",
        keyCode: null,
        value: null,
        name: null,
      };
    },
    removeDeviceParameter: (state, action) => {
      const { modeId, parameterId } = action.payload;
      delete state.deviceParametersByMode[modeId].parameters[parameterId];
    },
    submitDeviceParametersByMode: (state, action) => {
      let hasError = false;
      state.deviceParametersByMode = mapValues(
        state.deviceParametersByMode,
        (modeDetails, modeId) => {
          const errors = validateModeDetails(modeDetails);

          if (!isEmpty(errors)) {
            hasError = true;
          }

          const parameters = mapValues(
            modeDetails.parameters,
            (param, parameterId) => {
              const errors = validateParameterDetails(param);

              if (!isEmpty(errors)) {
                hasError = true;
              }

              return {
                ...param,
                errors,
              };
            }
          );

          return {
            ...modeDetails,
            parameters,
            errors,
          };
        }
      );

      if (hasError) {
        return;
      }

      const finalConfig = {
        ...state.basicDetails,
        installation_date: state.basicDetails.installationDate,
        deviceModes: map(
          state.deviceParametersByMode,
          (modeDetails, modeId) => {
            return {
              modeId: modeId,
              modeName: modeDetails.modeName,
              modeValue: modeDetails.modeValue,
              parameters: map(modeDetails.parameters, (param, parameterId) => {
                return {
                  type: param.type,
                  key: param.keyCode,
                  name: param.name,
                  unit: param?.unit,
                  value: param?.value,
                  minValue: param?.minValue,
                  maxValue: param?.maxValue,
                  mergeInGraph: param?.mergeInGraph,
                  showAverage: param?.showAverage,
                  gaugeMinValue: param?.gaugeMinValue,
                  gaugeMaxValue: param?.gaugeMaxValue,
                };
              }),
            };
          }
        ),
      };
      const events = map(
        state.deviceParametersByMode,
        (modeDetails, modeId) => {
          const newTime = sub(new Date(), { minutes: modeId });
          const newTimeStamp = formatToInvenseTimeNative(newTime);

          return {
            modeId,
            timestamp: newTimeStamp,
            parameters: map(modeDetails.parameters, (param, parameterId) => {
              return {
                key: param.keyCode,
                value: param?.value,
              };
            }),
          };
        }
      );
      state.finalConfig = finalConfig;
      state.initEvents = events;
      state.currentStep = CONFIRMATION;
      state.steps.push(CONFIRMATION);
    },
  },
});

export const createDevice = (projectId, attributes, events) => {
  return (dispatch) => {
    const options = {
      mockEnabled: false,
      mockResponse: createDeviceV2MockResponse,
    };

    makePostRequest(
      `${config.INVENSE_API_URL_CORS}/v2/project/${projectId}/device`,
      null,
      attributes,
      options
    ).then((response) => {
      // const deviceId = response.data.deviceId
      // forEach(events, event => {
      //   makePostRequest(`${config.INVENSE_API_URL_CORS}/project/${projectId}/device/${deviceId}/event`, null, event, options)
      // })
      // dispatch(recieveDeviceData(response.data));
    });
  };
};

export const {
  setReloadTime,
  updateName,
  updateModel,
  updateModes,
  updateType,
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
  updateDeviceParameterMinValue,
  updateDeviceParameterMaxValue,
  updateDeviceParameterGaugeMinValue,
  updateDeviceParameterGaugeMaxValue,
  updateDeviceParameterMergeInGraph,
  updateDeviceParameterShowAverage,
  updateDeviceParameterActive,
  addNewDeviceParameter,
  removeDeviceParameter,
  submitDeviceParametersByMode,
  reset,
} = addDeviceWizardSlice.actions;

export default addDeviceWizardSlice.reducer;
