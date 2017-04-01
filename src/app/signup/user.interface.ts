export interface User {
    name: string;
    day?: string;
    gender: string;
    isActive?: boolean;
    topics?: string[];
    account: {
        email: string;
        confirm: string;
    };
}
