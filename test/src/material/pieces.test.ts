import { PitchOnly } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { moeomPiece } from '../../../src/indexForTest'

describe('contour pieces', () => {
    it('a piece, given a step, will generate a three-element block, starting at zero, each next element up a step from the previous', () => {
        expect(moeomPiece(to.Cardinal(0)))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 0 ], [ 0 ] ]))
        expect(moeomPiece(to.Cardinal(1)))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 1 ], [ 2 ] ]))
        expect(moeomPiece(to.Cardinal(2)))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 2 ], [ 4 ] ]))
        expect(moeomPiece(to.Cardinal(3)))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 3 ], [ 6 ] ]))
    })
})
