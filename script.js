// State management
const state = {
    currentScreen: 1,
    installationType: null,
    uploadedFile: null,
    extractedData: null,
    powerRequirement: 0,
    selectedBrand: null,
    selectedInverter: null
};

// Screen navigation
function showScreen(screenNumber) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(`screen-${screenNumber}`).classList.add('active');
    state.currentScreen = screenNumber;
}

// Installation type selection
document.querySelectorAll('.installation-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.installation-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        state.installationType = this.dataset.type;
    });
});

// Next button from screen 1
document.getElementById('next-1')?.addEventListener('click', () => {
    if (state.installationType) {
        showScreen(2);
    } else {
        alert('Please select an installation type');
    }
});

// File Upload Functionality
const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('bill-upload');
const uploadPreview = document.getElementById('upload-preview');
const extractedInfo = document.getElementById('extracted-info');
const extractionStatus = document.getElementById('extraction-status');
const calculateBtn = document.getElementById('calculate');

// Click to upload
uploadArea?.addEventListener('click', () => {
    fileInput.click();
});

// Drag and drop
uploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea?.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// File input change
fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFileUpload(file);
    }
});

// Handle file upload
function handleFileUpload(file) {
    // Validate file type
    const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, JPG, or PNG file');
        return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
    }

    state.uploadedFile = file;

    // Show preview
    uploadArea.style.display = 'none';
    uploadPreview.style.display = 'block';
    
    // Update file info
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = formatFileSize(file.size);

    // Simulate extraction (replace with actual API call)
    simulateExtraction();
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Simulate extraction (replace with actual backend API call)
function simulateExtraction() {
    extractionStatus.style.display = 'block';
    extractedInfo.style.display = 'none';

    // Simulate API call delay
    setTimeout(() => {
        // Mock extracted data
        state.extractedData = {
            provider: 'BEST Mumbai',
            pincode: '400078',
            period: '1 month',
            amount: '6450',
            units: '320 kWh',
            date: 'Jan 2024'
        };

        // Hide loading, show extracted info
        extractionStatus.style.display = 'none';
        extractedInfo.style.display = 'block';

        // Populate extracted data
        updateExtractedDisplay();

        // Enable calculate button
        calculateBtn.disabled = false;
    }, 3000);
}

// Update extracted data display
function updateExtractedDisplay() {
    document.getElementById('extracted-provider').textContent = state.extractedData.provider;
    document.getElementById('extracted-pincode').textContent = state.extractedData.pincode;
    document.getElementById('extracted-period').textContent = state.extractedData.period;
    document.getElementById('extracted-amount').textContent = '₹' + state.extractedData.amount;
    document.getElementById('extracted-units').textContent = state.extractedData.units;
    document.getElementById('extracted-date').textContent = state.extractedData.date;
}

// Edit toggle functionality
let isEditing = false;

document.getElementById('edit-toggle')?.addEventListener('click', () => {
    isEditing = true;
    enterEditMode();
});

function enterEditMode() {
    // Hide display paragraphs, show input fields
    document.querySelectorAll('.info-display').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.info-edit').forEach(input => input.style.display = 'block');
    
    // Add editing class to items
    document.querySelectorAll('.info-item').forEach(item => item.classList.add('editing'));
    
    // Populate input fields with current values
    document.getElementById('edit-provider').value = state.extractedData.provider;
    document.getElementById('edit-pincode').value = state.extractedData.pincode;
    document.getElementById('edit-period').value = state.extractedData.period;
    document.getElementById('edit-amount').value = state.extractedData.amount;
    document.getElementById('edit-units').value = state.extractedData.units;
    document.getElementById('edit-date').value = state.extractedData.date;
    
    // Show edit actions, hide edit button and note
    document.getElementById('edit-actions').style.display = 'flex';
    document.getElementById('edit-toggle').style.display = 'none';
    document.getElementById('view-note').style.display = 'none';
}

function exitEditMode() {
    isEditing = false;
    
    // Show display paragraphs, hide input fields
    document.querySelectorAll('.info-display').forEach(p => p.style.display = 'block');
    document.querySelectorAll('.info-edit').forEach(input => input.style.display = 'none');
    
    // Remove editing class
    document.querySelectorAll('.info-item').forEach(item => item.classList.remove('editing'));
    
    // Hide edit actions, show edit button and note
    document.getElementById('edit-actions').style.display = 'none';
    document.getElementById('edit-toggle').style.display = 'flex';
    document.getElementById('view-note').style.display = 'block';
}

