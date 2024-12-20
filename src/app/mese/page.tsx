/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, Flex, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Guest } from '../types/tableTypes';
import Tables from './Tables';

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

export default function HomePage() {
    const [numTables, setNumTables] = useState(5);
    const [defaultSeats, setDefaultSeats] = useState(6);
    const [tables, setTables] = useState<Table[]>([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/tables');
                const data = await response.json();

                const transformedData = data.map((table: any) => ({
                    id: table.id,
                    seats: parseInt(table.seats, 10),
                    guests: Object.keys(table.guests).map((key) => table.guests[key] || {})
                }));
                console.log(transformedData);
                setTables(transformedData);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };
        fetchTables();
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <Box h="100vh" w="100vw" bg="offwhite.1">
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
                <Flex pos="relative" mt="100px" ml="250px">
                    <Tables numTables={numTables} seatsPerTable={defaultSeats} tables={tables} setTables={setTables} />
                </Flex>
            </Box>
        </DndProvider>
    );
}
