// ===========================================
// AGE CALCULATOR - JavaScript Functionality
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('ageCalculatorForm');
    const dobInput = document.getElementById('dob');
    const ageAtDateInput = document.getElementById('ageAtDate');
    const resetBtn = document.getElementById('resetBtn');
    const results = document.getElementById('results');
    
    // Result elements
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const totalDaysElement = document.getElementById('totalDays');
    
    // Today's date for default value
    const today = new Date();
    const todayFormatted = formatDateForInput(today);
    
    // Set default values
    function initializeDateInputs() {
        // Set ageAtDate to today
        ageAtDateInput.value = todayFormatted;
        
        // Set max date to today for both inputs
        const maxDate = todayFormatted;
        dobInput.max = maxDate;
        ageAtDateInput.max = maxDate;
        
        // Set min date to 150 years ago
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 150);
        dobInput.min = formatDateForInput(minDate);
    }
    
    // Format date as YYYY-MM-DD for input[type="date"]
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Format date as DD-MM-YYYY for display
    function formatDateForDisplay(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${day}-${month}-${year}`;
    }
    
    // Calculate age
    function calculateAge(dob, ageAtDate) {
        // Clone dates to avoid mutation
        const birthDate = new Date(dob);
        const targetDate = new Date(ageAtDate);
        
        // Basic validation
        if (birthDate > targetDate) {
            throw new Error('Date of birth cannot be in the future of the target date!');
        }
        
        // Calculate years
        let years = targetDate.getFullYear() - birthDate.getFullYear();
        
        // Calculate months
        let months = targetDate.getMonth() - birthDate.getMonth();
        
        // Calculate days
        let days = targetDate.getDate() - birthDate.getDate();
        
        // Adjust if days are negative
        if (days < 0) {
            months--;
            // Get days in the previous month
            const lastMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
            days += lastMonth.getDate();
        }
        
        // Adjust if months are negative
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Calculate total days
        const timeDiff = targetDate.getTime() - birthDate.getTime();
        const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        // Calculate weeks
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;
        
        // Calculate months (approximate)
        const totalMonths = years * 12 + months;
        
        // Calculate next birthday
        const nextBirthday = new Date(birthDate);
        nextBirthday.setFullYear(targetDate.getFullYear());
        
        if (nextBirthday < targetDate) {
            nextBirthday.setFullYear(targetDate.getFullYear() + 1);
        }
        
        const daysUntilNextBirthday = Math.floor((nextBirthday.getTime() - targetDate.getTime()) / (1000 * 3600 * 24));
        
        // Return all calculations
        return {
            years,
            months,
            days,
            totalDays,
            totalWeeks,
            remainingDays,
            totalMonths,
            daysUntilNextBirthday,
            nextBirthday: formatDateForDisplay(nextBirthday),
            ageAtDateFormatted: formatDateForDisplay(targetDate),
            dobFormatted: formatDateForDisplay(birthDate)
        };
    }
    
    // Display results
    function displayResults(ageData) {
        // Update main results
        yearsElement.textContent = ageData.years;
        monthsElement.textContent = ageData.months;
        daysElement.textContent = ageData.days;
        totalDaysElement.textContent = ageData.totalDays.toLocaleString();
        
        // Update additional results if elements exist
        const weeksElement = document.getElementById('weeks');
        const totalMonthsElement = document.getElementById('totalMonths');
        const nextBirthdayElement = document.getElementById('nextBirthday');
        const daysUntilNextBirthdayElement = document.getElementById('daysUntilNextBirthday');
        
        if (weeksElement) {
            weeksElement.textContent = `${ageData.totalWeeks} weeks, ${ageData.remainingDays} days`;
        }
        
        if (totalMonthsElement) {
            totalMonthsElement.textContent = ageData.totalMonths.toLocaleString();
        }
        
        if (nextBirthdayElement) {
            nextBirthdayElement.textContent = ageData.nextBirthday;
        }
        
        if (daysUntilNextBirthdayElement) {
            daysUntilNextBirthdayElement.textContent = ageData.daysUntilNextBirthday;
        }
        
        // Add age statement
        const ageStatement = document.getElementById('ageStatement');
        if (ageStatement) {
            let statement = `You are <strong>${ageData.years} years</strong>, `;
            statement += `<strong>${ageData.months} months</strong>, and `;
            statement += `<strong>${ageData.days} days</strong> old `;
            statement += `as of ${ageData.ageAtDateFormatted}.`;
            ageStatement.innerHTML = statement;
        }
        
        // Show results with animation
        results.classList.add('show');
        
        // Scroll to results if on mobile
        if (window.innerWidth < 768) {
            results.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get input values
        const dob = dobInput.value;
        const ageAtDate = ageAtDateInput.value;
        
        // Validation
        if (!dob) {
            showError('Please enter your date of birth');
            return;
        }
        
        if (!ageAtDate) {
            showError('Please select a date to calculate age at');
            return;
        }
        
        try {
            // Calculate age
            const ageData = calculateAge(dob, ageAtDate);
            
            // Display results
            displayResults(ageData);
            
            // Save to localStorage for quick reference
            saveToHistory(ageData);
            
        } catch (error) {
            showError(error.message);
        }
    });
    
    // Reset button handler
    resetBtn.addEventListener('click', function() {
        form.reset();
        initializeDateInputs();
        results.classList.remove('show');
        
        // Clear any error messages
        clearError();
        
        // Focus on first input
        dobInput.focus();
    });
    
    // Quick date buttons
    const quickDateButtons = document.querySelectorAll('.quick-date-btn');
    quickDateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const days = parseInt(this.getAttribute('data-days'));
            const targetDate = new Date();
            targetDate.setDate(today.getDate() + days);
            ageAtDateInput.value = formatDateForInput(targetDate);
            
            // Update date display
            const dateDisplay = document.querySelector('.current-date-display');
            if (dateDisplay) {
                dateDisplay.textContent = formatDateForDisplay(targetDate);
            }
            
            // If DOB is set, calculate immediately
            if (dobInput.value) {
                const ageData = calculateAge(dobInput.value, ageAtDateInput.value);
                displayResults(ageData);
            }
        });
    });
    
    // Today button
    const todayBtn = document.getElementById('todayBtn');
    if (todayBtn) {
        todayBtn.addEventListener('click', function() {
            ageAtDateInput.value = todayFormatted;
            
            // Update date display
            const dateDisplay = document.querySelector('.current-date-display');
            if (dateDisplay) {
                dateDisplay.textContent = formatDateForDisplay(today);
            }
            
            // If DOB is set, calculate immediately
            if (dobInput.value) {
                const ageData = calculateAge(dobInput.value, ageAtDateInput.value);
                displayResults(ageData);
            }
        });
    }
    
    // Error handling
    function showError(message) {
        clearError();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        form.insertBefore(errorDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(clearError, 5000);
    }
    
    function clearError() {
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // Save to history (localStorage)
    function saveToHistory(ageData) {
        try {
            const history = JSON.parse(localStorage.getItem('ageCalculatorHistory')) || [];
            
            // Add new entry
            const entry = {
                timestamp: new Date().toISOString(),
                dob: ageData.dobFormatted,
                ageAtDate: ageData.ageAtDateFormatted,
                age: `${ageData.years}y ${ageData.months}m ${ageData.days}d`,
                totalDays: ageData.totalDays
            };
            
            // Keep only last 10 entries
            history.unshift(entry);
            if (history.length > 10) {
                history.pop();
            }
            
            localStorage.setItem('ageCalculatorHistory', JSON.stringify(history));
            
        } catch (error) {
            console.warn('Could not save to localStorage:', error);
        }
    }
    
    // Load history
    function loadHistory() {
        try {
            const history = JSON.parse(localStorage.getItem('ageCalculatorHistory')) || [];
            const historyElement = document.getElementById('calculationHistory');
            
            if (historyElement && history.length > 0) {
                let historyHTML = '<h4>Recent Calculations</h4><ul>';
                
                history.forEach(entry => {
                    const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    historyHTML += `
                        <li>
                            <span class="history-date">${entry.dob} → ${entry.ageAtDate}</span>
                            <span class="history-age">${entry.age}</span>
                            <span class="history-time">${time}</span>
                        </li>
                    `;
                });
                
                historyHTML += '</ul>';
                historyElement.innerHTML = historyHTML;
            }
            
        } catch (error) {
            console.warn('Could not load history:', error);
        }
    }
    
    // Share functionality
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                const ageText = `I am ${yearsElement.textContent} years, ${monthsElement.textContent} months, and ${daysElement.textContent} days old! Calculated using SG Tools Age Calculator.`;
                
                navigator.share({
                    title: 'My Age Calculation',
                    text: ageText,
                    url: window.location.href
                });
            } else {
                // Fallback: Copy to clipboard
                const ageText = `I am ${yearsElement.textContent} years, ${monthsElement.textContent} months, and ${daysElement.textContent} days old!\nCalculated using: ${window.location.href}`;
                
                navigator.clipboard.writeText(ageText).then(() => {
                    const originalText = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    shareBtn.style.background = 'var(--success)';
                    
                    setTimeout(() => {
                        shareBtn.innerHTML = originalText;
                        shareBtn.style.background = '';
                    }, 2000);
                });
            }
        });
    }
    
    // Initialize on page load
    initializeDateInputs();
    loadHistory();
    
    // Auto-calculate when both dates are selected
    dobInput.addEventListener('change', autoCalculate);
    ageAtDateInput.addEventListener('change', autoCalculate);
    
    function autoCalculate() {
        if (dobInput.value && ageAtDateInput.value) {
            try {
                const ageData = calculateAge(dobInput.value, ageAtDateInput.value);
                displayResults(ageData);
            } catch (error) {
                // Silently fail for auto-calculation
            }
        }
    }
    
    // Add some helpful tips
    console.log('%c🔢 Age Calculator Loaded!', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
    console.log('%c📱 Tip: Try selecting different dates to see instant calculations!', 'color: #6b7280;');
});
