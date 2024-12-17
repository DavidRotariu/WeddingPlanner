'use client';

import { Circle, Group } from 'react-konva';
import { generateTables } from './generateTables';

type TablesProps = {
    numTables: number;
    seatsPerTable: number;
};

function Tables({ numTables, seatsPerTable }: TablesProps) {
    const tableRadius = 80;
    const spacing = 300;

    const seatRadius = 25;
    const seatDistance = 120;

    const canvasWidth = window.innerWidth - 50;
    const canvasHeight = window.innerHeight - 50;

    const tables = generateTables(numTables, tableRadius, spacing, canvasWidth, canvasHeight);

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

    return (
        <>
            {tables.map((table) => {
                const seatPositions = getSeatPositions(table.x, table.y, seatsPerTable);

                return (
                    <Group key={table.id}>
                        <Circle x={table.x} y={table.y} radius={tableRadius} fill="lightblue" />

                        {seatPositions.map((seat, index) => (
                            <Circle
                                key={`${table.id}-seat-${index}`}
                                x={seat.x}
                                y={seat.y}
                                radius={seatRadius}
                                fill="lightblue"
                            />
                        ))}
                    </Group>
                );
            })}
        </>
    );
}

export default Tables;
