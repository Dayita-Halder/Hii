Yayy
Yeahhhhh
He is like... You forget me
That I completed my btech that's why you are not texting me right
He told the exact words that I wanted to tell him 😂😂
A happy thing finally
Yaaa xd
😉😎
I want to talk to you 😭
Like we did
Yk
What he texted her
Does your parents gave the money
That B guy
yo
yoooo
import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            // Parse input as JSON
            const jsonData = JSON.parse(input);

            // Send POST request to the backend API
            const result = await axios.post('https://your-heroku-app.herokuapp.com/bfhl', jsonData);

            // Store response data
            setResponse(result.data);
        } catch (error) {
            console.error('Error:', error);
            setResponse(null);
        }
    };

    // Handle multi-select dropdown change
    const handleSelectChange = (selected) => {
        setSelectedOptions(selected || []);
    };

    // Render response based on selected options
    const renderResponse = () => {
        if (!response) return null;

        const options = {
            Alphabets: response.alphabets,
            Numbers: response.numbers,
            'Highest lowercase alphabet': response.highest_lowercase_alphabet,
        };

        return selectedOptions.reduce((acc, option) => {
            const key = option.value;
            return acc.concat(options[key] || []);
        }, []);
    };

    return (
        <div>
            <h1>{response ? response.roll_number : 'Enter JSON Data'}</h1>
            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows="10"
                cols="50"
                placeholder='Enter JSON here, e.g., {"data": ["A","C","z"]}'
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <Select
                isMulti
                options={[
                    { value: 'Alphabets', label: 'Alphabets' },
                    { value: 'Numbers', label: 'Numbers' },
                    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
                ]}
                onChange={handleSelectChange}
            />
            <div>
                {renderResponse().map((item, index) => (
                    <div key={index}>{item.toString()}</div>
                ))}
            </div>
        </div>
    );
};

export default App;