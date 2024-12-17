'use client';

import dynamic from 'next/dynamic';
import { NumberInput, Box, Flex, Title } from '@mantine/core';
import { useState } from 'react';

const Canvas = dynamic(() => import('./Canvas'), { ssr: false });

export default function HomePage() {
    const [numTables, setNumTables] = useState(5);
    const [defaultSeats, setDefaultSeats] = useState(6);

    return (
        <Box pos="relative" h="100vh" w="100vw" bg="offwhite.1">
            <Canvas numTables={numTables} seatsPerTable={defaultSeats} />

            <Flex
                pos="absolute"
                top={0}
                left={0}
                w="250px"
                h="100%"
                bg="offwhite.1"
                opacity={0.8}
                p="md"
                direction="column"
                justify="start"
                gap="md"
                // z={10}
            >
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
                <NumberInput
                    label="Nr de locuri"
                    value={defaultSeats}
                    onChange={(value) => setDefaultSeats(value as number)}
                    min={2}
                    max={10}
                    step={1}
                    placeholder="Nr de locurui"
                />
            </Flex>

            {/* Title */}
            <Flex
                pos="absolute"
                top={0}
                left="250px"
                right={0}
                h="100px"
                align="center"
                justify="center"
                bg="offwhite.1"
                opacity={0.8}
                // zIndex={10}
                px="md"
            >
                <Title size="6rem" py="sm" c="brown.1">
                    Locuri Mese
                </Title>
            </Flex>
        </Box>
    );
}
