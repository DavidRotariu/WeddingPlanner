import { useEffect, useState } from 'react';
import { Table, ScrollArea, Text } from '@mantine/core';

type Guest = {
    id: string;
    name: string;
    surname: string;
    seat: string | null;
    table: string | null;
};

type SearchTableProps = {
    searchQuery: string;
};

const SearchTable = ({ searchQuery }: SearchTableProps) => {
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/guests');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setGuests(data);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    const filteredGuests = guests.filter((guest) => {
        const fullName = `${guest.name} ${guest.surname}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    return (
        <ScrollArea w="100%" h="500px">
            <Table striped highlightOnHover withColumnBorders horizontalSpacing="md" verticalSpacing="xs">
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>Nume</th>
                        <th style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold' }}>Masă / Loc</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGuests.length > 0 ? (
                        filteredGuests.map((guest) => {
                            const isAssigned = guest.table !== 'None' && guest.seat !== 'None';
                            const seatInfo = isAssigned ? `Masă ${guest.table}, Loc ${guest.seat}` : 'Nealocat';

                            return (
                                <tr key={guest.id}>
                                    <td>
                                        <Text size="md" fw={500} c="dark">
                                            {guest.name} {guest.surname}
                                        </Text>
                                    </td>
                                    <td>
                                        <Text size="md" fw={500} c={isAssigned ? 'green.6' : 'red.6'}>
                                            {seatInfo}
                                        </Text>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan={2} style={{ textAlign: 'center', padding: '16px' }}>
                                <Text size="lg" fw={500} c="gray.6">
                                    Nicio potrivire găsită.
                                </Text>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default SearchTable;
