// tslint:disable no-magic-numbers

import { Denominator, Hz, Ms, to } from '@musical-patterns/utilities'

const MOEOM_INITIAL_EQUAL_DIVISION: Denominator = to.Denominator(24)
const MOEOM_INITIAL_BASE_DURATION: Ms = to.Ms(240)
const MOEOM_INITIAL_BASE_FREQUENCY: Hz = to.Hz(240)

export {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_BASE_DURATION,
    MOEOM_INITIAL_BASE_FREQUENCY,
}
