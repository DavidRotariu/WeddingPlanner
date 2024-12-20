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
                    <div key={table.id} className="table-container">
                        {/* Table */}
                        <div className="table">{table.id}</div>

                        {/* Seats */}
                        {seats.map((seat, idx) => {
                            const x = 150 + 90 * Math.cos((seat.angle * Math.PI) / 180); // Adjust distance
                            const y = 150 + 90 * Math.sin((seat.angle * Math.PI) / 180);

                            const isOccupied = !!table.guests[idx]?.id;

                            return (
                                <div
                                    key={seat.id}
                                    className={`seat ${isOccupied ? 'occupied' : 'free'}`}
                                    style={{
                                        top: `${y}px`,
                                        left: `${x}px`
                                    }}
                                >
                                    {seat.label}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Tables;
