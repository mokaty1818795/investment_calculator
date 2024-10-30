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
          <h3 class="text-xl font-semibold text-gray-900">Child ${childCount}</h3>
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

    console.log(childrenArray);
    updateCalculateButton();
}


function calculate() {
    alert('Calculation feature will be implemented here');
}

function calculateMonthlyPremium(goalAmount, yearsBeforeStudies, durationOfStudy, annualRate, commissionRecoveryRate) {

  const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;
  const d = monthlyRate / (1 + monthlyRate);
  const totalInvestmentPeriodYears = yearsBeforeStudies;
  const totalInvestmentPeriodMonths = totalInvestmentPeriodYears * 12;
  const growthFactor = Math.pow(1 + annualRate, totalInvestmentPeriodYears) - 1;

  let geometricSum = 0;
  for (let i = 0; i < durationOfStudy; i++) {
      geometricSum += Math.pow(1 + monthlyRate, i);
  }

  const monthlyPremium = goalAmount / ((growthFactor / d) * geometricSum * (1 - commissionRecoveryRate));

  return monthlyPremium;
}

// // Example usage:
// const goalAmount = 50000; // Desired investment goal
// const yearsBeforeStudies = 3; // Years before studies start
// const durationOfStudy = 4; // Duration of study in years
// const annualRate = 0.05; // Annual interest rate (5%)
// const commissionRecoveryRate = 0.02; // Commission recovery rate (2%)

// const premium = calculateMonthlyPremium(goalAmount, yearsBeforeStudies, durationOfStudy, annualRate, commissionRecoveryRate);
// console.log("Monthly Premium:", premium);

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
        let totalMonthlyContribution = 0;
        let totalEducationCost = 0;
     
        childrenArray.forEach(child => {
            const futureValue = child.annualCost * child.studyDuration;

          const annualHighrate= 0.10;
          const annualLowrate= 0.06;
          const commissionRecoveryRate= 0.02;

           const monthlyHighPrem= calculateMonthlyPremium(futureValue,child.yearsBeforeStart,child.studyDuration,annualHighrate,commissionRecoveryRate);
           const monthlyLowPrem= calculateMonthlyPremium(futureValue,child.yearsBeforeStart,child.studyDuration,annualLowrate,commissionRecoveryRate);


     
            // Monthly Contribution Calculation
            const monthlyContributionLow = (futureValue * 0.06 / 12) / ((1 + 0.06 / 12) ** (child.yearsBeforeStart * 12) - 1);
            const monthlyContributionHigh = (futureValue* 0.10 / 12) / ((1 + 0.10 / 12) ** (child.yearsBeforeStart * 12) - 1);
            totalMonthlyContribution += monthlyContributionLow + monthlyContributionHigh; // Total contributions
            totalEducationCost +=futureValue // Total education cost

            console.log("MonthlyContribution Low",monthlyLowPrem);
            console.log("MonthlyContribution High",monthlyHighPrem);
            
        });
     
        displayResults(monthlyLowPrem, futureValue);
    }
     
    function displayResults(totalMonthlyContribution, totalEducationCost) {
        document.getElementById("totalMonthlyContribution").textContent = `R${totalMonthlyContribution.toFixed(2)}`;
        document.getElementById("totalEducationCost").textContent = `R${totalEducationCost.toFixed(2)}`;
        document.getElementById("resultsContainer").classList.remove("hidden");
    }

    // function calculateEducationPlan() {
    //     const childName = document.getElementById("childName").value;
    //     const annualCost = parseFloat(document.getElementById("annualCost").value);
    //     const studyDuration = parseInt(document.getElementById("studyDuration").value);
    //     const yearsBeforeStart = parseInt(document.getElementById("yearsBeforeStart").value);
    //     const contributeDuring = document.querySelector('input[name="contributeDuring"]:checked').value;
    //     console.log(childName);
        
    //     const lowReturnRate = 0.06;  // 6% for conservative scenario
    //     const highReturnRate = 0.10; // 10% for aggressive scenario

    //     // Calculate total education cost
    //     const totalCost = annualCost * studyDuration;

    //     const savingPeriod = contributeDuring === "yes" 
    //         ? yearsBeforeStart + studyDuration 
    //         : yearsBeforeStart;

    //     // Calculate for low return rate (6%)
    //     const lowFutureValue = totalCost * (1 + lowReturnRate) ** yearsBeforeStart;
    //     const lowMonthlyRate = lowReturnRate / 12;
    //     const numberOfPayments = savingPeriod * 12;
    //     const lowMonthlyContribution = (lowFutureValue * lowMonthlyRate) / 
    //         ((1 + lowMonthlyRate) ** numberOfPayments - 1);




    //     // Calculate for high return rate (10%)
    //     const highFutureValue = totalCost * (1 + highReturnRate) ** yearsBeforeStart;
    //     const highMonthlyRate = highReturnRate / 12;
    //     const highMonthlyContribution = (highFutureValue * highMonthlyRate) / 
    //         ((1 + highMonthlyRate) ** numberOfPayments - 1);

    //     // Display results
    //     educationResults.classList.remove("hidden");
        
    //     // Format currency values
    //     const formatCurrency = (value) => {
    //         return `R ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
    //     };
        
    //     // Update all display locations
    //     const updateValue = (id, value) => {
    //         const elements = document.querySelectorAll(`#${id}`);
    //         elements.forEach(element => {
    //             element.textContent = formatCurrency(value);
    //         });
    //     };

    //     // Update main results
    //     updateValue("totalCostResult", totalCost);
    //     updateValue("lowMonthlyContributionResult", lowMonthlyContribution);
    //     updateValue("lowTotalSavingsResult", lowFutureValue);
    //     updateValue("highMonthlyContributionResult", highMonthlyContribution);
    //     updateValue("highTotalSavingsResult", highFutureValue);

    //     // Update secondary display
       
    //     document.getElementById("childDetails").textContent = childName;
      
    //     document.getElementById("lowMonthlyContribution2").textContent = formatCurrency(lowMonthlyContribution);
    //     document.getElementById("lowTotalSavings2").textContent = formatCurrency(lowFutureValue);
    //     document.getElementById("highMonthlyContribution2").textContent = formatCurrency(highMonthlyContribution);
    //     document.getElementById("highTotalSavings2").textContent = formatCurrency(highFutureValue);
    // }


});













