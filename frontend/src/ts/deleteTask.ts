export default async function deleteTask(url: string, id: number) {
    try {
        const res = await fetch(url + `/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        return await res.json();
    } catch (error) {
        console.error('Request failure: ', error)
        throw error
    }
}