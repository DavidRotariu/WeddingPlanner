/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from 'next';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../../theme';

export const metadata: Metadata = {
    title: 'Invitatie',
    description: 'Invitatie la'
};

import '@mantine/core/styles.css';

import React from 'react';

export default function RootLayout({ children }: { children: any }) {
    return (
        <html lang="en" {...mantineHtmlProps}>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    );
}