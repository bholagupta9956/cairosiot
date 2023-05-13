import { validate } from "validate.js"

import { consolidateErrors } from '../../helpers/utils'

const constraints = {
    modeName: {
        presence: true
    },
    modeValue: {
        presence: true
    }
}

const validateForm = (formValues) => {
    const errors = validate(formValues, constraints)
    const consolidatedErrors = consolidateErrors(errors)

    return consolidatedErrors
}

export default validateForm
