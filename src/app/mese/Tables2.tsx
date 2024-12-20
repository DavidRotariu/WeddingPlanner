/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import './Tables.css';

type Guest = {
    id?: string;
    name?: string;
    surname?: string;
};

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

type TablesProps = {
    numTables: number;
    seatsPerTable: number;
    tables: Table[];
    setTables: (tables: Table[]) => void;
};

const Tables2: React.FC<TablesProps> = ({ numTables, seatsPerTable, tables, setTables }) => {
    const seatDistance = 100; // Distance from the table center for seats

    // Handle table updates (e.g., assigning guests dynamically)
    const handleUpdateTable = (tableId: string, updatedGuests: Guest[]) => {
        setTables(tables.map((table) => (table.id === tableId ? { ...table, guests: updatedGuests } : table)));
    };

    return (
        <div className="tables-grid">
            {tables.map((table) => {
                const seatCount = seatsPerTable;

                // Generate seat positions
                const seats = Array.from({ length: seatCount }).map((_, index) => {
                    const angle = (index / seatCount) * 360;
                    return { id: index + 1, angle };
                });

                return (
                    <div key={table.id} className="table-container">
                        {/* Table */}
                        <div className="table">{table.id}</div>

                        {/* Seats */}
                        {seats.map((seat, idx) => {
                            const x = 150 + seatDistance * Math.cos((seat.angle * Math.PI) / 180);
                            const y = 150 + seatDistance * Math.sin((seat.angle * Math.PI) / 180);

                            return (
                                <div
                                    key={seat.id}
                                    className="seat"
                                    style={{
                                        top: `${y}px`,
                                        left: `${x}px`
                                    }}
                                    onClick={() => {
                                        // Example interaction: assign a guest to this seat
                                        const newGuests = [...table.guests];
                                        newGuests[idx] = { id: `guest-${idx}`, name: `Guest ${idx + 1}` };
                                        handleUpdateTable(table.id, newGuests);
                                    }}
                                >
                                    {table.guests[idx]?.name || `Seat ${seat.id}`}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Tables2;
