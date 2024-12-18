/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Circle, Group, Text } from 'react-konva';
import { generateTables } from './generateTables';
import { Seat } from './Seats';
import { Guest } from '../types/tableTypes';

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

type TablesProps = {
    numTables: number;
    seatsPerTable: number;
    tables: Table[];
    setTables: any;
};

function Tables({ numTables, seatsPerTable, tables, setTables }: TablesProps) {
    const tableRadius = 80;
    const spacing = 300;

    const seatRadius = 25;
    const seatDistance = 120;

    const canvasWidth = window.innerWidth - 300;
    const canvasHeight = window.innerHeight - 100;

    const generatedTables = generateTables(numTables, tableRadius, spacing, canvasWidth, canvasHeight, tables);

    const getSeatPositions = (centerX: number, centerY: number, seats: number) => {
        const seatPositions = [];
        const angleStep = (2 * Math.PI) / seats;
        for (let i = 0; i < seats; i++) {
            const angle = i * angleStep;
            const seatX = centerX + seatDistance * Math.cos(angle);
            const seatY = centerY + seatDistance * Math.sin(angle);
            seatPositions.push({ x: seatX, y: seatY });
        }
        return seatPositions;
    };

    const handleUpdateTable = (tableId: string, updatedGuests: Guest[]) => {
        setTables((prevTables: Table[]) =>
            prevTables.map((table) => (table.id === tableId ? { ...table, guests: updatedGuests } : table))
        );
    };

    const handleDrop = (tableId: string, seatIndex: number, guest: Guest) => {
        const updatedTable = tables.find((table) => table.id === tableId);
        if (updatedTable) {
            const updatedGuests = [...updatedTable.guests];
            updatedGuests[seatIndex] = guest;
            handleUpdateTable(tableId, updatedGuests);
        }
    };

    return (
        <>
            {generatedTables.map((table, index) => {
                const seatPositions = getSeatPositions(table.x, table.y, seatsPerTable);

                return (
                    <Group key={table.id}>
                        <Circle x={table.x} y={table.y} radius={tableRadius} stroke="#666057" strokeWidth={2} />
                        <Text
                            x={table.x - tableRadius / 2 + 16}
                            y={table.y - tableRadius / 2 + 5}
                            text={table.id}
                            fontSize={74}
                            fontFamily="Lavishly Yours"
                            fill="#666057"
                        />
                        {seatPositions.map((seat, idx) => (
                            <Seat
                                key={`seat-${index}-${idx}`}
                                x={seat.x}
                                y={seat.y}
                                index={idx}
                                radius={seatRadius}
                                guest={table.guests[idx] || {}}
                                tableId={table.id}
                                onDrop={(seatIndex, guest) => handleDrop(table.id, seatIndex, guest)}
                            />
                        ))}
                    </Group>
                );
            })}
        </>
    );
}

export default Tables;
