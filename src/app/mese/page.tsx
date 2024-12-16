'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */

import dynamic from 'next/dynamic';
import { NumberInput, Box } from '@mantine/core';
import { useState } from 'react';

const Canvas = dynamic(() => import('./Canvas'), { ssr: false });

export default function HomePage() {
    const [numTables, setNumTables] = useState(5);
    return (
        <Box p="lg">
            <NumberInput
                label="Number of Tables"
                value={numTables}
                w="200px"
                onChange={(value) => setNumTables(value as number)}
                min={1}
                max={50}
                step={1}
                placeholder="Enter number of tables"
            />
            <Canvas numTables={numTables} />
        </Box>
    );
}
