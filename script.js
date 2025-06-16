document.addEventListener('DOMContentLoaded', () => {
    const temperatureInput = document.getElementById('temperatureInput');
    const unitSelect = document.getElementById('unitSelect');
    const convertButton = document.getElementById('convertButton');
    const resultModal = document.getElementById('resultModal');
    const modalHeading = resultModal.querySelector('h2'); // Get the h2 element within the modal
    const convertedTemperatureDisplay = document.getElementById('convertedTemperature');
    const closeButton = document.querySelector('.close-button');
    const okButton = document.getElementById('okButton');
    const modeToggle = document.getElementById('modeToggle');

    // Function to set the mode and update the toggle button text/emoji
    const setMode = (mode) => {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(mode);
        localStorage.setItem('theme', mode);

        if (mode === 'light-mode') {
            modeToggle.innerHTML = '☀️ Light';
        } else {
            modeToggle.innerHTML = '🌙 Dark';
        }
    };

    // Set initial mode based on local storage or default to light-mode
    const initialMode = localStorage.getItem('theme') || 'light-mode';
    setMode(initialMode);

    convertButton.addEventListener('click', () => {
        const temperature = parseFloat(temperatureInput.value);
        const unit = unitSelect.value;
        let convertedTemp = '';

        if (isNaN(temperature)) {
            modalHeading.textContent = ''; // Change heading for error
            convertedTemperatureDisplay.textContent = 'Please enter a valid number.';
            resultModal.style.display = 'flex'; // Show modal for error
            return; // Stop execution if input is invalid
        }

        // If input is valid, set the heading back to "Converted Temperature"
        modalHeading.textContent = 'Converted Temperature:';

        switch (unit) {
            case 'celsius':
                // Convert Celsius to Fahrenheit and Kelvin
                const fahrenheitFromC = (temperature * 9/5) + 32;
                const kelvinFromC = temperature + 273.15;
                convertedTemp = `${temperature}°C is ${fahrenheitFromC.toFixed(2)}°F and ${kelvinFromC.toFixed(2)}K`;
                break;
            case 'fahrenheit':
                // Convert Fahrenheit to Celsius and Kelvin
                const celsiusFromF = (temperature - 32) * 5/9;
                const kelvinFromF = (temperature - 32) * 5/9 + 273.15;
                convertedTemp = `${temperature}°F is ${celsiusFromF.toFixed(2)}°C and ${kelvinFromF.toFixed(2)}K`;
                break;
            case 'kelvin':
                // Convert Kelvin to Celsius and Fahrenheit
                const celsiusFromK = temperature - 273.15;
                const fahrenheitFromK = (temperature - 273.15) * 9/5 + 32;
                convertedTemp = `${temperature}K is ${celsiusFromK.toFixed(2)}°C and ${fahrenheitFromK.toFixed(2)}°F`;
                break;
            default:
                convertedTemp = 'Invalid unit selected.';
        }

        convertedTemperatureDisplay.textContent = convertedTemp;
        resultModal.style.display = 'flex'; // Show the modal with results
    });

    // Toggle mode functionality
    modeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            setMode('dark-mode');
        } else {
            setMode('light-mode');
        }
    });

    // Close the modal when the close button is clicked
    closeButton.addEventListener('click', () => {
        resultModal.style.display = 'none';
    });

    // Close the modal when the OK button is clicked
    okButton.addEventListener('click', () => {
        resultModal.style.display = 'none';
    });

    // Close the modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === resultModal) {
            resultModal.style.display = 'none';
        }
    });
});