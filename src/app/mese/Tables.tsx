/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './Tables.css';
import Seat from './Seat';

type Guest = {
    id?: string;
    name?: string;
    surname?: string;
    seat?: string;
};

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

type TablesProps = {
    tables: Table[];
    setTables: any;
    guests: Guest[];
    setGuests: any;
};

const Tables: React.FC<TablesProps> = ({ tables, setTables, guests, setGuests }) => {
    return (
        <div className="tables-container">
            {tables.map((table) => {
                const seatLabels = Array.from(
                    { length: table.seats },
                    (_, i) => String.fromCharCode(65 + i) // Generate seat labels dynamically (A, B, C, etc.)
                );

                return (
                    <div
                        key={table.id}
                        className={`table-container ${table.guests.every((guest) => guest.id) ? 'occupied' : ''}`}
                    >
                        {/* Table Number */}
                        <div className="table">{table.id}</div>

                        {/* Render Seats */}
                        {seatLabels.map((label, idx) => {
                            const guest = table.guests.find((g) => g.seat === label) || {}; // Find guest for this seat or return empty object
                            const x = 50 + 30 * Math.cos((idx / table.seats) * 2 * Math.PI); // Adjust distance based on angle
                            const y = 50 + 30 * Math.sin((idx / table.seats) * 2 * Math.PI);
                            const isOccupied = !!guest.id;

                            return (
                                <Seat
                                    key={label}
                                    tableId={table.id}
                                    seat={{ id: idx, label }}
                                    isOccupied={isOccupied}
                                    position={{ x, y }}
                                    setTables={setTables}
                                    tables={tables}
                                    guests={guests}
                                    setGuests={setGuests}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Tables;
