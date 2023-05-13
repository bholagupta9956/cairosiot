import { validate } from "validate.js"

import { consolidateErrors } from '../../helpers/utils'

const constraints = {
    type: {
        presence: { allowEmpty: false }
    },
    keyCode: {
        presence: { allowEmpty: false }
    },
    name: {
        presence: { allowEmpty: false }
    },
    unit: {
        presence: false
    },
    value: {
        presence: true
    }
};

const validateForm = (formValues) => {
    const errors = validate(formValues, constraints)
    const consolidatedErrors = consolidateErrors(errors)

    return consolidatedErrors
};

export default validateForm
