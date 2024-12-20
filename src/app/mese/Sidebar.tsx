/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, NumberInput, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Guest } from './Guest';

type Guest = {
    children: boolean;
    created_at: string;
    email: string;
    id: string;
    name: string;
    seat: string;
    surname: string;
    table: string;
};

export const Sidebar = ({ numTables, setNumTables, defaultSeats, setDefaultSeats, guests, setGuests }: any) => {
    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/guests/unassigned');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setGuests(data);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    return (
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
            {guests.length > 0 ? (
                guests.map((guest: Guest) => <Guest key={guest.id} guest={guest} />)
            ) : (
                <div>No unassigned guests found.</div>
            )}
        </Flex>
    );
};
