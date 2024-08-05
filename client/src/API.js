async function getResponse(topic, difficulty,questionType) {
    //asynchronous function to fetch question/answer pairs
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

async function getTeach(topic, question,answer) {
    //asynchronous function to fetch question/answer pairs
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/response/teach/say why ${answer} is the answer to the question ${question}`, {
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

async function postPair(returned, difficulty, topic) {
    //asynchronous function to post prompt/content pairs to the db
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/save/`, {
            method: "POST",
            headers: {
                'X-CSRFToken': "rbOUQhj5iY88sLgWVJgyEtmVCh6BwWGl",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: `give me one question with the answer, on the topic of ${topic}, at difficulty level ${difficulty}`,
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
//export functions
module.exports = {getResponse, postPair, getTeach}