export default async function putTasks(url: string, task: object, id: number) {
    try {
        const res = await fetch(url + `/tasks/${id}`, {
            method: 'PUT',
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
