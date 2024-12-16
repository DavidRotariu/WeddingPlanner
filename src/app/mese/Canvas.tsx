'use client';

import { Stage, Layer, Circle } from 'react-konva';
import { generateTables } from './generateTables';

type Table = {
    id: string;
    x: number;
    y: number;
};

function HexCanvas({ numTables }: { numTables: number }) {
    const tableRadius = 80;
    const spacing = 150;

    const canvasWidth = window.innerWidth - 50;
    const canvasHeight = window.innerHeight - 50;

    const tables: Table[] = generateTables(numTables, tableRadius, spacing, canvasWidth, canvasHeight);

    const gridWidth = Math.max(...tables.map((table) => table.x)) + tableRadius;
    const gridHeight = Math.max(...tables.map((table) => table.y)) + tableRadius;

    const offsetX = (canvasWidth - gridWidth) / 2;
    const offsetY = (canvasHeight - gridHeight) / 2;

    return (
        <Stage width={canvasWidth} height={canvasHeight}>
            <Layer>
                {tables.map((table) => (
                    <Circle
                        key={table.id}
                        x={table.x + offsetX} // Offset X to center the grid
                        y={table.y + offsetY} // Offset Y to center the grid
                        radius={tableRadius}
                        fill="lightblue"
                    />
                ))}
            </Layer>
        </Stage>
    );
}

export default HexCanvas;
