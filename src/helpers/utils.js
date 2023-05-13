import {
    split,
    map,
    mapValues,
    keyBy,
    mergeWith,
    merge,
    values,
    isEmpty
} from 'lodash'
import Fuse from 'fuse.js'

const isMobile = () => {
    return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
}

const DTCparser = (DTCString = "CODE1:VALUE1|CODE2:VALUE2|CODE3:VALUE3|CODE4:VALUE4|CODE5:VALUE5") => {
    const DTCStingParsedArray = split(DTCString, "|");

    return map(DTCStingParsedArray, DTCElement => {
        const DTCElementParsed = split(DTCElement, ":");
        return {
            name: DTCElementParsed[0],
            value: DTCElementParsed[1]
        }
    });
};

const consolidateErrors = (errors) => mapValues(errors, (errorsArray) => errorsArray[0]);

const mergeParameters = (parametersByMode, latestDataByMode) => {
    if (isEmpty(latestDataByMode)) {
        return parametersByMode
    }


    const parametersByModeId = keyBy(parametersByMode, 'modeId');
    const latestDataByModeId = keyBy(latestDataByMode, 'modeId');
    return map(parametersByModeId, (paramDetails, modeId) => {
        if(isEmpty(latestDataByModeId[modeId])) {
            return paramDetails
        }

        const latestMode = latestDataByModeId[modeId]

        const oldResult = merge({}, paramDetails, latestMode)
        const mergedParameters = values(merge({}, keyBy(paramDetails.parameters, 'key'), keyBy(latestMode.parameters, 'key'))) // merge({}, paramDetails.parameters, latestDataByModeId[modeId])
        
        oldResult.parameters = mergedParameters
        return oldResult
    });
}

const searchFilter = (items, keys, query) => {
    if(isEmpty(query)) {
        return items;
    }

    const fuse = new Fuse(items, {
        keys,
        includeScore: false
    })

    return fuse.search(query).map(result => result.item)
}

export {
    isMobile,
    DTCparser,
    consolidateErrors,
    mergeParameters,
    searchFilter
}