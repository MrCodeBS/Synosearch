import axios from 'axios';

async function fetchMeaningFromAPI(word, language) {
    const apiUrl = `https://${language}.wikipedia.org/w/api.php`;
    const params = {
        action: 'query',
        format: 'json',
        prop: 'extracts',
        explaintext: true,
        titles: word
    };

    try {
        const response = await axios.get(apiUrl, { params });
        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];
        const meaning = pages[pageId].extract;
        return meaning || 'No information found on Wikipedia.';
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Error fetching meaning.');
    }
}

function updateMeaning(meaning) {
    const meaningElement = document.getElementById('meaning');
    meaningElement.textContent = meaning;
}

async function searchMeaning() {
    const wordInput = document.getElementById('wordInput');
    const languageSelect = document.getElementById('language');
    const word = wordInput.value;
    const language = languageSelect.value;

    try {
        const meaning = await fetchMeaningFromAPI(word, language);
        updateMeaning(meaning);
    } catch (error) {
        console.error('Error:', error);
        updateMeaning('Error fetching meaning.');
    }
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchMeaning);
