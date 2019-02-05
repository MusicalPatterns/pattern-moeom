// tslint:disable no-magic-numbers

import { Count, Frequency, Milliseconds, to } from '@musical-patterns/utilities'

const MOEOM_INITIAL_STEPS: Count = to.Count(24)
const MOEOM_INITIAL_BASE_DURATION: Milliseconds = to.Milliseconds(240)
const MOEOM_INITIAL_BASE_FREQUENCY: Frequency = to.Frequency(240)

export {
    MOEOM_INITIAL_STEPS,
    MOEOM_INITIAL_BASE_DURATION,
    MOEOM_INITIAL_BASE_FREQUENCY,
}
