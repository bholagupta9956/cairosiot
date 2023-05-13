import { validate } from "validate.js";

import { consolidateErrors } from '../helpers/utils';

const constraints = {
    name: {
        presence: true
    },
    model: {
        presence: true
    },
    deviceType: {
        presence: true
    },
    installation_date: {
        presence: true
    },
    lat: {
        presence: true
    },
    lng: {
        presence: true
    }
};

const validateAddDeviceForm = (formValues) => {
    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
};

export default validateAddDeviceForm;
