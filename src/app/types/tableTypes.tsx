export interface Person {
    id: string;
    name: string;
}

export interface Chair {
    id: string;
    x: number;
    y: number;
    // person: Person | null;
}

export interface Table {
    id: string;
    x: number;
    y: number;
    chairs: Chair[];
}
export interface Guest {
    id: string;
    name: string;
    surname: string;
    email?: string;
    children?: string;
    seat?: string;
    table?: string;
    created_at?: string;
}
