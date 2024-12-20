import React from 'react';
import './Tables.css';
import Seat from './Seat';

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

const Tables: React.FC<TablesProps> = ({ seatsPerTable, tables }) => {
    const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F']; // Seat labels

    return (
        <div className="tables-container">
            {tables.map((table) => {
                const seatCount = seatsPerTable;

                // Generate seat positions
                const seats = Array.from({ length: seatCount }).map((_, index) => {
                    const angle = (index / seatCount) * 360;
                    return { id: index + 1, angle, label: seatLabels[index % seatLabels.length] };
                });

                return (
                    <div
                        key={table.id}
                        className={`table-container ${table.guests.every((guest) => guest.id) ? 'occupied' : ''}`}
                    >
                        {/* Table Number */}
                        <div className="table">{table.id}</div>

                        {/* Render Seats */}
                        {seats.map((seat, idx) => {
                            const x = 50 + 30 * Math.cos((seat.angle * Math.PI) / 180); // Adjust distance
                            const y = 50 + 30 * Math.sin((seat.angle * Math.PI) / 180);
                            const isOccupied = !!table.guests[idx]?.id;

                            return (
                                <Seat
                                    key={seat.id}
                                    tableId={table.id}
                                    seat={seat}
                                    isOccupied={isOccupied}
                                    position={{ x, y }}
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
