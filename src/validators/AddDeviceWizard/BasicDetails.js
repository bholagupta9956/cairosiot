import { validate } from "validate.js";

import { consolidateErrors } from '../../helpers/utils';

const constraints = {
    name: {
        presence: true
    },
    model: {
        presence: true
    },
    type: {
        presence: true
    },
    numberOfModes: {
        presence: true,
        numericality: {
            lessThan: 10,
            greaterThan: 0
        }
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
    },
    installationDate: {
        presence: true
    },
    maintenanceDate: {
        presence: true
    },
    maintenancePeriod: {
        presence: true
    }
};

const validateForm = (formValues) => {
    const errors = validate(formValues, constraints);
    const consolidatedErrors = consolidateErrors(errors);

    return consolidatedErrors;
};

export default validateForm;
