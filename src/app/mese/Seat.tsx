/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react';
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
    const [showTooltip, setShowTooltip] = useState(false);

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

            const updatedTables = tables.map((table: Table) => {
                if (table.id === data.table) {
                    const updatedGuests = [...table.guests];
                    const seatIndex = seat.label.charCodeAt(0) - 65;
                    updatedGuests[seatIndex] = {
                        id: data.id,
                        name: data.name,
                        surname: data.surname
                    };
                    return { ...table, guests: updatedGuests };
                }
                return table;
            });

            setTables(updatedTables);

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
            postGuestToSeat(guest.id, tableId, seat.label);
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
    const hoverColor = isOver ? '#E8D6CB' : isOccupied ? occupiedColor : baseColor;

    const guest = tables.find((table: Table) => table.id === tableId)?.guests[seat.id];

    return (
        <div
            ref={localRef}
            className={`seat ${isOccupied ? 'occupied' : 'free'}`}
            style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
                backgroundColor: hoverColor,
                position: 'absolute',
                width: '3vw',
                height: '3vw',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                border: '2px solid #666057',
                zIndex: isOccupied && showTooltip ? 10 : 1
            }}
            onClick={() => setShowTooltip(!showTooltip)}
        >
            {seat.label}

            {/* Tooltip */}
            {showTooltip && guest.id && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '120%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#C2A59E',
                        color: '#666057',
                        padding: '6px 12px',
                        // borderColor: '#666057',
                        borderRadius: '4px',
                        fontSize: '12px',
                        whiteSpace: 'nowrap',
                        zIndex: 20, // Ensure tooltip is on top of everything
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    {`${guest.name} ${guest.surname}`}
                </div>
            )}
        </div>
    );
};

export default Seat;
