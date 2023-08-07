import axios from 'axios';
import { useState } from 'react';

const SearchComponent = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        firstName: '',
        passportNumber: '',
    });
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria((prevCriteria) => ({
            ...prevCriteria,
            [name]: value,
        }));
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/employee', {
                params: searchCriteria,
            });

            // Извлекаем массив searchResults из ответа сервера
            const { searchResults } = response.data;

            setSearchResults(searchResults);
        } catch (error) {
            console.error('An error occurred while searching:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Search Employees</h2>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    name="firstName"
                    value={searchCriteria.firstName}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="passportNumber">Passport Number:</label>
                <input
                    type="text"
                    name="passportNumber"
                    value={searchCriteria.passportNumber}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={handleSearch} disabled={loading}>
                Search
            </button>
            {loading && <p>Loading...</p>}
            <ul>
                {searchResults.map((result) => (
                    <li key={result.id}>
                        {result.firstName} - {result.passportNumber} - {result.sureName} - {result.phone} - {result.education} - {result.birthday} - {result.speciality}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;
