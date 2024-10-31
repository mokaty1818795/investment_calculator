function resetCalculator() {
    // Reset all input fields
    document.getElementById("annualCost").value = "";
    document.getElementById("studyDuration").value = "";
    document.getElementById("yearsBeforeStart").value = "";
    
    // Hide results
    document.getElementById("educationResults").classList.add("hidden");
}

let savingsChart = null;
const childrenArray= [];
const childrenData = [];
const cliCkedCount=0;

function updateSavingsChart(yearsBeforeStart, lowMonthlyContribution, highMonthlyContribution) {
// Destroy existing chart if it exists
if (savingsChart) {
    savingsChart.destroy();
}

const years = Array.from({length: yearsBeforeStart}, (_, i) => `Year ${i + 1}`);
const lowReturnRate = 0.06;
const highReturnRate = 0.10;

// Calculate cumulative savings for each year
const lowSavings = [];
const highSavings = [];
let lowAccumulated = 0;
let highAccumulated = 0;


for (let i = 0; i < yearsBeforeStart; i++) {
    // Add monthly contributions for the year
    lowAccumulated += lowMonthlyContribution * 12;
    highAccumulated += highMonthlyContribution * 12;

    // Add returns
    lowAccumulated *= (1 + lowReturnRate);
    highAccumulated *= (1 + highReturnRate);

    lowSavings.push(lowAccumulated);
    highSavings.push(highAccumulated);
}

}


const updateSelectedCount=(count)=>{

    cliCkedCount = count;
    console.log(cliCkedCount,"Here I Am A Count")
}

const updateCalculateButton=()=>{
    console.log(childrenArray);
    if(childrenArray.length == 0){
        document.getElementById('calculateBtn').classList.add('hidden');
     }else{
        console.log("I am here Man PLease help ME");
        
        document.getElementById('calculateBtn').classList.remove('hidden');;
     }
    
}

function addChild() {
    const childrenContainer = document.getElementById('childrenContainer');
    const childCount = childrenContainer.children.length + 1;
    

    const childNames= document.getElementById("childName").value;
    const annualCost= document.getElementById("annualCost").value;
    const studyDuration= document.getElementById("studyDuration").value;
    const yearsBeforeStart= document.getElementById("yearsBeforeStart").value;


    childrenArray.push({
        id:childCount,
        childNames: childNames,
        annualCost: annualCost,
        studyDuration: studyDuration,
        yearsBeforeStart:yearsBeforeStart
    });

    console.log(childrenArray.length)

    updateCalculateButton();
     console.log(childrenArray)

    const childDiv = document.createElement('div');
    childDiv.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200 relative';
    childDiv.dataset.id = childCount;

    childDiv.innerHTML = `
        <!-- Close Button -->
        <button onclick="removeChildCard(this)" class="absolute top-4 right-4 text-red-500 hover:text-red-700">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Card Header -->
        <div class="mb-4 text-center">
          <h3 class="text-xl font-semibold text-gray-900"> ${childCount}</h3>
          <p class="text-gray-500 text-sm">${childNames}'s Education Savings Plan</p>
        </div>

        <!-- Information Section -->
        <div class="grid grid-cols-1 gap-4 text-gray-700">
          
          <!-- Educational Costs -->
          <div class="flex items-center p-4 bg-blue-50 rounded-lg">
            <svg class="w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 13h2v5h-4v-5h2zm0-8h-2v2h2V5z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-blue-700">Educational Anual Costs</p>
              <p class="text-lg font-semibold">${annualCost}</p>
            </div>
          </div>
          
          <!-- Study Duration -->
          <div class="flex items-center p-4 bg-green-50 rounded-lg">
            <svg class="w-6 h-6 mr-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 13h5v-2h-5V8l-4 4 4 4v-3z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-green-700">Study Duration</p>
              <p class="text-lg font-semibold">${studyDuration}</p>
            </div>
          </div>
          
          <!-- Years Before Study -->
          <div class="flex items-center p-4 bg-yellow-50 rounded-lg">
            <svg class="w-6 h-6 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM13 16h-2V8h2v8zm-2-9h2V5h-2v2z"></path>
            </svg>
            <div>
              <p class="text-sm font-medium text-yellow-700">Years Before Study</p>
              <p class="text-lg font-semibold">${yearsBeforeStart}</p>
            </div>
          </div>
        </div>
    `;
    childrenContainer.appendChild(childDiv);
}


function removeChildCard(button) {
    console.log(childrenArray);
    const card = button.closest('div');
    const cardId = Number(card.dataset.id);
    console.log(cardId); 
    card.remove();

    const index = childrenArray.findIndex(child => child.id ===  cardId);
    if (index > -1) {
        childrenArray.splice(index, 1);
    }

    const index1 = childrenData.findIndex(child => child.id ===  cardId);
    if (index > -1) {
      childrenData.splice(index1, 1);
    }

    console.log(childrenArray);
    updateCalculateButton();
}




function calculate() {
    alert('Calculation feature will be implemented here');
}

