import json

# Sample data to write to the JSONL file
data = [
    {"prompt": "What is the capital of France?", "completion": "Paris"},
    {"prompt": "Who wrote '1984'?", "completion": "George Orwell"},
    {"prompt": "What is 2 + 2?", "completion": "4"},
    {"prompt": "tester", "completion": "tester"}
]

# Specify the filename
file_path = 'test_data.jsonl'

# Write the data to a JSONL file
with open(file_path, 'w', encoding='utf-8') as f:
    for entry in data:
        f.write(json.dumps(entry) + '\n')  # Write each entry as a JSON string with a newline
