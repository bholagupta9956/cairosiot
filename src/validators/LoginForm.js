import { validate } from "validate.js";

import { consolidateErrors } from '../helpers/utils';

const constraints = {
    username: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 8
        }
    }
}

const validateForm = (formValues) => {
    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
}

export default validateForm;