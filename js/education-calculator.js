
let childrenArray = [];
let childrenData = [];


const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LS', {
        style: 'currency',
        currency: 'LSL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

const calculateMonthlyPremium = (goalAmount, yearsBeforeStudies, durationOfStudy, annualRate) => {
    const monthlyRate = Math.pow(1 + annualRate, 1/12) - 1;
    const monthlyPremium = goalAmount / 
        (((1 + annualRate) ** yearsBeforeStudies - 1) / (monthlyRate / (1 + monthlyRate))) / 
        (1 - 0.02);
    return monthlyPremium;
};


const updateCalculateButton = () => {
    const calculateBtn = document.getElementById('calculateBtn');
    if (childrenArray.length === 0) {
        calculateBtn.classList.add('hidden');
    } else {
        calculateBtn.classList.remove('hidden');
    }
};

const addChild = () => {

    const childName = document.getElementById('childName').value;
    const annualCost = parseFloat(document.getElementById('annualCost').value);
    const studyDuration = parseFloat(document.getElementById('studyDuration').value);
    const yearsBeforeStart = parseFloat(document.getElementById('yearsBeforeStart').value);


    if (!childName || !annualCost || !studyDuration || !yearsBeforeStart) {
        alert('Please fill in all fields');
        return;
    }

    const childCount = childrenArray.length + 1;
    const futureValue = annualCost * studyDuration;
    
 
    const annualHighRate = 0.10;
    const annualLowRate = 0.06;
    const monthlyHighPrem = calculateMonthlyPremium(futureValue, yearsBeforeStart, studyDuration, annualHighRate);
    const monthlyLowPrem = calculateMonthlyPremium(futureValue, yearsBeforeStart, studyDuration, annualLowRate);


    const factorSums = calculateFactorSums(studyDuration, annualLowRate, annualHighRate);
    const lowContribution = (studyDuration / factorSums.low) * monthlyLowPrem;
    const highContribution = (studyDuration / factorSums.high) * monthlyHighPrem;


    const childData = {
        id: childCount,
        childName,
        annualCost,
        studyDuration,
        yearsBeforeStart,
        futureValue,
        lowContribution,
        highContribution,
        monthlyHighPrem,
        monthlyLowPrem
    };
    
    childrenArray.push(childData);
    childrenData.push(childData);

    createChildCard(childData);

    updateCalculateButton();
    resetForm();
};

const calculateFactorSums = (duration, lowRate, highRate) => {
    let lowSum = 0;
    let highSum = 0;
    
    for (let i = 0; i < duration; i++) {
        lowSum += Math.pow(1 + lowRate, i);
        highSum += Math.pow(1 + highRate, i);
    }
    
    return { low: lowSum, high: highSum };
};

const createChildCard = (childData) => {
    const container = document.getElementById('childrenContainer');
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105';
    card.dataset.id = childData.id;

    card.innerHTML = `
        <div class="p-6 bg-gradient-to-r from-blue-50 to-blue-100">
            <div class="flex justify-between items-start">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                        ${childData.id}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-gray-900">${childData.childName}</h3>
                        <p class="text-sm text-gray-600">Education Plan</p>
                    </div>
                </div>
                <button onclick="removeChildCard(this)" class="p-1 hover:bg-red-100 rounded-full transition-colors duration-200">
                    <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="p-6 space-y-6">
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-gray-600">Annual Cost</p>
                    <p class="text-lg font-bold text-gray-900">${formatCurrency(childData.annualCost)}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-gray-600">Total Cost</p>
                    <p class="text-lg font-bold text-gray-900">${formatCurrency(childData.futureValue)}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-gray-600">Years Before Start</p>
                    <p class="text-lg font-bold text-gray-900">${childData.yearsBeforeStart} years</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-gray-600">Study Duration</p>
                    <p class="text-lg font-bold text-gray-900">${childData.studyDuration} years</p>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="bg-green-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-green-600">Conservative Monthly Premium (6%)</p>
                    <p class="text-lg font-bold text-green-900">${formatCurrency(childData.monthlyLowPrem)}</p>
                    <p class="text-sm text-green-600">Monthly Contribution: ${formatCurrency(childData.lowContribution)}</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-blue-600">Aggressive Monthly Premium (10%)</p>
                    <p class="text-lg font-bold text-blue-900">${formatCurrency(childData.monthlyHighPrem)}</p>
                    <p class="text-sm text-blue-600">Monthly Contribution: ${formatCurrency(childData.highContribution)}</p>
                </div>
            </div>
        </div>
    `;

    container.appendChild(card);
};

const removeChildCard = (button) => {
    const card = button.closest('[data-id]');
    const id = parseInt(card.dataset.id);

    childrenArray = childrenArray.filter(child => child.id !== id);
    childrenData = childrenData.filter(child => child.id !== id);
    

    card.remove();
    

    updateCalculateButton();
};

const resetForm = () => {
    document.getElementById('childName').value = '';
    document.getElementById('annualCost').value = '';
    document.getElementById('studyDuration').value = '';
    document.getElementById('yearsBeforeStart').value = '';
};

const calculateTotalPremiums = () => {
    const totalContainer = document.getElementById('totalPremiums');
    
    if (!totalContainer || childrenArray.length === 0) return;
    
    const totals = childrenArray.reduce((acc, child) => {
        return {
            conservative: acc.conservative + child.monthlyLowPrem,
            aggressive: acc.aggressive + child.monthlyHighPrem
        };
    }, { conservative: 0, aggressive: 0 });

    totalContainer.innerHTML = `
        <div class="p-6 bg-white rounded-2xl shadow-xl space-y-4">
            <h3 class="text-xl font-bold text-gray-900">Total Monthly Premiums</h3>
            <div class="grid grid-cols-2 gap-4">
                <div class="bg-green-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-green-600">Conservative (6%)</p>
                    <p class="text-lg font-bold text-green-900">${formatCurrency(totals.conservative)}</p>
                </div>
                <div class="bg-blue-50 p-4 rounded-xl">
                    <p class="text-sm font-medium text-blue-600">Aggressive (10%)</p>
                    <p class="text-lg font-bold text-blue-900">${formatCurrency(totals.aggressive)}</p>
                </div>
            </div>
        </div>
    `;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('childForm');
    const calculateBtn = document.getElementById('calculateBtn');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addChild();
    });
    
    calculateBtn.addEventListener('click', calculateTotalPremiums);
});
