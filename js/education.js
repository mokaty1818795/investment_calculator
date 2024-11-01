function resetCalculator() {
    document.getElementById("annualCost").value = "";
    document.getElementById("studyDuration").value = "";
    document.getElementById("yearsBeforeStart").value = "";
    document.getElementById("educationResults").classList.add("hidden");
}

let savingsChart = null;
const childrenArray= [];
const childrenData = [];
const cliCkedCount=0;

function updateSavingsChart(yearsBeforeStart, lowMonthlyContribution, highMonthlyContribution) {

if (savingsChart) {
    savingsChart.destroy();
}


const lowReturnRate = 0.06;
const highReturnRate = 0.10;

const lowSavings = [];
const highSavings = [];
let lowAccumulated = 0;
let highAccumulated = 0;


for (let i = 0; i < yearsBeforeStart; i++) {
    lowAccumulated += lowMonthlyContribution * 12;
    highAccumulated += highMonthlyContribution * 12;

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
  const childNames = document.getElementById("childName").value;
  const annualCost = parseFloat(document.getElementById("annualCost").value);
  const studyDuration = parseFloat(document.getElementById("studyDuration").value);
  const yearsBeforeStart = parseFloat(document.getElementById("yearsBeforeStart").value);

  // Calculate results for this child
  const futureValue = annualCost * studyDuration;
  const annualHighrate = 0.10;
  const annualLowrate = 0.06;
  const monthlyHighPrem = calculateMonthlyPremium(futureValue, yearsBeforeStart, studyDuration, annualHighrate);
  const monthlyLowPrem = calculateMonthlyPremium(futureValue, yearsBeforeStart, studyDuration, annualLowrate);

  let factorSum = 0;
  let highfactorSum = 0;

  for (let i = 0; i <= studyDuration - 1; i++) {
      const factorValue = (1 + annualLowrate) ** i;
      const highFactorValue = (1 + annualHighrate) ** i;
      factorSum += factorValue;
      highfactorSum += highFactorValue;
  }

  const finalFactorSum = studyDuration / factorSum;
  const finalHighFactorSum = studyDuration / highfactorSum;
  const lowContribution = finalFactorSum * monthlyLowPrem;
  const highContribution = finalHighFactorSum * monthlyHighPrem;

  childrenArray.push({
      id: childCount,
      childNames: childNames,
      annualCost: annualCost,
      studyDuration: studyDuration,
      yearsBeforeStart: yearsBeforeStart
  });

  updateCalculateButton();
  const childDiv = document.createElement('div');
  childDiv.className = 'bg-white p-4 rounded-lg shadow-md border border-gray-200 relative mb-4';
  childDiv.dataset.id = childCount;

  childDiv.innerHTML = `
    <div class="relative overflow-hidden">
        <!-- Decorative Background Element -->
        <div class="absolute top-0 right-0 w-32 h-32 opacity-5">
            <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
            </svg>
        </div>

        <div class="relative">
            <!-- Header Section with Gradient Background -->
            <div class="flex items-start justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
                <!-- Left Section: Child Info -->
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center transform transition-transform hover:scale-105">
                        <span class="text-blue-600 font-bold text-lg">${childCount}</span>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg tracking-tight">${childNames}</h3>
                        <div class="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                            <span class="flex items-center">
                                ${studyDuration} years study
                            </span>
                            <span class="text-blue-300">•</span>
                            <span class="flex items-center">
                                Starts in ${yearsBeforeStart} years
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Close Button with Animation -->
                <button onclick="removeChildCard(this)" class="group p-1 hover:bg-red-50 rounded-full transition-colors duration-200">
                    <svg class="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Financial Information Cards -->
            <div class="grid grid-cols-2 gap-3 p-4 bg-white">
                <div class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 transform transition-transform hover:scale-[1.02]">
                    <div class="relative z-10">
                        <div class="text-sm font-medium text-blue-800">Annual Cost</div>
                        <div class="text-sm font-bold text-blue-900 mt-1">
                            ${new Intl.NumberFormat('en-LS', {
                                style: 'currency',
                                currency: 'LSL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(annualCost)}
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 opacity-10 transform translate-x-2 translate-y-2">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>

                <div class="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 transform transition-transform hover:scale-[1.02]">
                    <div class="relative z-10">
                        <div class="text-sm font-medium text-green-800">Total Fee</div>
                        <div class="text-sm font-bold text-green-900 mt-1">
                            ${new Intl.NumberFormat('en-LS', {
                                style: 'currency',
                                currency: 'LSL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(futureValue)}
                        </div>
                    </div>
                    <div class="absolute bottom-0 right-0 opacity-10 transform translate-x-2 translate-y-2">
                        <svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Monthly Contributions Section -->
            <div class="p-4 bg-gradient-to-b from-white to-gray-50 rounded-b-lg">
                <div class="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div class="flex-1">
                        <div class="text-sm font-medium text-gray-600 mb-2">Monthly Contribution Range</div>
                        <div class="text-sm font-bold text-gray-800 flex items-baseline space-x-2">
                            <span>${new Intl.NumberFormat('en-LS', {
                                style: 'currency',
                                currency: 'LSL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(lowContribution)}</span>
                            <span class="text-gray-400 font-normal">-</span>
                            <span>${new Intl.NumberFormat('en-LS', {
                                style: 'currency',
                                currency: 'LSL',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                            }).format(highContribution)}</span>
                        </div>
                    </div>
                    <div class="ml-4 pl-4 border-l border-gray-200">
                        <div class="text-sm text-gray-600 space-y-1">
                            <div class="flex items-center">
                                <svg class="w-3 h-3 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>Low rate: 6%</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-3 h-3 text-green-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span>High rate: 10%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
  
  childrenContainer.appendChild(childDiv);

  // Add to childrenData array
  childrenData.push({
      id: childCount,
      name: childNames,
      lowContribution: lowContribution.toFixed(2),
      highContribution: highContribution.toFixed(2),
      monthlyLowPrem: monthlyLowPrem.toFixed(2),
      monthlyHighPrem: monthlyHighPrem.toFixed(2),
      futureValue: futureValue.toFixed(2)
  });
}




// function addChild() {


//     const childrenContainer = document.getElementById('childrenContainer');
//     const childCount = childrenContainer.children.length + 1;
//     const childNames= document.getElementById("childName").value;
//     const annualCost= document.getElementById("annualCost").value;
//     const studyDuration= document.getElementById("studyDuration").value;
//     const yearsBeforeStart= document.getElementById("yearsBeforeStart").value;


//     childrenArray.push({
//         id: childCount,
//         childNames: childNames,
//         annualCost: annualCost,
//         studyDuration: studyDuration,
//         yearsBeforeStart:yearsBeforeStart
//     });



//     updateCalculateButton();
//     const childDiv = document.createElement('div');
//     childDiv.className = 'bg-white p-6 rounded-lg shadow-md border border-gray-200 relative';
//     childDiv.dataset.id = childCount;

//     childDiv.innerHTML = `
//         <!-- Close Button -->
//         <button onclick="removeChildCard(this)" class="absolute top-4 right-4 text-red-500 hover:text-red-700">
//           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
//           </svg>
//         </button>
        
//         <!-- Card Header -->
//         <div class="mb-4 text-center">
//           <h3 class="text-xl font-semibold text-gray-900"> ${childCount}</h3>
//           <p class="text-gray-500 text-sm">${childNames}'s Education Savings Plan</p>
//         </div>

//         <div class="grid grid-cols-1 gap-4 text-gray-700">
//           <div class="flex items-center p-4 bg-blue-50 rounded-lg">
//             <svg class="w-6 h-6 mr-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 13h2v5h-4v-5h2zm0-8h-2v2h2V5z"></path>
//             </svg>
//             <div>
//               <p class="text-sm font-medium text-blue-700">Educational Annual Costs</p>
//               <p class="text-lg font-semibold">${
//                 new Intl.NumberFormat('en-LS', {
//                   style: 'currency',
//                   currency: 'LSL',
//                   minimumFractionDigits: 2,
//                   maximumFractionDigits: 2
//                   }).format(annualCost)
//               }</p>
//             </div>
//           </div>
          
//           <!-- Study Duration -->
//           <div class="flex items-center p-4 bg-green-50 rounded-lg">
//             <svg class="w-6 h-6 mr-3 text-green-500" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM12 13h5v-2h-5V8l-4 4 4 4v-3z"></path>
//             </svg>
//             <div>
//               <p class="text-sm font-medium text-green-700">Study Duration</p>
//               <p class="text-lg font-semibold">${studyDuration}</p>
//             </div>
//           </div>
          
//           <!-- Years Before Study -->
//           <div class="flex items-center p-4 bg-yellow-50 rounded-lg">
//             <svg class="w-6 h-6 mr-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM13 16h-2V8h2v8zm-2-9h2V5h-2v2z"></path>
//             </svg>
//             <div>
//               <p class="text-sm font-medium text-yellow-700">Years Before Study</p>
//               <p class="text-lg font-semibold">${yearsBeforeStart}</p>
//             </div>
//           </div>
//         </div>
//     `;
//     childrenContainer.appendChild(childDiv);
// }


function removeChildCard(button) {
    console.log(childrenArray);
    const card = button.closest('div');
    const cardId = Number(card.dataset.id);
    console.log(cardId); 
    card.remove();

    const index = childrenArray.findIndex(child => child.id ===  cardId);
    if (index > -1) {
        childrenArray.splice(index, 1);
    };
    updateCalculateButton();
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

  
    const calculateBtn = document.getElementById("calculateBtn");
    calculateBtn.addEventListener("click", function () {
        calculateResults();
    });
  
  let previousChildrenArray = JSON.stringify([]);

  const currentChildrenArrayJSON = JSON.stringify(childrenArray);
  if (currentChildrenArrayJSON === previousChildrenArray) {
    console.warn("childrenArray has not been updated. Skipping data push.");
    return;
  }


   // Filter childrenData to keep only items that match children in childrenArray by unique identifier
   childrenData = childrenData.filter(childData =>
    childrenArray.some(child => child.childNames === childData.name)
  );

  function calculateResults() {
    if (!childrenArray || childrenArray.length === 0) {
        console.warn("No children data available to process");
        return;
    }

    let totalMonthlyContribution = 0;
    let totalEducationCost = 0;
    childrenData.length = 0; 

    childrenArray.forEach(child => {
        if (!child.annualCost || !child.studyDuration || !child.yearsBeforeStart) {
            console.warn("Missing required data for child:", child);
            return;
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
            id:child.id,
            name: child.childNames || 'Unnamed Child',
            lowContribution: lowContribution.toFixed(2),
            highContribution: highContribution.toFixed(2),
            monthlyLowPrem: monthlyLowPrem.toFixed(2),
            monthlyHighPrem: monthlyHighPrem.toFixed(2),
            futureValue: futureValue.toFixed(2)
        });



    });

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













