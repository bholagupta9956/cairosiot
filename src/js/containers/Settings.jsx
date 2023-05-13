import React, { useReducer  } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { isEmpty } from 'lodash';

import DashboardLayout from '../components/layout/DashboardLayout.jsx';

import Card from '../components/standard/Card.jsx';
import Input from '../components/standard/Input.jsx';
import Button from '../components/standard/Button.jsx';

import { setReloadTime } from '../../slices/settingsSlice';

import validateSettingsForm from '../../validators/SettingsForm';

// const initialState = {
//     reloadTime: '300000',
//     errors: null
// };

function reducer(state, action) {
  switch (action.type) {
    case 'update-reloadtime':
        return { ...state, reloadTime: action.value };
    case 'update-error':
        return { ...state, errors: action.value };
    default:
      throw new Error();
  }
}

const Settings = props => {
    const dispatch = useDispatch()
    const settings = useSelector((state) => state.settings);

    const initialState = {
        ...settings,
        errors: null
    };

    const [state, reducerDispatch] = useReducer(reducer, initialState);

    const handleSaveSettings = e => {
        e.preventDefault();
        const errors = validateSettingsForm(state.reloadTime);
        if (isEmpty(errors)) {
            reducerDispatch({ type: 'update-error', value: null })
            dispatch(setReloadTime(state.reloadTime))
        }

        reducerDispatch({ type: 'update-error', value: errors })
    };

    return (
        <DashboardLayout>
            <div className="my-4">
                <Card>
                    <h1 className="text-heading text-dark font-bold">Settings</h1>
                    <h2 className="text-cardHeading text-dark-50">Edit your setting here</h2>
                </Card>
            </div>
            <form onSubmit={handleSaveSettings}>
                <div className="my-4">
                    <Card>
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-cardHeading text-dark font-bold">Reload Time</h2>
                                <div className="">
                                    Refresh the data after milliseconds
                                </div>
                            </div>
                            <div className="">
                                <Input
                                    type="number"
                                    textAlign="right"
                                    error={state?.errors?.reloadTime}
                                    value={state.reloadTime}
                                    onChange={e => reducerDispatch({ type: 'update-reloadtime', value: e.target.value })}
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <Button label="Save Settings" type="submit" />
            </form>
        </DashboardLayout>
    );
}

export default Settings;