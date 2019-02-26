// tslint:disable:no-magic-numbers

import { Amplitude, ONE_FOURTH, Scalar, to } from '@musical-patterns/utilities'

const REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD: Scalar<Amplitude> = to.Amplitude(ONE_FOURTH)

export {
    REDUCE_GAIN_BECAUSE_SAMPLES_ARE_SUPER_LOUD,
}
