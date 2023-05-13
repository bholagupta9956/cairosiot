import { validate } from "validate.js";

import { consolidateErrors } from '../helpers/utils';

const constraints = {
    name: {
        presence: true
    },
    installation_date: {
        presence: true
    },
    lat: {
        presence: true,
        numericality: {
            lessThan: 90,
            greaterThan: -90
        }
    },
    lng: {
        presence: true,
        numericality: {
            lessThan: 180,
            greaterThan: -180
        }
    }
};

const validateAddProjectForm = (formValues) => {
    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
};

export default validateAddProjectForm;
