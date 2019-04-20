import { PitchOnly } from '@musical-patterns/material'
import { as } from '@musical-patterns/utilities'
import { moeomPiece } from '../../../src/indexForTest'

describe('contour pieces', () => {
    it('a piece, given a step, will compute a three-element block, starting at zero, each next element up a step from the previous', () => {
        expect(moeomPiece({ equalDivisionStep: as.Numerator(0), flipped: false }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ 0 ], [ 0 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(1), flipped: false }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ 1 ], [ 2 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(2), flipped: false }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ 2 ], [ 4 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(3), flipped: false }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ 3 ], [ 6 ] ]))
    })

    it('when flipped, will make everything negative', () => {
        expect(moeomPiece({ equalDivisionStep: as.Numerator(0), flipped: true }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ -0 ], [ -0 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(1), flipped: true }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ -1 ], [ -2 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(2), flipped: true }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ -2 ], [ -4 ] ]))
        expect(moeomPiece({ equalDivisionStep: as.Numerator(3), flipped: true }))
            .toEqual(as.ContourPiece<PitchOnly>([ [ 0 ], [ -3 ], [ -6 ] ]))
    })
})
