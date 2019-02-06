import { Scalar, testArraysAreClose, to } from '@musical-patterns/utilities'
import { buildMoeomScalars } from '../../../src/indexForTest'

describe('scalars', () => {
    it('divides the window (octave) into equal divisions', () => {
        testArraysAreClose(
            buildMoeomScalars(to.Cardinal(12)),
            [
                1,
                1.05946309436,
                1.12246204831,
                1.189207115,
                1.25992104989,
                1.33483985417,
                1.41421356237,
                1.49830707688,
                1.58740105197,
                1.68179283051,
                1.78179743628,
                1.88774862536,
            ].map(to.Scalar),
        )

        testArraysAreClose(
            buildMoeomScalars(to.Cardinal(5)),
            [
                1,
                1.148698355,
                1.31950791077,
                1.51571656651,
                1.74110112659,
            ].map(to.Scalar),
        )
    })
})
