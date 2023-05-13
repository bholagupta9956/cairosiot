import React, { useReducer } from "react";
import {
    useHistory,
    generatePath
} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { isEmpty } from 'lodash';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/standard/Card.jsx';
import Input from '../components/standard/Input.jsx';
import Button from '../components/standard/Button.jsx';
import { addNewCompany } from '../../slices/companiesSlice';
import validateAddCompanyForm from '../../validators/AddCompanyForm';


function reducer(state, action) {
  switch (action.type) {
    case 'update-name':
        return { ...state, name: action.value };
    
    case 'update-error':
        return { ...state, errors: action.value };

    default:
      throw new Error();
  }
}

const initialState = {
    errors: null
};

const AddCompany = props => {
    const { userDetails } = props
    const dispatch = useDispatch()
    const history = useHistory();

    const [state, reducerDispatch] = useReducer(reducer, initialState);

    const handleAddProject = async e => {
        e.preventDefault();
        const errors = validateAddCompanyForm(state);
        
        if (!isEmpty(errors)) {
            reducerDispatch({ type: 'update-error', value: errors });
            return;
        }

        reducerDispatch({ type: 'update-error', value: null })
        delete state.errors

        dispatch(addNewCompany(state))
        const path = generatePath("/");
        history.push(path);
        return;
    };

    return (
        <DashboardLayout>
            <form onSubmit={handleAddProject}>
                <div className="my-4">
                    <Card>
                        <h1 className="text-heading text-dark font-bold">Add New Company</h1>
                        <h2 className="text-cardHeading text-dark-50">Basic Details</h2>
                        <div className="my-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <Input
                                    label="Company Name"
                                    error={state?.errors?.name}
                                    value={state.name}
                                    onChange={e => reducerDispatch({ type: 'update-name', value: e.target.value })}
                                />
                            </div>
                            <div className="col-span-1 mt-2">
                                <Button label="Create Company" type="submit" />
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </DashboardLayout>
    );
}

export default AddCompany;