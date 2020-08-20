export class IUser{
    id?: number;
    name: string;
    email: string;
    address?: {
        street: String,
        city: String,
        zipcode: any
            }
}

export class ITodo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export class IPost{
    id: number;
    userId: number;
    title: string;
    body: string;
}