// Save edits
document.getElementById('save-edits')?.addEventListener('click', () => {
    // Update state with edited values
    state.extractedData.provider = document.getElementById('edit-provider').value;
    state.extractedData.pincode = document.getElementById('edit-pincode').value;
    state.extractedData.period = document.getElementById('edit-period').value;
    state.extractedData.amount = document.getElementById('edit-amount').value;
    state.extractedData.units = document.getElementById('edit-units').value;
    state.extractedData.date = document.getElementById('edit-date').value;
    
    // Update display
    updateExtractedDisplay();
    
    // Exit edit mode
    exitEditMode();
    
    // Show success message
    showNotification('✓ Changes saved successfully!', 'success');
});

// Cancel edits
document.getElementById('cancel-edits')?.addEventListener('click', () => {
    exitEditMode();
});

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 40px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : '#06b6d4'};
        color: white;
        border-radius: 12px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Remove uploaded file
document.getElementById('remove-bill')?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.uploadedFile = null;
    state.extractedData = null;
    uploadArea.style.display = 'block';
    uploadPreview.style.display = 'none';
    extractedInfo.style.display = 'none';
    fileInput.value = '';
    calculateBtn.disabled = true;
    
    // Reset edit mode if active
    if (isEditing) {
        exitEditMode();
    }
});

// Calculate button (now for uploaded bill)
calculateBtn?.addEventListener('click', () => {
    if (!state.extractedData) {
        alert('Please upload your electricity bill first');
        return;
    }
    
    // Calculate power requirement from extracted data
    const billAmount = parseFloat(state.extractedData.amount.replace(/[^0-9.]/g, ''));
    state.powerRequirement = (billAmount / 1500).toFixed(2);
    
    document.getElementById('power-result').textContent = `${state.powerRequirement}kW`;
    document.getElementById('bill-display').textContent = billAmount.toLocaleString();
    
    // Calculate and populate dashboard data
    calculateDashboardData(billAmount);
    
    showScreen(3);
    
    // Show dashboard with scroll animation
    setTimeout(() => {
        const dashboard = document.getElementById('analytics-dashboard');
        if (dashboard) {
            dashboard.classList.add('visible');
        }
    }, 500);
});

// Calculate comprehensive dashboard data
function calculateDashboardData(monthlyBill) {
    // Assumptions and constants
    const avgTariff = 8.5; // Average tariff per unit in rupees
    const monthlyUnits = Math.round(monthlyBill / avgTariff);
    const annualUnits = monthlyUnits * 12;
    const annualCost = monthlyBill * 12;
    
    // Solar system calculations
    const systemSize = parseFloat(state.powerRequirement);
    const systemSizeWithBuffer = (systemSize * 1.15).toFixed(1); // 15% buffer for losses
    const dailyGeneration = (systemSize * 4).toFixed(1); // 4 sun hours average
    const annualGeneration = Math.round(dailyGeneration * 365);
    const systemEfficiency = 85; // After inverter and other losses
    
    // Cost calculations
    const solarCoverage = 0.85; // Solar covers 85% of consumption
    const monthlyBillWithSolar = Math.round(monthlyBill * (1 - solarCoverage));
    const annualCostWithSolar = monthlyBillWithSolar * 12;
    const annualSavings = annualCost - annualCostWithSolar;
    const lifetimeCostWithout = annualCost * 25;
    const lifetimeCostWith = annualCostWithSolar * 25;
    const totalSavings = lifetimeCostWithout - lifetimeCostWith;
    
    // System details
    const panelWattage = 400;
    const panelCount = Math.ceil((systemSize * 1000) / panelWattage);
    const roofSpace = Math.round(systemSize * 100); // ~100 sq ft per kW
    
    // Environmental impact
    const co2Reduction = (annualGeneration * 0.6 / 1000).toFixed(1); // 0.6 kg CO2 per kWh
    const treesEquivalent = Math.round(co2Reduction * 20); // 1 tree absorbs ~50kg CO2/year
    const fuelEquivalent = Math.round(annualGeneration * 0.27); // 0.27L petrol per kWh
    
    // Payback period
    const systemCost = systemSize * 50000; // Approximate cost per kW
    const paybackPeriod = (systemCost / annualSavings).toFixed(1);
    
    // Update metrics
    document.getElementById('avg-consumption').textContent = `${monthlyUnits} kWh`;
    document.getElementById('annual-cost').textContent = `₹${annualCost.toLocaleString()}`;
    document.getElementById('annual-savings').textContent = `₹${annualSavings.toLocaleString()}`;
    document.getElementById('payback-period').textContent = `${paybackPeriod} years`;
    
    // Update cost comparison
    document.getElementById('monthly-bill-without').textContent = `₹${monthlyBill.toLocaleString()}`;
    document.getElementById('annual-cost-without').textContent = `₹${annualCost.toLocaleString()}`;
    document.getElementById('lifetime-cost-without').textContent = `₹${lifetimeCostWithout.toLocaleString()}`;
    
    document.getElementById('monthly-bill-with').textContent = `₹${monthlyBillWithSolar.toLocaleString()}`;
    document.getElementById('annual-cost-with').textContent = `₹${annualCostWithSolar.toLocaleString()}`;
    document.getElementById('lifetime-cost-with').textContent = `₹${lifetimeCostWith.toLocaleString()}`;
    
    document.getElementById('total-savings').textContent = `₹${totalSavings.toLocaleString()}`;
    
    // Update solar system details
    document.getElementById('system-size').textContent = `${systemSizeWithBuffer} kW`;
    document.getElementById('daily-generation').textContent = `${dailyGeneration} kWh`;
    document.getElementById('annual-generation').textContent = `${annualGeneration.toLocaleString()} kWh`;
    document.getElementById('system-efficiency').textContent = `${systemEfficiency}%`;
    document.getElementById('panel-count').textContent = `${panelCount}-${panelCount + 2}`;
    document.getElementById('roof-space').textContent = `${roofSpace} sq ft`;
    
    // Update environmental impact
    document.getElementById('trees-equivalent').textContent = treesEquivalent;
    document.getElementById('co2-reduction').textContent = `${co2Reduction} tons`;
    document.getElementById('fuel-equivalent').textContent = `${fuelEquivalent.toLocaleString()} L`;
    
    // Generate monthly consumption chart
    generateConsumptionChart(monthlyUnits);
    
    // Calculate tariff slabs
    calculateTariffSlabs(monthlyUnits);
}

