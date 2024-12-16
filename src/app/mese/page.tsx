'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */

import dynamic from 'next/dynamic';
import { NumberInput, Box, Flex, Title } from '@mantine/core';
import { useState } from 'react';

const Canvas = dynamic(() => import('./Canvas'), { ssr: false });

export default function HomePage() {
    const [numTables, setNumTables] = useState(5);
    return (
        <Flex h="100vh" miw="full">
            <Flex w="250px" p="md" direction="column" justify="start" gap="md">
                <Title size="3rem">Invitati</Title>

                <NumberInput
                    label="Nr de mese"
                    value={numTables}
                    onChange={(value) => setNumTables(value as number)}
                    min={1}
                    max={50}
                    step={1}
                    placeholder="Nr de mese"
                />
            </Flex>

            {/* Main Content */}
            <Box w="100%" bg="gray.0" p="md">
                <Flex direction="column">
                    <Title size="6rem" py="sm" c="brown.1">
                        Locuri Mese
                    </Title>
                </Flex>

                <Canvas numTables={numTables} />
            </Box>
        </Flex>
    );
}
