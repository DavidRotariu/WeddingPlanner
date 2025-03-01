import { useEffect, useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';

type Guest = {
    id: string;
    name: string;
    surname: string;
    seat: string | null;
    table: string | null;
};

const SearchTable = () => {
    const [guests, setGuests] = useState<Guest[]>([]);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch('https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/guests');
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
        <ScrollArea w="100%" h="500px">
            <Table striped highlightOnHover withColumnBorders>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Table</th>
                        <th>Seat</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.length > 0 ? (
                        guests.map((guest) => (
                            <tr key={guest.id}>
                                <td>{guest.name}</td>
                                <td>{guest.surname}</td>
                                <td>{guest.table ? `Table ${guest.table}` : 'Unassigned'}</td>
                                <td>{guest.seat ? `Seat ${guest.seat}` : 'Unassigned'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '16px' }}>
                                No invitees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </ScrollArea>
    );
};

export default SearchTable;
