export default async function getResponse(prompt) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/${prompt}`, {
            method: "GET",
            headers: {
                'X-CSRFToken': "rbOUQhj5iY88sLgWVJgyEtmVCh6BwWGl"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        throw error; // Re-throw the error for further handling
    }
}