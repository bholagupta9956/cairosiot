import { validate } from "validate.js";

import { consolidateErrors } from '../helpers/utils';

const constraints = {
    reloadTime: {
        presence: true,
        numericality: {
            onlyInteger: true,
            greaterThan: 100
        }
    }
};

const validateSettingsForm = (reloadTime) => {
    const formValues = {
        reloadTime
    };

    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
};

export default validateSettingsForm;