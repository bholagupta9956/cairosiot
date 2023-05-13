import { createSlice } from "@reduxjs/toolkit";
import {
  range,
  map,
  mapValues,
  reduce,
  size,
  isEmpty,
  filter,
  orderBy,
} from "lodash";

import { makePutRequest } from "../middleware/axios";

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
import validateParameterDetailsV2 from "../validators/AddDeviceWizard/ParameterDetailsV2";

const { sub } = require("date-fns");

import { TIMESTAMP } from "../js/constants/parameterTypes";

const initialState = {
  basicDetails: {
    name: null,
    model: null,
    type: "point_machine",
    lat: null,
    lng: null,
    installationDate: null,
    numberOfModes: 1,
    maintenanceDate: null,
    maintenancePeriod: null,
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
          key: null,
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

export const editDeviceSlice = createSlice({
  name: "editDeviceSlice",
  initialState,
  reducers: {
    reset: () => initialState,
    initialize: (state, action) => {
      state.basicDetails = {
        name: action.payload.name,
        model: action.payload.model,
        numberOfModes: size(action.payload.prametersByModeId),
        type: action.payload.deviceType,
        lat: action.payload.lat,
        lng: action.payload.lng,
        installationDate: action.payload.installation_date,
        maintenanceDate: action.payload.maintenanceDate,
        maintenancePeriod: action.payload.maintenancePeriod,
        errors: null,
      };
      state.deviceParametersByMode = orderBy(
        action.payload.prametersByModeId,
        "modeId"
      );
    },
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
    updateDeviceBasicDetailsErrors: (state, action) => {
      state.basicDetails.errors = action.payload;
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
                key: "001",
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
      state.deviceParametersByMode[modeId].parameters[parameterId].key = value;
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
    addNewDeviceParameter: (state, action) => {
      const { modeId, parameterId } = action.payload;
      state.deviceParametersByMode[modeId].parameters[parameterId] = {
        type: "text",
        key: null,
        value: null,
        name: null,
      };
    },
    removeDeviceParameter: (state, action) => {
      const { modeId, parameterId } = action.payload;
      state.deviceParametersByMode[modeId].parameters = filter(
        state.deviceParametersByMode[modeId].parameters,
        (_i, key) => key != parameterId
      );
    },
    updateDeviceParametersByMode: (state, action) => {
      state.deviceParametersByMode = action.payload;
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
              const errors = validateParameterDetailsV2(param);

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
        deviceModes: map(
          state.deviceParametersByMode,
          (modeDetails, modeId) => {
            return {
              modeId: modeId,
              modeName: modeDetails.modeName,
              modeValue: modeDetails.modeValue,
              updatedParameters: map(
                modeDetails.parameters,
                (param, parameterId) => {
                  return {
                    type: param.type,
                    key: param.key,
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
                }
              ),
            };
          }
        ),
      };

      state.finalConfig = finalConfig;
    },
  },
});

export const updateDeviceBasicDetails = (
  projectId,
  deviceId,
  attributes,
  callback = () => {}
) => {
  return (dispatch) => {
    const errors = validateBasicDetails(attributes);
    dispatch(updateDeviceBasicDetailsErrors(errors));

    if (!isEmpty(errors)) {
      return;
    }

    const options = {
      mockEnabled: false,
      mockResponse: createDeviceV2MockResponse,
    };

    const basicDetails = {
      ...attributes,
      deviceType: attributes.type,
      installation_date: attributes.installationDate,
      isDeprecated: false,
    };

    makePutRequest(
      `${config.INVENSE_API_URL_CORS}/project/${projectId}/device/${deviceId}`,
      null,
      basicDetails,
      options
    ).then((response) => {
      callback(response);
    });
  };
};

export const updateDeviceParameters = (
  projectId,
  deviceId,
  deviceParametersByMode,
  callback = () => {}
) => {
  return (dispatch) => {
    let hasError = false;
    deviceParametersByMode = mapValues(
      deviceParametersByMode,
      (modeDetails, modeId) => {
        const errors = validateModeDetails(modeDetails);

        if (!isEmpty(errors)) {
          hasError = true;
        }

        const parameters = mapValues(
          modeDetails.parameters,
          (param, parameterId) => {
            const errors = validateParameterDetailsV2({
              ...param,
              key: param.key,
            });

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
      dispatch(updateDeviceParametersByMode(deviceParametersByMode));
      return;
    }

    const finalConfig = map(deviceParametersByMode, (modeDetails, modeId) => {
      return {
        modeId: modeId,
        modeName: modeDetails.modeName,
        modeValue: modeDetails.modeValue,
        updatedParameters: map(modeDetails.parameters, (param, parameterId) => {
          return {
            type: param.type,
            key: param.key,
            name: param.name,
            unit: param?.unit,
            value: param?.value,
            minValue: param?.minValue,
            maxValue: param?.maxValue,
            mergeInGraph: param?.mergeInGraph,
            showAverage: param?.showAverage,
            gaugeMinValue: param?.gaugeMinValue,
            gaugeMaxValue: param?.gaugeMaxValue,
            active: param?.active ? true : false,
          };
        }),
      };
    });

    const options = {
      mockEnabled: false,
      mockResponse: createDeviceV2MockResponse,
    };

    makePutRequest(
      `${config.INVENSE_API_URL_CORS}/project/${projectId}/device/${deviceId}/parameters`,
      null,
      finalConfig,
      options
    ).then((response) => {
      callback(response);
    });
  };
};


export const {
  setReloadTime,
  initialize,
  updateName,
  updateModel,
  updateModes,
  updateType,
  updateLat,
  updateLng,
  updateInstallationDate,
  updateDeviceBasicDetailsErrors,
  addDeviceBasicDetails,
  updateDeviceModeName,
  updateDeviceModeValue,
  updateMaintenanceDate,
  updateMaintenancePeriod,
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
  updateDeviceParametersByMode,
  reset,
} = editDeviceSlice.actions;

export default editDeviceSlice.reducer;
