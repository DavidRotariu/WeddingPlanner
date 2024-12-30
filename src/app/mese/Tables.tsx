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
    const handleDeleteTable = async (tableId: string) => {
        const payload = { table: Number(tableId) };
        try {
            const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/table', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const error = await response.json();
                console.error('Error deleting table:', error);
                return;
            }
            const data = await response.json();
            console.log(`Successfully deleted table ${tableId}:`, data);
            // Update tables
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    return (
        <div className="tables-container">
            {tables.map((table) => {
                const seatLabels = Array.from({ length: table.seats }, (_, i) => String.fromCharCode(65 + i));

                return (
                    <div
                        key={table.id}
                        className={`table-container ${table.guests.every((guest) => guest.id) ? 'occupied' : ''}`}
                    >
                        <div className="table">
                            {table.id}
                            <sup
                                className="close-button"
                                onClick={() => handleDeleteTable(table.id)}
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: '6px',
                                    fontSize: '2rem'
                                }}
                            >
                                x
                            </sup>
                        </div>

                        {/* Render Seats */}
                        {seatLabels.map((label, idx) => {
                            const guest = table.guests.find((g) => g.seat === label) || {};
                            const x = 50 + 30 * Math.cos((idx / table.seats) * 2 * Math.PI);
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
