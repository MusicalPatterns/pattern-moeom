import {
    SpecDataFor,
    SpecPropertyType,
    standardInitialSpec,
    standardSpecAttributes,
    StandardSpecProperties,
} from '@musical-patterns/pattern'
import { MOEOM_INITIAL_BASE_DURATION, MOEOM_INITIAL_BASE_FREQUENCY, MOEOM_INITIAL_EQUAL_DIVISION } from './constants'
import { MoeomSpec, MoeomSpecAttributes } from './types'

const initial: MoeomSpec = {
    ...standardInitialSpec,
    equalDivision: MOEOM_INITIAL_EQUAL_DIVISION,
    [ StandardSpecProperties.BASE_DURATION ]: MOEOM_INITIAL_BASE_DURATION,
    [ StandardSpecProperties.BASE_FREQUENCY ]: MOEOM_INITIAL_BASE_FREQUENCY,
}

const attributes: MoeomSpecAttributes = {
    ...standardSpecAttributes,
    equalDivision: {
        constraint: {
            integer: true,
            min: 1,
        },
        specPropertyType: SpecPropertyType.RANGED,
    },
}

const specData: SpecDataFor<MoeomSpec> = {
    attributes,
    initial,
}

export {
    specData,
}
