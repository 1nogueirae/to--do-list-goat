    export default async function getTasks(url: string) {
    try {
        const res = await fetch(url + '/api/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json();

        data.forEach((task: { id: number; title: string; description: string; status: string }) => {
            switch (task.status) {
                case 'pending':
                    task.status = 'Pending';
                    break;
                case 'in_progress':
                    task.status = 'In Progress';
                    break;
                case 'done':
                    task.status = 'Done';
                    break;
            }
        });
        return data
    } catch (error) {
        console.error('Request failure: ', error)
        throw error
    }
}
