'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
    headings: {
        fontFamily: '"Lavishly Yours", cursive',
        fontWeight: '400'
    },
    fontFamily: "'Arapey', 'serif'",
    colors: {
        blue: [
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB',
            '#91A7BB'
        ],
        offwhite: [
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9',
            '#FFFAF9'
        ],
        brown: [
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057',
            '#666057'
        ],
        pink: [
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC',
            '#E5AFAC'
        ]
    },
    primaryColor: 'blue',
    components: {
        InputWrapper: {
            styles: () => ({
                label: {
                    fontSize: '1.25rem',
                    color: '#666057'
                }
            })
        },
        Input: {
            styles: () => ({
                input: {
                    borderRadius: '8px'
                }
            })
        },
        Radio: {
            styles: () => ({
                // radio: {
                //     '& input': {
                //         backgroundColor: '#91A7BB',
                //         borderColor: '#91A7BB'
                //     },
                //     '& input:checked': {
                //         backgroundColor: 'transparent',
                //         borderColor: '#91A7BB'
                //     }
                // },
                input: { backgroundColor: '#666057' },
                label: {
                    fontSize: '1.25rem',
                    color: '#666057'
                }
            })
        }
    }
});
