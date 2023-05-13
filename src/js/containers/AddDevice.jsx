import React, { useReducer  } from "react";
import {
    useParams,
    useHistory,
    generatePath
} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import Card from '../components/standard/Card.jsx';
import Input from '../components/standard/Input.jsx';
import Button from '../components/standard/Button.jsx';
import { addDevice } from '../../slices/devicesSlice.js';
import validateAddDeviceForm from '../../validators/AddDeviceForm';

function reducer(state, action) {
  switch (action.type) {
    case 'update-name':
        return { ...state, name: action.value };

    case 'update-model':
        return { ...state, model: action.value };

    case 'update-device-type':
        return { ...state, deviceType: action.value };

    case 'update-installation-date':
        return { ...state, installation_date: action.value };
    
    case 'update-lat':
        return { ...state, lat: action.value };

    case 'update-lng':
        return { ...state, lng: action.value };
    
    case 'update-error':
        return { ...state, errors: action.value };
    default:
      throw new Error();
  }
}

const AddDevice = props => {
    
    const dispatch = useDispatch()
    const history = useHistory();
    const { projectId } = useParams()

    // const settings = useSelector((state) => state.settings);

    const initialState = {
        deviceType: "point_machine",
        errors: null
    };

    const [state, reducerDispatch] = useReducer(reducer, initialState);

    const handleAddDevice = e => {
        e.preventDefault();
        const errors = validateAddDeviceForm(state);
        if (!isEmpty(errors)) {
            reducerDispatch({ type: 'update-error', value: errors });
            return;
        }

        reducerDispatch({ type: 'update-error', value: null })
        delete state.errors
        dispatch(addDevice(projectId, state))
        const path = generatePath("/:projectId", { projectId });
        history.push(path);
        return;
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleAddDevice}>
                <div className="my-4">
                    <Card>
                        <h1 className="text-heading text-dark font-bold">Add New Device</h1>
                        <h2 className="text-cardHeading text-dark-50">Basic Details</h2>
                        <div className="my-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Input
                                    label="Equipment Name"
                                    error={state?.errors?.name}
                                    value={state.name}
                                    onChange={e => reducerDispatch({ type: 'update-name', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Equipment Model"
                                    error={state?.errors?.model}
                                    value={state.model}
                                    onChange={e => reducerDispatch({ type: 'update-model', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block font-bold">Equipment Type</label>
                                <select
                                    value={state.deviceType}
                                    className="block px-3 py-2 w-full bg-background rounded outline-none"
                                    onChange={e => reducerDispatch({ type: 'update-device-type', value: e.target.value })}
                                >
                                    <option value="point_machine">Point Machine</option>
                                    <option value="dc_track">DC Track</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <Input
                                    label="Latitude"
                                    error={state?.errors?.lat}
                                    value={state.lat}
                                    onChange={e => reducerDispatch({ type: 'update-lat', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1">
                                <Input
                                    label="Longitude"
                                    error={state?.errors?.lng}
                                    value={state.lng}
                                    onChange={e => reducerDispatch({ type: 'update-lng', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-2">
                                <Input
                                    label="Installation Date"
                                    error={state?.errors?.installation_date}
                                    value={state.installation_date}
                                    onChange={e => reducerDispatch({ type: 'update-installation-date', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1 mt-2">
                                <Button label="Create Equipment" type="submit" />
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </DashboardLayout>
    );
}

export default AddDevice;