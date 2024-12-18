/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDrop } from 'react-dnd';
import { Circle, Group, Text } from 'react-konva';
import Konva from 'konva'; // Import Konva for type definitions
import { useEffect, useRef, useState } from 'react';

type SeatProps = {
    x: number;
    y: number;
    index: number;
    radius: number;
    guest: { id?: string };
};

export const Seat = ({ x, y, index, radius, guest }: SeatProps) => {
    const konvaRef = useRef<Konva.Circle>(null);

    const [seatState, setSeatState] = useState<'default' | 'hovered' | 'filled'>('default');

    const [, dropRef] = useDrop(() => ({
        accept: 'GUEST',
        drop: (item: { id: string; name: string; surname: string }) => {
            setSeatState('filled');
        },
        hover: () => {
            if (seatState !== 'filled') {
                setSeatState('hovered');
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    useEffect(() => {
        if (konvaRef.current) {
            const node = konvaRef.current.getStage()?.content as HTMLDivElement;
            dropRef(node);
        }
    }, [dropRef]);

    useEffect(() => {
        if (seatState === 'hovered') {
            const timeout = setTimeout(() => setSeatState('default'), 100);
            return () => clearTimeout(timeout);
        }
    }, [seatState]);

    return (
        <Group>
            <Circle
                ref={konvaRef}
                x={x}
                y={y}
                radius={radius}
                fill={guest?.id ? '#C2A59E' : '#FFFAF9'}
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
