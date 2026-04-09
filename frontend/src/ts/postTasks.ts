export default async function postTasks(url: string, task: object) {
    try {
        const res = await fetch(url + '/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Request failure: ', error)
        throw error
    }
}
