import axios from 'axios';

// Function to fetch meaning from the API
async function fetchMeaningFromAPI(word) {
    const apiUrl = 'https://aeona3.p.rapidapi.com/';
    const apiKey = '0ac13f9a33msh14c67dfcc5cb626p15b1eajsnaa637d740072';

    const options = {
        method: 'GET',
        url: apiUrl,
        params: {
            text: word, // Pass the word you want to search for
            userId: '12312312312'
        },
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'aeona3.p.rapidapi.com'
        }
    };

    try {
        console.log('Sending API request...');
        const response = await axios.request(options);
        console.log('API Response:', response);
        return response.data; // Assuming the API response contains the data you need
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error fetching meaning.');
    }
}

// Function to update the meaning in the HTML
function updateMeaning(meaning) {
    const meaningElement = document.getElementById('meaning');
    meaningElement.textContent = meaning;
}

// Function to handle search button click
async function searchMeaning() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value;

    try {
        const meaning = await fetchMeaningFromAPI(word);
        updateMeaning(meaning);
    } catch (error) {
        console.error('Error:', error);
        updateMeaning('Error fetching meaning.');
    }
}

// Attach the searchMeaning function to the button click event
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchMeaning);