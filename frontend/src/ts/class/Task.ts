export class Task {
    constructor(title: string, description: string, status: string) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
    title: string;
    description: string;
    status: string;
}