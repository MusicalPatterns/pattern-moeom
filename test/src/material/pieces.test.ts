import { PitchOnly } from '@musical-patterns/pattern'
import { to } from '@musical-patterns/utilities'
import { moeomPiece } from '../../../src/indexForTest'

describe('contour pieces', () => {
    it('a piece, given a step, will compute a three-element block, starting at zero, each next element up a step from the previous', () => {
        expect(moeomPiece({ equalDivisionStep: to.Numerator(0), flipped: false }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 0 ], [ 0 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(1), flipped: false }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 1 ], [ 2 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(2), flipped: false }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 2 ], [ 4 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(3), flipped: false }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ 3 ], [ 6 ] ]))
    })

    it('when flipped, will make everything negative', () => {
        expect(moeomPiece({ equalDivisionStep: to.Numerator(0), flipped: true }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ -0 ], [ -0 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(1), flipped: true }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ -1 ], [ -2 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(2), flipped: true }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ -2 ], [ -4 ] ]))
        expect(moeomPiece({ equalDivisionStep: to.Numerator(3), flipped: true }))
            .toEqual(to.ContourPiece<PitchOnly>([ [ 0 ], [ -3 ], [ -6 ] ]))
    })
})
