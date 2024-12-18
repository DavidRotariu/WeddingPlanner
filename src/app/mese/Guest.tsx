import { useDrag } from 'react-dnd';
import React, { forwardRef } from 'react';

type GuestProps = {
    guest: {
        id: string;
        name: string;
        surname: string;
    };
};

export const Guest = forwardRef<HTMLDivElement, GuestProps>(({ guest }, ref) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'GUEST', // A unique identifier for the draggable item
        item: { id: guest.id, name: guest.name, surname: guest.surname },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }));

    const combinedRef = (node: HTMLDivElement | null) => {
        dragRef(node);
        if (ref && typeof ref === 'function') ref(node);
    };

    return (
        <div
            ref={combinedRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: '8px',
                margin: '4px 0',
                backgroundColor: 'white',
                border: '1px solid lightgray',
                borderRadius: '4px',
                textAlign: 'center',
                cursor: 'move'
            }}
        >
            {guest.name} {guest.surname}
        </div>
    );
});

Guest.displayName = 'Guest';
