import React from "react";
import { times, map, last, keys } from "lodash";

import Input from "../standard/Input.jsx";
import Button from "../standard/Button.jsx";

import {
  TEXT_BOX,
  GUAGE,
  LINE_GRAPH,
  TIMESTAMP,
} from "../../constants/parameterTypes";

const DeviceParameters = (props) => {
  const {
    isEditflow,
    updateDeviceModeName,
    updateDeviceModeValue,
    deviceParametersByMode,
    updateDeviceParameterType,
    updateDeviceParameterKeyCode,
    updateDeviceParameterName,
    updateDeviceParameterUnit,
    updateDeviceParameterValue,
    addNewDeviceParameter,
    removeDeviceParameter,
    updateDeviceParameterMinValue,
    updateDeviceParameterMaxValue,
    updateDeviceParameterGaugeMinValue,
    updateDeviceParameterGaugeMaxValue,
    nextStepLabel,
    updateDeviceParameterMergeInGraph,
    updateDeviceParameterShowAverage,
    updateDeviceParameterActive,
    onSubmit,
  } = props;

  return (
    <form className="my-4" onSubmit={onSubmit}>
      <h1 className="text-heading text-dark font-bold">
        {isEditflow ? "Edit Device Parameter" : "Add Device Parameter"}
      </h1>
      {map(deviceParametersByMode, (deviceMode, index) => {
        const lastParameter = last(keys(deviceMode.parameters)) || -1;
        return (
          <>
            <h2 className="text-cardHeading text-dark-50">
              Mode : {deviceMode.modeId}
            </h2>
            <div className="my-4">
              <Input
                label="Mode Name"
                value={deviceMode.modeName}
                error={deviceMode?.errors?.modeName}
                onChange={(e) =>
                  updateDeviceModeName({ modeId: index, value: e.target.value })
                }
              />
            </div>
            <div className="my-4">
              <Input
                label="Mode Value"
                value={deviceMode.modeValue}
                error={deviceMode?.errors?.modeValue}
                onChange={(e) =>
                  updateDeviceModeValue({
                    modeId: index,
                    value: e.target.value,
                  })
                }
              />
            </div>
            {map(deviceMode.parameters, (deviceParameter, parameterIndex) => {
              return (
                <div className="my-4 grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <label className="block font-bold">Type</label>
                    <select
                      value={deviceParameter.type}
                      className="block px-3 py-2 w-full bg-background rounded outline-none"
                      onChange={(e) =>
                        updateDeviceParameterType({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    >
                      <option value={TIMESTAMP}>Timestamp</option>
                      <option value={TEXT_BOX}>Text</option>
                      <option value={LINE_GRAPH}>Line Graph</option>
                      <option value={GUAGE}>Gauge</option>
                    </select>
                  </div>
                  <div className="col-span-1 mt-6">
                    <Button
                      label="Remove"
                      onClick={() =>
                        removeDeviceParameter({
                          modeId: index,
                          parameterId: parameterIndex,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Key"
                      placeholder="(ex. 001)"
                      value={
                        isEditflow
                          ? deviceParameter.key
                          : deviceParameter.keyCode
                      }
                      error={
                        isEditflow
                          ? deviceParameter?.errors?.key
                          : deviceParameter?.errors?.keyCode
                      }
                      onChange={(e) =>
                        updateDeviceParameterKeyCode({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Name"
                      placeholder="(ex. Param1)"
                      value={deviceParameter.name}
                      error={deviceParameter?.errors?.name}
                      onChange={(e) =>
                        updateDeviceParameterName({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Unit"
                      placeholder="(ex. V, mA)"
                      value={deviceParameter.unit}
                      error={deviceParameter?.errors?.unit}
                      onChange={(e) =>
                        updateDeviceParameterUnit({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Init Value"
                      placeholder="(ex. 1, 10, 100)"
                      value={deviceParameter.value}
                      error={deviceParameter?.errors?.value}
                      onChange={(e) =>
                        updateDeviceParameterValue({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Min Value"
                      placeholder="(ex. 1, 10, 100)"
                      value={deviceParameter.minValue}
                      error={deviceParameter?.errors?.minValue}
                      onChange={(e) =>
                        updateDeviceParameterMinValue({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    <Input
                      label="Max Value"
                      placeholder="(ex. 1, 10, 100)"
                      value={deviceParameter.maxValue}
                      error={deviceParameter?.errors?.maxValue}
                      onChange={(e) =>
                        updateDeviceParameterMaxValue({
                          modeId: index,
                          parameterId: parameterIndex,
                          value: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-span-1">
                    {deviceParameter.mergeInGraph == "true" ? (
                      <Input
                        type="checkbox"
                        label="Merge in Graph"
                        checked={deviceParameter.mergeInGraph}
                        error={deviceParameter?.errors?.mergeInGraph}
                        onChange={(e) =>
                          updateDeviceParameterMergeInGraph({
                            modeId: index,
                            parameterId: parameterIndex,
                            value: "" + e.target.checked,
                          })
                        }
                      />
                    ) : (
                      <Input
                        type="checkbox"
                        label="Merge in Graph"
                        error={deviceParameter?.errors?.mergeInGraph}
                        onChange={(e) =>
                          updateDeviceParameterMergeInGraph({
                            modeId: index,
                            parameterId: parameterIndex,
                            value: "" + e.target.checked,
                          })
                        }
                      />
                    )}
                  </div>
                  <div className="col-span-1">
                    {deviceParameter.showAverage == "true" ? (
                      <Input
                        type="checkbox"
                        label="Show Average"
                        checked={deviceParameter.showAverage}
                        error={deviceParameter?.errors?.showAverage}
                        onChange={(e) =>
                          updateDeviceParameterShowAverage({
                            modeId: index,
                            parameterId: parameterIndex,
                            value: "" + e.target.checked,
                          })
                        }
                      />
                    ) : (
                      <Input
                        type="checkbox"
                        label="Show Average"
                        error={deviceParameter?.errors?.showAverage}
                        onChange={(e) =>
                          updateDeviceParameterShowAverage({
                            modeId: index,
                            parameterId: parameterIndex,
                            value: "" + e.target.checked,
                          })
                        }
                      />
                    )}
                  </div>
                  {deviceParameter.type == GUAGE && (
                    <>
                      <div className="col-span-1">
                        <Input
                          label="Gauge Min Value"
                          placeholder="(ex. 1, 10, 100)"
                          value={deviceParameter.gaugeMinValue}
                          error={deviceParameter?.errors?.gaugeMinValue}
                          onChange={(e) =>
                            updateDeviceParameterGaugeMinValue({
                              modeId: index,
                              parameterId: parameterIndex,
                              value: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          label="Gauge Max Value"
                          placeholder="(ex. 1, 10, 100)"
                          value={deviceParameter.gaugeMaxValue}
                          error={deviceParameter?.errors?.gaugeMaxValue}
                          onChange={(e) =>
                            updateDeviceParameterGaugeMaxValue({
                              modeId: index,
                              parameterId: parameterIndex,
                              value: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-span-1">
                        <Input
                          type="checkbox"
                          label="Active"
                          checked={deviceParameter.active}
                          error={deviceParameter?.errors?.active}
                          onChange={(e) => {
                            updateDeviceParameterActive({
                              modeId: index,
                              parameterId: parameterIndex,
                              value: e.target.checked,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
            <div className="my-4 grid grid-cols-2 gap-4">
              <div className="col-span-1 mt-2">
                <Button
                  label="+ Add a new parameter"
                  onClick={() =>
                    addNewDeviceParameter({
                      modeId: index,
                      parameterId: parseInt(lastParameter) + 1,
                    })
                  }
                />
              </div>
            </div>
          </>
        );
      })}
      {!isEditflow && (
        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 mt-2">
            <Button isOutline label="Previous" disabled />
          </div>
          <div className="col-span-1 mt-2">
            <Button label={nextStepLabel} type="submit" />
          </div>
        </div>
      )}
      {isEditflow && <Button label={nextStepLabel} type="submit" />}

      {/* <h2 className="text-cardHeading text-dark-50">Mode : {numberOfModes}</h2>
        <div className="my-4 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input
              label="Device Name"
              // error={errors?.name}
              // value={name}
              // onChange={e => updateName(e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Device Model"
              // error={errors?.model}
              // value={model}
              // onChange={e => updateModel(e.target.value)}
            />
          </div>
          <div className="col-span-1 mt-2">
            <Button isOutline label="Previous" disabled />
          </div>
          <div className="col-span-1 mt-2">
            <Button label={nextStepLabel} type="submit" />
          </div>
        </div> */}
    </form>
  );
};

export default DeviceParameters;
