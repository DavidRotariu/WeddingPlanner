'use client';

import { Circle } from 'react-konva';
import { generateTables } from './generateTables';

type TablesProps = {
    numTables: number;
};

function Tables({ numTables }: TablesProps) {
    const tableRadius = 80;
    const spacing = 150;

    const canvasWidth = window.innerWidth - 50;
    const canvasHeight = window.innerHeight - 50;

    const tables = generateTables(numTables, tableRadius, spacing, canvasWidth, canvasHeight);

    return (
        <>
            {tables.map((table) => (
                <Circle key={table.id} x={table.x} y={table.y} radius={tableRadius} fill="lightblue" />
            ))}
        </>
    );
}

export default Tables;
