// tslint:disable no-magic-numbers

import { as, Delta, Denominator, Duration, Hz, Ms, Pitch } from '@musical-patterns/utilities'

const MOEOM_INITIAL_EQUAL_DIVISION: Denominator = as.Denominator(24)
const MOEOM_INITIAL_FLIPPED: boolean = false
const MOEOM_INITIAL_BASIS_DURATION: Duration = as.Delta<Ms>(240)
const MOEOM_INITIAL_BASIS_FREQUENCY: Pitch = as.Point<Hz>(240)

export {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_FLIPPED,
    MOEOM_INITIAL_BASIS_DURATION,
    MOEOM_INITIAL_BASIS_FREQUENCY,
}
