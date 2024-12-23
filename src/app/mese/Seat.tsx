/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

type Guest = {
    id: string;
    name: string;
    surname: string;
};

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

type SeatProps = {
    tableId: string;
    seat: { id: number; label: string };
    isOccupied: boolean;
    position: { x: number; y: number };
    tables: any; // Pass the full tables state
    setTables: (updatedTables: Table[]) => void; // Function to update the tables state
    guests: any;
    setGuests: (updatedGuests: Guest[]) => void;
};

const Seat: React.FC<SeatProps> = ({ tableId, seat, isOccupied, position, tables, setTables, guests, setGuests }) => {
    const localRef = useRef<HTMLDivElement>(null);

    const postGuestToSeat = async (guestId: string, tableId: string, seatLabel: string) => {
        const payload = {
            guest_id: guestId,
            table: parseInt(tableId, 10),
            seat: seatLabel
        };

        try {
            const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/guest/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error posting to the API:', error);
                return;
            }

            const data = await response.json();
            console.log('Successfully posted:', data);

            // Update tables state
            const updatedTables = tables.map((table: Table) => {
                if (table.id === data.table) {
                    // Update the guests for the table
                    const updatedGuests = [...table.guests];
                    const seatIndex = seat.label.charCodeAt(0) - 65; // Convert seat label (A, B, ...) to index
                    updatedGuests[seatIndex] = {
                        id: data.id,
                        name: data.name,
                        surname: data.surname
                    };
                    return { ...table, guests: updatedGuests };
                }
                return table;
            });

            setTables(updatedTables); // Update the state

            const updatedGuestsList = guests.filter((guest: Guest) => guest.id !== data.id);
            setGuests(updatedGuestsList);
        } catch (error) {
            console.error('Error posting to the API:', error);
        }
    };

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'GUEST',
        drop: (guest: Guest) => {
            console.log(`Dropped on Table: ${tableId}, Seat: ${seat.label}, Guest:`, guest);
            postGuestToSeat(guest.id, tableId, seat.label); // Call the API when a guest is dropped
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    const combinedRef = (node: HTMLDivElement | null) => {
        dropRef(node);
        if (localRef.current) localRef.current = node;
    };

    const baseColor = '#FFFAF9';
    const occupiedColor = '#C2A59E';
    const hoverColor = isOver
        ? '#E8D6CB' // Adjusted hover color
        : isOccupied
          ? occupiedColor
          : baseColor;

    return (
        <div
            ref={combinedRef}
            className={`seat ${isOccupied ? 'occupied' : 'free'} ${isOver ? 'is-over' : ''}`}
            style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
                backgroundColor: hoverColor // Dynamic color change
            }}
        >
            {seat.label}
        </div>
    );
};

export default Seat;
