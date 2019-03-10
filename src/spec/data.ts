import {
    Data,
    PropertyType,
    standardAttributes,
    standardInitialSpec,
    StandardProperty,
} from '@musical-patterns/pattern'
import {
    MOEOM_INITIAL_BASE_DURATION,
    MOEOM_INITIAL_BASE_FREQUENCY,
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_FLIPPED,
} from './constants'
import { MoeomAttributes, MoeomSpec } from './types'

const initial: MoeomSpec = {
    ...standardInitialSpec,
    equalDivision: MOEOM_INITIAL_EQUAL_DIVISION,
    flipped: MOEOM_INITIAL_FLIPPED,
    [ StandardProperty.BASE_DURATION ]: MOEOM_INITIAL_BASE_DURATION,
    [ StandardProperty.BASE_FREQUENCY ]: MOEOM_INITIAL_BASE_FREQUENCY,
}

const attributes: MoeomAttributes = {
    ...standardAttributes,
    equalDivision: {
        constraint: {
            integer: true,
            min: 1,
        },
        propertyType: PropertyType.RANGED,
    },
    flipped: {
        propertyType: PropertyType.TOGGLED,
    },
}

const data: Data<MoeomSpec> = {
    attributes,
    initial,
}

export {
    data,
}
