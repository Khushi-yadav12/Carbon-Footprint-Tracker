const calculateFootprint = (electricityUsage, milesDriven, flightsTaken) => {
    // Constants for carbon emission factors (simplified estimates)
    const electricityEmissionFactor = 0.92; // kg CO₂ per kWh
    const carEmissionFactor = 0.411; // kg CO₂ per mile
    const flightEmissionFactor = 0.9; // kg CO₂ per mile per flight (round trip)

    // Calculate emissions for each category
    const electricityEmissions = electricityUsage * electricityEmissionFactor;
    const carEmissions = milesDriven * carEmissionFactor;
    const flightEmissions = flightsTaken * 1000 * flightEmissionFactor; // Assume average flight distance of 1000 miles per round trip

    // Total carbon footprint
    const totalEmissions = electricityEmissions + carEmissions + flightEmissions;

    // Return results as an object
    return {
        electricityEmissions,
        carEmissions,
        flightEmissions,
        totalEmissions
    };
};

// Event listener for form submission
document.getElementById('carbonForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Get the values from the form inputs
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value);
    const milesDriven = parseFloat(document.getElementById('milesDriven').value);
    const flightsTaken = parseFloat(document.getElementById('flightsTaken').value);

    // Validate the inputs
    if (isNaN(electricityUsage) || isNaN(milesDriven) || isNaN(flightsTaken)) {
        alert('Please enter valid numbers for all fields.');
        return;
    }

    // Calculate carbon footprint
    const results = calculateFootprint(electricityUsage, milesDriven, flightsTaken);

    // Display the results in widgets
    document.getElementById('elecResult').textContent = results.electricityEmissions.toFixed(2);
    document.getElementById('carResult').textContent = results.carEmissions.toFixed(2);
    document.getElementById('flightResult').textContent = results.flightEmissions.toFixed(2);
    document.getElementById('totalResult').textContent = results.totalEmissions.toFixed(2);

    // Show the results section
    document.getElementById('results').style.display = 'block';

    // Generate Pie Chart
    const ctx = document.getElementById('carbonChart').getContext('2d');
    const carbonChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Electricity', 'Car Driving', 'Flights'],
            datasets: [{
                data: [
                    results.electricityEmissions,
                    results.carEmissions,
                    results.flightEmissions
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF4C61', '#58A4F6', '#FFB548']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + ' kg CO₂';
                        }
                    }
                }
            }
        }
    });
});