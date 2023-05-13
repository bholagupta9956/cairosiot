import { validate } from "validate.js";

import { consolidateErrors } from '../helpers/utils';

const constraints = {
    name: {
        presence: true
    }
};

const validateAddCompanyForm = (formValues) => {
    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
};

export default validateAddCompanyForm;