// Generate monthly consumption chart
function generateConsumptionChart(avgMonthly) {
    const chartContainer = document.getElementById('consumption-chart');
    chartContainer.innerHTML = '';
    
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Generate realistic variation (±15%)
    const monthlyData = months.map(() => {
        const variation = (Math.random() * 0.3 - 0.15); // -15% to +15%
        return Math.round(avgMonthly * (1 + variation));
    });
    
    const maxValue = Math.max(...monthlyData);
    
    monthlyData.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        const heightPercent = (value / maxValue) * 100;
        bar.style.height = `${heightPercent}%`;
        
        const label = document.createElement('div');
        label.className = 'chart-bar-label';
        label.textContent = months[index];
        
        const valueLabel = document.createElement('div');
        valueLabel.className = 'chart-bar-value';
        valueLabel.textContent = `${value} kWh`;
        
        bar.appendChild(label);
        bar.appendChild(valueLabel);
        chartContainer.appendChild(bar);
    });
}

// Calculate tariff slabs
function calculateTariffSlabs(monthlyUnits) {
    let remaining = monthlyUnits;
    
    // Slab 1: 0-100 units @ ₹3.50
    const slab1 = Math.min(remaining, 100);
    document.getElementById('slab-1').textContent = `${slab1} units`;
    remaining -= slab1;
    
    // Slab 2: 101-300 units @ ₹7.50
    const slab2 = Math.min(remaining, 200);
    document.getElementById('slab-2').textContent = `${slab2} units`;
    remaining -= slab2;
    
    // Slab 3: 301-500 units @ ₹10.50
    const slab3 = Math.min(remaining, 200);
    document.getElementById('slab-3').textContent = `${slab3} units`;
    remaining -= slab3;
    
    // Slab 4: Above 500 units @ ₹12.00
    const slab4 = remaining;
    document.getElementById('slab-4').textContent = `${slab4} units`;
}

// Next from results
document.getElementById('next-3')?.addEventListener('click', () => {
    showScreen(4);
});

// Edit bill
document.getElementById('edit-bill')?.addEventListener('click', () => {
    showScreen(2);
});

// Brand selection
document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', function() {
        if (this.dataset.brand) {
            document.querySelectorAll('[data-brand]').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            state.selectedBrand = this.dataset.brand;
        }
        if (this.dataset.inverter) {
            document.querySelectorAll('[data-inverter]').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            state.selectedInverter = this.dataset.inverter;
        }
    });
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const parent = this.parentElement;
        parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Back buttons
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Skip if it's a link (has href attribute)
        if (btn.tagName === 'A') return;
        
        e.preventDefault();
        if (state.currentScreen > 1) {
            showScreen(state.currentScreen - 1);
        }
    });
});

// Compare brands link
document.querySelectorAll('.link-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const text = this.textContent;
        if (text.includes('Compare Brands')) {
            showScreen(5);
        }
    });
});

// Select buttons in comparison
document.querySelectorAll('.select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        showScreen(6);
    });
});

// Initialize
showScreen(1);
