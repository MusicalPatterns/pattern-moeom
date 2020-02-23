import { InputType, Spec, standardConfigurations, standardInitialSpecs, StandardSpec } from '@musical-patterns/spec'
import {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_FLIPPED,
    MOEOM_INITIAL_HZ_PHYSICALIZATION,
    MOEOM_INITIAL_MS_PHYSICALIZATION,
} from './constants'
import { MoeomConfigurations, MoeomSpecs } from './types'

const initialSpecs: MoeomSpecs = {
    ...standardInitialSpecs,
    equalDivision: MOEOM_INITIAL_EQUAL_DIVISION,
    flipped: MOEOM_INITIAL_FLIPPED,
    [ StandardSpec.MS_PHYSICALIZATION ]: MOEOM_INITIAL_MS_PHYSICALIZATION,
    [ StandardSpec.HZ_PHYSICALIZATION ]: MOEOM_INITIAL_HZ_PHYSICALIZATION,
}

const configurations: MoeomConfigurations = {
    ...standardConfigurations,
    equalDivision: {
        constraint: {
            integer: true,
            min: 1,
            required: true,
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
