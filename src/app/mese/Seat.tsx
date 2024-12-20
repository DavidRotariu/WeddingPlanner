/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

type Guest = {
    id?: string;
    name?: string;
    surname?: string;
};

type SeatProps = {
    tableId: string;
    seat: { id: number; label: string };
    isOccupied: boolean;
    position: { x: number; y: number };
};

const interpolateColor = (color1: string, color2: string, factor: number) => {
    const hexToRgb = (hex: string) =>
        hex
            .replace(/^#/, '')
            .match(/.{1,2}/g)
            ?.map((value) => parseInt(value, 16));

    const rgbToHex = (rgb: number[]) =>
        `#${rgb
            .map((value) => {
                const hex = value.toString(16);
                return hex.length === 1 ? `0${hex}` : hex;
            })
            .join('')}`;

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) return color1;

    const interpolated = rgb1.map((value, index) => Math.round(value + factor * (rgb2[index] - value)));

    return rgbToHex(interpolated);
};

const Seat: React.FC<SeatProps> = ({ tableId, seat, isOccupied, position }) => {
    const localRef = useRef<HTMLDivElement>(null);

    const [{ isOver }, dropRef] = useDrop(() => ({
        accept: 'GUEST',
        drop: (guest: Guest) => {
            console.log(`Dropped on Seat: ${seat.label}, Guest:`, guest);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    }));

    const combinedRef = (node: HTMLDivElement | null) => {
        dropRef(node);
        if (localRef.current) localRef.current = node;
    };

    const baseColor = '#FFFAF9';
    const occupiedColor = '#C2A59E';
    const hoverColor = isOver
        ? interpolateColor(baseColor, occupiedColor, 0.5)
        : isOccupied
          ? occupiedColor
          : baseColor;

    return (
        <div
            ref={combinedRef}
            className={`seat ${isOccupied ? 'occupied' : 'free'} ${isOver ? 'is-over' : ''}`}
            style={{
                top: `${position.y}%`,
                left: `${position.x}%`,
                backgroundColor: hoverColor // Dynamic color change
            }}
        >
            {seat.label}
        </div>
    );
};

export default Seat;
