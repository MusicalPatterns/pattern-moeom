// tslint:disable no-magic-numbers

import { Denominator, Hz, Ms, Scalar, to } from '@musical-patterns/utilities'

const MOEOM_INITIAL_EQUAL_DIVISION: Denominator = to.Denominator(24)
const MOEOM_INITIAL_BASE_DURATION: Scalar<Ms> = to.Scalar(to.Ms(240))
const MOEOM_INITIAL_BASE_FREQUENCY: Scalar<Hz> = to.Scalar(to.Hz(240))

export {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_BASE_DURATION,
    MOEOM_INITIAL_BASE_FREQUENCY,
}
