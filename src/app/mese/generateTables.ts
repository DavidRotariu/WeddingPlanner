/* eslint-disable @typescript-eslint/no-unused-vars */
export const generateTables = (
    numTables: number,
    tableRadius: number,
    spacing: number,
    canvasWidth: number,
    canvasHeight: number
) => {
    const tables = [];
    const xSpacing = spacing + 2 * tableRadius;
    const ySpacing = Math.sqrt(2) * (spacing + tableRadius);

    const aspectRatio = (canvasWidth - 650) / (canvasHeight - 200);
    const cols = Math.ceil(Math.sqrt(numTables * aspectRatio));
    const rows = Math.ceil(numTables / cols);

    let tableCount = 0;

    for (let row = 0; tableCount < numTables; row++) {
        const tablesInRow = row % 2 === 0 ? cols : Math.max(1, cols - 1); // Ensure at least 1 table in staggered rows

        for (let col = 0; col < tablesInRow; col++) {
            if (tableCount >= numTables) break; // Stop when all tables are added

            const x = col * xSpacing + (row % 2 === 0 ? 0 : xSpacing / 2); // Stagger odd rows
            const y = row * ySpacing;

            tables.push({ id: `table-${tableCount + 1}`, x, y });
            tableCount++;
        }
    }

    return tables;
};
