import { PitchOnly } from '@musical-patterns/material'
import { as } from '@musical-patterns/utilities'
import { moeomWhole } from '../../../src/indexForTest'

describe('contour wholes', (): void => {
    it('a whole sequences blocks [together], one block for each step', (): void => {
        expect(moeomWhole({ equalDivision: as.Denominator(12), flipped: false }))
            .toEqual(as.ContourWhole<PitchOnly>([
                [ 0 ], [ 0 ], [ 0 ],
                [ 0 ], [ 1 ], [ 2 ],
                [ 0 ], [ 2 ], [ 4 ],
                [ 0 ], [ 3 ], [ 6 ],
                [ 0 ], [ 4 ], [ 8 ],
                [ 0 ], [ 5 ], [ 10 ],
                [ 0 ], [ 6 ], [ 12 ],
                [ 0 ], [ 7 ], [ 14 ],
                [ 0 ], [ 8 ], [ 16 ],
                [ 0 ], [ 9 ], [ 18 ],
                [ 0 ], [ 10 ], [ 20 ],
                [ 0 ], [ 11 ], [ 22 ],
            ]))

        expect(moeomWhole({ equalDivision: as.Denominator(4), flipped: false }))
            .toEqual(as.ContourWhole<PitchOnly>([
                [ 0 ], [ 0 ], [ 0 ],
                [ 0 ], [ 1 ], [ 2 ],
                [ 0 ], [ 2 ], [ 4 ],
                [ 0 ], [ 3 ], [ 6 ],
            ]))
    })
})
