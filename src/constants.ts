// tslint:disable no-magic-numbers

import { Cardinal, Frequency, Milliseconds, to } from '@musical-patterns/utilities'

const MOEOM_INITIAL_EQUAL_DIVISION: Cardinal = to.Cardinal(24)
const MOEOM_INITIAL_BASE_DURATION: Milliseconds = to.Milliseconds(240)
const MOEOM_INITIAL_BASE_FREQUENCY: Frequency = to.Frequency(240)

export {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_BASE_DURATION,
    MOEOM_INITIAL_BASE_FREQUENCY,
}
