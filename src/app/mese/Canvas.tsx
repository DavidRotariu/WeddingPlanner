/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Tables = dynamic(() => import('./Tables'), { ssr: false });

type CanvasProps = {
    numTables: number;
    seatsPerTable: number;
};

function Canvas({ numTables, seatsPerTable }: CanvasProps) {
    const [scale, setScale] = useState(1);
    const stageRef = useRef<Konva.Stage>(null);

    const handleWheel = (e: any) => {
        e.evt.preventDefault();

        const stage = stageRef.current;
        if (!stage) return;

        const scaleBy = 1.05;
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale
        };

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale
        };

        stage.scale({ x: newScale, y: newScale });
        stage.position(newPos);
        stage.batchDraw();
    };

    const handleMouseEnter = () => {
        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'grab';
        }
    };

    const handleMouseDown = () => {
        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'grabbing';
        }
    };

    const handleMouseUp = () => {
        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'grab';
        }
    };

    const handleMouseLeave = () => {
        if (stageRef.current) {
            stageRef.current.container().style.cursor = 'default';
        }
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            scaleX={scale}
            scaleY={scale}
            Impl
            onWheel={handleWheel}
            ref={stageRef}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <Layer>
                <Tables numTables={numTables} seatsPerTable={seatsPerTable} />
            </Layer>
        </Stage>
    );
}

export default Canvas;
