async function getResponse(topic, difficulty,questionType) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/response/${topic}/${difficulty}/${questionType}`, {
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

async function postPair(prompt,returned, difficulty, topic) {
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/save/`, {
            method: "POST",
            headers: {
                'X-CSRFToken': "rbOUQhj5iY88sLgWVJgyEtmVCh6BwWGl",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                response: returned,
                difficulty: difficulty,
                topic: topic
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        throw error; // Re-throw the error for further handling
    }
}

module.exports = {getResponse, postPair}