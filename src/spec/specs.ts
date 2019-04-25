import { InputType, Spec, standardConfigurations, standardInitialSpecs, StandardSpec } from '@musical-patterns/spec'
import {
    MOEOM_INITIAL_BASIS_DURATION,
    MOEOM_INITIAL_BASIS_FREQUENCY,
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_FLIPPED,
} from './constants'
import { MoeomConfigurations, MoeomSpecs } from './types'

const initialSpecs: MoeomSpecs = {
    ...standardInitialSpecs,
    equalDivision: MOEOM_INITIAL_EQUAL_DIVISION,
    flipped: MOEOM_INITIAL_FLIPPED,
    [ StandardSpec.BASIS_DURATION ]: MOEOM_INITIAL_BASIS_DURATION,
    [ StandardSpec.BASIS_FREQUENCY ]: MOEOM_INITIAL_BASIS_FREQUENCY,
}

const configurations: MoeomConfigurations = {
    ...standardConfigurations,
    equalDivision: {
        constraint: {
            integer: true,
            min: 1,
        },
        inputType: InputType.RANGED,
    },
    flipped: {
        inputType: InputType.TOGGLED,
    },
}

const spec: Spec<MoeomSpecs> = {
    configurations,
    initialSpecs,
}

export {
    spec,
}
