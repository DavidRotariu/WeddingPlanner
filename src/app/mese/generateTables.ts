/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guest } from '../types/tableTypes';

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

export const generateTables = (
    numTables: number,
    tableRadius: number,
    spacing: number,
    canvasWidth: number,
    canvasHeight: number,
    tablesData: Table[]
) => {
    const tables = [];
    const xSpacing = spacing + 2 * tableRadius;
    const ySpacing = spacing + tableRadius;

    const aspectRatio = (canvasWidth - 300) / (canvasHeight - 100);
    const cols = Math.ceil(Math.sqrt(numTables * aspectRatio));
    const rows = Math.ceil(numTables / cols);

    let tableCount = 0;

    for (let row = 0; tableCount < tablesData.length; row++) {
        const tablesInRow = row % 2 === 0 ? cols : Math.max(1, cols - 1);

        for (let col = 0; col < tablesInRow; col++) {
            if (tableCount >= tablesData.length) break;
            const x = col * xSpacing + (row % 2 === 0 ? 0 : xSpacing / 2);
            const y = row * ySpacing;
            const table = tablesData[tableCount];
            tables.push({
                id: table.id,
                seats: table.seats,
                guests: table.guests,
                x,
                y
            });
            tableCount++;
        }
    }

    return tables;
};
