// tslint:disable no-magic-numbers

import { as, Denominator, Duration, musicalAs, Tone } from '@musical-patterns/utilities'

const MOEOM_INITIAL_EQUAL_DIVISION: Denominator = as.Denominator(24)
const MOEOM_INITIAL_FLIPPED: boolean = false
const MOEOM_INITIAL_MS_PHYSICALIZATION: Duration = musicalAs.Duration(240)
const MOEOM_INITIAL_HZ_PHYSICALIZATION: Tone = musicalAs.Tone(240)

export {
    MOEOM_INITIAL_EQUAL_DIVISION,
    MOEOM_INITIAL_FLIPPED,
    MOEOM_INITIAL_MS_PHYSICALIZATION,
    MOEOM_INITIAL_HZ_PHYSICALIZATION,
}
