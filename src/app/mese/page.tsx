'use client';

import dynamic from 'next/dynamic';
import { Box, Flex, Title } from '@mantine/core';
import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Canvas = dynamic(() => import('./Canvas'), { ssr: false });

export default function HomePage() {
    const [numTables, setNumTables] = useState(5);
    const [defaultSeats, setDefaultSeats] = useState(6);

    return (
        <DndProvider backend={HTML5Backend}>
            <Box pos="relative" h="100vh" w="100vw" bg="offwhite.1">
                <Canvas numTables={numTables} seatsPerTable={defaultSeats} />
                <Sidebar
                    numTables={numTables}
                    setNumTables={setNumTables}
                    defaultSeats={defaultSeats}
                    setDefaultSeats={setDefaultSeats}
                />
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
                    px="md"
                >
                    <Title size="6rem" py="sm" c="brown.1">
                        Locuri Mese
                    </Title>
                </Flex>
            </Box>
        </DndProvider>
    );
}
