/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrop } from 'react-dnd';
import { Circle, Group, Text } from 'react-konva';
import Konva from 'konva'; // Import Konva for type definitions
import { useEffect, useRef } from 'react';

type Guest = {
    id?: string;
    name?: string;
    surname?: string;
};

type SeatProps = {
    x: number;
    y: number;
    index: number;
    radius: number;
    guest: Guest;
    onDrop: (seatIndex: number, guest: Guest) => void; // Callback to handle the drop event
    tableId: string;
};

export const Seat = ({ x, y, index, radius, guest, onDrop, tableId }: SeatProps) => {
    const konvaRef = useRef<Konva.Group>(null);

    const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
        accept: 'GUEST',
        drop: (item: Guest) => {
            if (isOver) {
                console.log(`Guest dropped on Table: ${tableId}, Seat: ${String.fromCharCode(65 + index)}`);
                console.log('Guest Details:', item);
                onDrop(index, item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    useEffect(() => {
        if (konvaRef.current) {
            const domNode = konvaRef.current.getStage()?.content;
            if (domNode) {
                dropRef(domNode);
            }
        }
    }, [dropRef]);

    return (
        <Group ref={konvaRef}>
            <Circle
                x={x}
                y={y}
                radius={radius}
                fill={guest?.id ? '#C2A59E' : isOver && canDrop ? '#E8D4CF' : '#FFFAF9'} // Color changes on hover
                stroke="#666057"
                strokeWidth={2}
            />
            <Text
                x={x - radius / 2 + 5}
                y={y - radius / 2 + 5}
                text={String.fromCharCode(65 + index)}
                fontSize={24}
                fontFamily="Arima"
                fontStyle="bold"
                fill="#666057"
            />
        </Group>
    );
};