function calculateMonthlyPremium(goalAmount, yearsBeforeStudies, durationOfStudy, annualRate) {

  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

  let geometricSum = 0;
  for (let i = 0; i < durationOfStudy; i++) {
      geometricSum += Math.pow(1 + monthlyRate, i);
  }

  const monthlyPremium = goalAmount /(((1 + annualRate) ** yearsBeforeStudies - 1) /(monthlyRate / (1 + monthlyRate))) /(1 - 0.02);

  return monthlyPremium;
}


document.addEventListener("DOMContentLoaded", function () {
    const calculationType = document.getElementById("calculationType");
    const educationSection = document.getElementById("educationSection");
    const monthlyContributionInput = document.getElementById(
        "monthlyContributionInput"
    );
    const educationResults = document.getElementById("educationResults");
    const calculateBtn = document.getElementById("calculateBtn");



    calculateBtn.addEventListener("click", function () {
        calculateResults();
    });

  function calculateResults() {
    // Check if childrenArray exists and has data
    if (!childrenArray || childrenArray.length === 0) {
        console.warn("No children data available to process");
        return; // Exit the function if no data
    }

    // Reset childrenData array
    
    let totalMonthlyContribution = 0;
    let totalEducationCost = 0;

    childrenArray.forEach(child => {
        // Validate required child properties
        if (!child.annualCost || !child.studyDuration || !child.yearsBeforeStart) {
            console.warn("Missing required data for child:", child);
            return; // Skip this iteration if data is incomplete
        }

        const futureValue = child.annualCost * child.studyDuration;
        const annualHighrate = 0.10;
        const annualLowrate = 0.06;

        const monthlyHighPrem = calculateMonthlyPremium(futureValue, child.yearsBeforeStart, child.studyDuration, annualHighrate);
        const monthlyLowPrem = calculateMonthlyPremium(futureValue, child.yearsBeforeStart, child.studyDuration, annualLowrate);

        const monthlyContributionLow = (futureValue * annualLowrate / 12) / ((1 + annualLowrate / 12) ** (child.yearsBeforeStart * 12) - 1);
        const monthlyContributionHigh = (futureValue * annualHighrate / 12) / ((1 + annualHighrate / 12) ** (child.yearsBeforeStart * 12) - 1);
        
        totalMonthlyContribution += monthlyContributionLow + monthlyContributionHigh;
        totalEducationCost += futureValue;

        let factorSum = 0;
        let highfactorSum = 0;

        for (let i = 0; i <= child.studyDuration - 1; i++) {
            const factorValue = (1 + annualLowrate) ** i;
            const highFactorValue = (1 + annualHighrate) ** i;
            factorSum += factorValue;
            highfactorSum += highFactorValue;
        }

        const finalFactorSum = child.studyDuration / factorSum;
        const finalHighFactorSum = child.studyDuration / highfactorSum;
        const lowContribution = finalFactorSum * monthlyLowPrem;
        const highContribution = finalHighFactorSum * monthlyHighPrem;

        childrenData.push({
            id: child.id,
            name: child.childNames || 'Unnamed Child',
            lowContribution: lowContribution.toFixed(2),
            highContribution: highContribution.toFixed(2),
            monthlyLowPrem: monthlyLowPrem.toFixed(2),
            monthlyHighPrem: monthlyHighPrem.toFixed(2),
            futureValue: futureValue.toFixed(2)
        });
    });

    // Only call displayResults if we have data to display
    if (childrenData.length >= 0) {
        displayResults(childrenData);
    }
}

function displayResults(childrenData) {
    const childList = document.querySelector('#child-list');
    if (!childList) {
        console.error("Child list container not found");
        return;
    }

    // Clear existing content
    childList.innerHTML = '';

    childrenData.forEach((data, index) => {
        const listItem = document.createElement('li');
        listItem.className = "py-3 sm:py-4";
        listItem.innerHTML = `
        <div class="flex items-center bg-red-50 rounded-2xl p-4 space-x-4">
        <div class="flex-shrink-0">
            <div class="w-12 h-12 rounded-full border-2 border-gray-200  bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                <span class="text-lg font-bold text-gray-600">${index + 1}</span>
            </div>
        </div>
        <div class="flex-1 min-w-0">
            <p class="text-lg font-semibold text-red-600 truncate ">
                ${data.name ? data.name : ''}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm text-black">
                <div class="space-y-1">
                    <p class="flex justify-between">
                        <span class="font-medium text-black">Low Contribution:</span>
                        <span class="text-black">${ new Intl.NumberFormat('en-LS', {
                          style: 'currency',
                          currency: 'LSL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                          }).format(data.lowContribution)}</span>
                    </p>
                    <p class="flex justify-between">
                        <span class="font-medium text-black">High Contribution:</span>
                        <span class="text-black">${ new Intl.NumberFormat('en-LS', {
                          style: 'currency',
                          currency: 'LSL',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                          }).format(data.highContribution)}</span>
                    </p>
                </div>
            </div>
            <div class="mt-2 text-sm">
                <p class="flex justify-between items-center">
                    <span class="font-medium  text-black ">Future Value:</span>
                    <span class="text-lg font-bold text-black">${
                      new Intl.NumberFormat('en-LS', {
                        style: 'currency',
                        currency: 'LSL',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        }).format(data.futureValue)
                    }</span>
                </p>
            </div>
        </div>
    </div>
        `;
        childList.appendChild(listItem);
    });
}

});













