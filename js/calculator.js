let chart;

function toggleInputs() {
    const calculationType = document.getElementById('calculationType').value;
    document.getElementById('goalAmountInput').classList.toggle('hidden', calculationType === 'futureValue');
    document.getElementById('adhocSection').classList.toggle('hidden', calculationType === 'monthlyPremium');
    document.getElementById('monthlyContributionInput').classList.toggle('hidden', calculationType === 'monthlyPremium');
    document.getElementById('chartContainer').classList.toggle('hidden', calculationType === 'monthlyPremium');
}

function generateAdhocInputs() {
    const numAdhoc = parseInt(document.getElementById('numAdhoc').value);
    const adhocInputsDiv = document.getElementById('adhocInputs');
    adhocInputsDiv.innerHTML = '';
    for (let i = 0; i < numAdhoc; i++) {
        adhocInputsDiv.innerHTML += `
            <div>
                <label for="adhocAmount${i}" class="block text-lg font-semibold">Ad Hoc Amount ${i + 1} ($):</label>
                <input type="number" id="adhocAmount${i}" min="0" step="100" value="1000" class="w-full mt-1 p-2 border rounded focus:outline-none">
                <label for="adhocDate${i}" class="block text-lg font-semibold">Date:</label>
                <input type="date" id="adhocDate${i}" class="w-full mt-1 p-2 border rounded focus:outline-none">
            </div>
        `;
    }
}

function calculate() {
    const calculationType = document.getElementById('calculationType').value;
    const startDate = new Date(document.getElementById('startDate').value);
    const investmentPeriod = parseInt(document.getElementById('investmentPeriod').value);

    const lowInflationRate = 0.06;
    const highInflationRate = 0.10;

    if (calculationType === 'futureValue') {
        const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
        const adhocContributions = getAdhocContributions();
        const lowInflationData = calculateGrowth(monthlyContribution, investmentPeriod, lowInflationRate, startDate, adhocContributions);
        const highInflationData = calculateGrowth(monthlyContribution, investmentPeriod, highInflationRate, startDate, adhocContributions);
        displayFutureValueResults(lowInflationData, highInflationData, startDate);
        updateChart(lowInflationData, highInflationData, investmentPeriod, startDate);
    } else {
        const goalAmount = parseFloat(document.getElementById('goalAmount').value);
        const lowMonthlyPremium = calculateMonthlyPremium(goalAmount, investmentPeriod, lowInflationRate, startDate);
        const highMonthlyPremium = calculateMonthlyPremium(goalAmount, investmentPeriod, highInflationRate, startDate);
        displayMonthlyPremiumResults(lowMonthlyPremium, highMonthlyPremium);
    }
}

function getAdhocContributions() {
    const adhocContributions = [];
    const numAdhoc = parseInt(document.getElementById('numAdhoc').value);
    for (let i = 0; i < numAdhoc; i++) {
        const amount = parseFloat(document.getElementById(`adhocAmount${i}`).value);
        const date = new Date(document.getElementById(`adhocDate${i}`).value);
        adhocContributions.push({ amount, date });
    }
    return adhocContributions;
}

function calculateGrowth(monthlyContribution, investmentPeriod, annualRate, startDate, adhocContributions) {
    const monthlyRate = annualRate / 12;
    let balance = 0;
    const balanceData = [];
    let currentDate = new Date(startDate);

    for (let year = 0; year < investmentPeriod; year++) {
        for (let month = 0; month < 12; month++) {
            balance *= (1 + monthlyRate);
            balance += monthlyContribution;

            // Add ad hoc contributions for this month
            const monthlyAdhoc = adhocContributions.filter(contrib => 
                contrib.date <= currentDate && contrib.date > new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
            );
            monthlyAdhoc.forEach(contrib => {
                balance += contrib.amount;
            });

            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        // Push yearly balance data
        balanceData.push({ year: currentDate.getFullYear(), balance });
    }

    return balanceData;
}

function calculateMonthlyPremium(goalAmount, investmentPeriod, annualRate, startDate) {
    let low = 0;
    let high = goalAmount;
    let monthlyContribution = (low + high) / 2;
    const tolerance = 0.01;

    while (high - low > tolerance) {
        const finalBalance = calculateGrowth(monthlyContribution, investmentPeriod, annualRate, startDate, []).pop().balance;

        if (Math.abs(finalBalance - goalAmount) < tolerance) {
            break;
        } else if (finalBalance < goalAmount) {
            low = monthlyContribution;
        } else {
            high = monthlyContribution;
        }

        monthlyContribution = (low + high) / 2;
    }

    return monthlyContribution;
}

function displayFutureValueResults(lowInflationData, highInflationData, startDate) {
    const resultsDiv = document.getElementById('results');
    let tableHTML = `
        <h2 class="text-xl font-bold  text-red-600">Future Value Results</h2>
        <table class="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th class="px-4 py-2  text-red-600 text-left">Year</th>
                    <th class="px-4 py-2  text-red-600 text-left">Low Inflation (7%)</th>
                    <th class="px-4 py-2  text-red-600 text-left">High Inflation (10%)</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 0; i < lowInflationData.length; i++) {
        const lowBalance = lowInflationData[i].balance.toFixed(2);
        const highBalance = highInflationData[i].balance.toFixed(2);
        tableHTML += `
            <tr>
                <td class="px-4 py-2">${lowInflationData[i].year}</td>
                <td class="px-4 py-2">LSL${lowBalance}</td>
                <td class="px-4 py-2">LSL${highBalance}</td>
            </tr>
        `;
    }

    tableHTML += `</tbody></table>`;
    resultsDiv.innerHTML = tableHTML;
}

function displayMonthlyPremiumResults(lowMonthlyPremium, highMonthlyPremium) {
    const resultsDiv = document.getElementById('results');

    resultsDiv.innerHTML = `
        <h2 class="text-xl font-bold text-red-600">Monthly Premium Results</h2>
        <table class="table-auto w-full mt-4">
            <thead>
                <tr>
                    <th class="px-4 py-2 text-red-600 text-left">Scenario</th>
                    <th class="px-4 py-2  text-red-600 text-left">Required Monthly Premium (LSL)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="px-4 py-2">Low Inflation (6%)</td>
                    <td class="px-4 py-2">LSL${lowMonthlyPremium.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="px-4 py-2">High Inflation (10%)</td>
                    <td class="px-4 py-2">LSL${highMonthlyPremium.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function updateChart(lowInflationData, highInflationData, investmentPeriod, startDate) {
    const ctx = document.getElementById('investmentChart').getContext('2d');

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: lowInflationData.map(data => data.year), // Actual years on x-axis
            datasets: [
                {
                    label: 'Low Inflation (6%)',
                    data: lowInflationData.map(data => data.balance),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'High Inflation (10%)',
                    data: highInflationData.map(data => data.balance),
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Balance ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Years'
                    }
                }
            }
        }
    });
}

toggleInputs();
