from openai import OpenAI


client = OpenAI(
    api_key="sk-proj-61toAytXsa7MXjQRwzS6T3BlbkFJgmmLXYAic3VQyVN1oEMH",
)
def chat_with_gpt(prompt):
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
    model="gpt-3.5-turbo",
)
    return chat_completion.choices[0].message.content.strip()

if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() in ["quit","exit","bye"]:
            break
       
        response = chat_with_gpt(user_input)
        print("Chatbot: ", response)