// Create event listener on submit button

const submit = document.getElementById('submit')

submit.addEventListener('click', (e) => {
    calculate(e)
    submit.innerHTML = 'Re-Calculate Value'
})

function calculate(e) {
    e.preventDefault()

    let labels = []
    let balances = []

    let startingBalance = parseFloat(document.querySelector('#startingBalance').value)
    const expectedReturn = parseFloat(document.querySelector('#expectedReturn').value) / 100
    const monthlyDeposit = parseFloat(document.querySelector('#monthlyDeposit').value)
    const duration = parseInt(document.querySelector('#duration').value)
    const monthlyReturn = expectedReturn / 12

    if (!startingBalance || !expectedReturn || !monthlyDeposit || !duration) {
        return
    }

    showGrowthDiv()
    removePreviousNumbers()
    //buildValues(labels, balances, duration, startingBalance, monthlyReturn, monthlyDeposit)
    buildValues(labels, balances, duration, startingBalance, expectedReturn, monthlyDeposit);
    createChart(labels, balances)
}

// Show content
function showGrowthDiv() {
    document.querySelector('#report-section').style.opacity = 1
    document.querySelector('#report-section').style.height = 'inherit'
    document.querySelector('#yearBreakdow').style.opacity = 1
    document.querySelector('#yearBreakdow').style.height = 'inherit'
}

// remove previous values
function removePreviousNumbers() {
    document.querySelectorAll('#breakdow p').forEach(
        (elem) => {
            elem.remove()
        }
    )
}

// Loop through items to update starting balance and build 
function buildValues(labels, balances, duration, startingBalance, annualReturn, monthlyDeposit) {
    let balance = startingBalance; // Start with initial balance
    let monthlyReturn = annualReturn / 12; // Monthly return based on annual return

    for (let i = 0; i <= duration * 12; i++) {
        const newDiv = document.createElement('p');
        newDiv.classList = 'text-center col-sm-4 col-md-3';

        if (i === 0) {
            // For the initial balance (before interest calculations)
            balances.push(balance.toFixed(2));
            labels.push(`Year 0`);

            balanceEnd = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'LSL',
                minimumFractionDigits: 2,
            }).format(balance);

            newDiv.innerHTML = `Year 0 <span> ${balanceEnd} </span>`;
            breakdow.appendChild(newDiv);
        } else {
            // For each month, apply interest and add monthly deposit
            balance = balance * (1 + monthlyReturn) + monthlyDeposit;

            // Only update yearly (i % 12 === 0)
            if (i % 12 === 0) {
                const year = i / 12;

                balances.push(balance.toFixed(2));
                labels.push(`Year ${year}`);

                balanceEnd = Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'LSL',
                    minimumFractionDigits: 2,
                }).format(balance);

                newDiv.innerHTML = `Year ${year} <span> ${balanceEnd} </span>`;
                breakdow.appendChild(newDiv);
            }
        }
    }
    document.querySelector('#totalValue').innerHTML = `Total Value after ${duration} years: <span>${balanceEnd}</span>`;
}



// Create chart
function createChart(labels, balances) {
    // Destroy previous canvas
    document.getElementById('growthChart').remove()

    // Create new canvas
    let canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'growthChart')
    document.querySelector('#chartContainer').appendChild(canvas)

    // Fill canvas with chart
    var ctx = document.getElementById('growthChart').getContext('2d')
    var growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Growth',
                data: balances,
                borderColor: 'rgba(0, 50, 200, .3)',
                backgroundColor: 'rgba(0, 50, 200, .3)',
                borderWidth: 2,
                pointRadius: 4,
                hoverRadius: 4,
                hoverBorderWidth: 2,
                hitRadius: 2,
                pointStyle: 'circle',
                pointBackgroundColor: 'rgba(0, 50, 200, .3)'
            },],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio:4,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'rgb(0, 0, 0)',
                        beginAtZero: true
                    },
                },],
                xAxes: [{
                    ticks: {
                        beginAtZero: false,
                        fontColor: 'rgb(0, 50, 0)',

                    },
                },],
            },
            legend: {
                display: false,
            },
        },
    })
}
