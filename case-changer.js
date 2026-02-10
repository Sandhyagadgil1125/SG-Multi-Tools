// ===========================================
// CASE CHANGER - JavaScript Functionality
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const caseButtons = document.querySelectorAll('.case-btn');
    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const swapBtn = document.getElementById('swapBtn');
    const resetAllBtn = document.getElementById('resetAllBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const speakBtn = document.getElementById('speakBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    
    // Count elements
    const charCount = document.getElementById('charCount');
    const wordCount = document.getElementById('wordCount');
    const lineCount = document.getElementById('lineCount');
    const outputCharCount = document.getElementById('outputCharCount');
    const conversionTime = document.getElementById('conversionTime');
    
    // Options
    const preserveFormatting = document.getElementById('preserveFormatting');
    const trimSpaces = document.getElementById('trimSpaces');
    const removeDuplicates = document.getElementById('removeDuplicates');
    const ignoreArticles = document.getElementById('ignoreArticles');
    
    // State variables
    let currentCase = 'upper';
    let conversionHistory = [];
    
    // Sample texts
    const sampleTexts = [
        `The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.`,
        `Hello World! Welcome to our Case Changer tool. You can convert text to various cases instantly.`,
        `javascript is awesome. react and vue are popular frameworks. node.js for backend development.`,
        `USER_PROFILE_DATA, customerFirstName, OrderTotalAmount, product_category_list`
    ];
    
    // Initialize
    function initialize() {
        // Set active case button
        setActiveCase('upper');
        
        // Add event listeners
        inputText.addEventListener('input', updateStats);
        convertBtn.addEventListener('click', convertText);
        copyBtn.addEventListener('click', copyToClipboard);
        clearBtn.addEventListener('click', clearInput);
        pasteBtn.addEventListener('click', pasteText);
        sampleBtn.addEventListener('click', loadSample);
        swapBtn.addEventListener('click', swapText);
        resetAllBtn.addEventListener('click', resetAll);
        downloadBtn.addEventListener('click', downloadText);
        speakBtn.addEventListener('click', speakText);
        savePresetBtn.addEventListener('click', savePreset);
        
        // Case button events
        caseButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const caseType = this.getAttribute('data-case');
                setActiveCase(caseType);
                convertText();
            });
        });
        
        // Auto-convert on input with debounce
        let debounceTimer;
        inputText.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(convertText, 500);
        });
        
        // Initialize with sample text
        loadSample();
    }
    
    // Set active case button
    function setActiveCase(caseType) {
        currentCase = caseType;
        
        caseButtons.forEach(btn => {
            if (btn.getAttribute('data-case') === caseType) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Update statistics
    function updateStats() {
        const text = inputText.value;
        
        // Character count
        const chars = text.length;
        charCount.textContent = `Characters: ${chars}`;
        
        // Word count
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        wordCount.textContent = `Words: ${words}`;
        
        // Line count
        const lines = text ? text.split('\n').length : 1;
        lineCount.textContent = `Lines: ${lines}`;
    }
    
    // Convert text based on selected case
    function convertText() {
        const startTime = performance.now();
        let text = inputText.value;
        
        if (!text.trim()) {
            outputText.value = '';
            outputCharCount.textContent = 'Characters: 0';
            conversionTime.textContent = 'Time: 0ms';
            return;
        }
        
        // Apply preprocessing options
        if (trimSpaces.checked) {
            text = text.replace(/\s+/g, ' ').trim();
        }
        
        if (removeDuplicates.checked) {
            text = removeDuplicateLines(text);
        }
        
        // Convert based on selected case
        let convertedText = '';
        
        if (preserveFormatting.checked) {
            // Process line by line
            const lines = text.split('\n');
            convertedText = lines.map(line => convertLine(line)).join('\n');
        } else {
            // Process as single text
            convertedText = convertLine(text);
        }
        
        // Update output
        outputText.value = convertedText;
        
        // Update stats
        const endTime = performance.now();
        const timeTaken = Math.round(endTime - startTime);
        
        outputCharCount.textContent = `Characters: ${convertedText.length}`;
        conversionTime.textContent = `Time: ${timeTaken}ms`;
        
        // Save to history
        saveToHistory(text, convertedText, currentCase);
    }
    
    // Convert a single line of text
    function convertLine(line) {
        switch(currentCase) {
            case 'upper':
                return line.toUpperCase();
                
            case 'lower':
                return line.toLowerCase();
                
            case 'title':
                return toTitleCase(line);
                
            case 'sentence':
                return toSentenceCase(line);
                
            case 'capitalize':
                return capitalizeWords(line);
                
            case 'inverse':
                return toInverseCase(line);
                
            case 'alternating':
                return toAlternatingCase(line);
                
            case 'snake':
                return toSnakeCase(line);
                
            case 'kebab':
                return toKebabCase(line);
                
            case 'camel':
                return toCamelCase(line);
                
            case 'pascal':
                return toPascalCase(line);
                
            case 'dot':
                return toDotCase(line);
                
            default:
                return line;
        }
    }
    
    // Conversion functions
    function toTitleCase(text) {
        const articles = ignoreArticles.checked ? ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'with'] : [];
        
        return text.toLowerCase().split(' ').map((word, index) => {
            if (index > 0 && articles.includes(word)) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
    
    function toSentenceCase(text) {
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, function(c) {
            return c.toUpperCase();
        });
    }
    
    function capitalizeWords(text) {
        return text.toLowerCase().split(' ').map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }
    
    function toInverseCase(text) {
        return text.split('').map(char => {
            if (char === char.toUpperCase()) {
                return char.toLowerCase();
            } else {
                return char.toUpperCase();
            }
        }).join('');
    }
    
    function toAlternatingCase(text) {
        return text.split('').map((char, index) => {
            return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
        }).join('');
    }
    
    function toSnakeCase(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '_')
            .replace(/_+/g, '_');
    }
    
    function toKebabCase(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    
    function toCamelCase(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase())
            .replace(/^\w/, c => c.toLowerCase());
    }
    
    function toPascalCase(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+(\w)/g, (match, letter) => letter.toUpperCase())
            .replace(/^\w/, c => c.toUpperCase());
    }
    
    function toDotCase(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, '.')
            .replace(/\.+/g, '.');
    }
    
    function removeDuplicateLines(text) {
        const lines = text.split('\n');
        const uniqueLines = [...new Set(lines)];
        return uniqueLines.join('\n');
    }
    
    // Copy to clipboard
    function copyToClipboard() {
        if (!outputText.value) return;
        
        outputText.select();
        outputText.setSelectionRange(0, 99999); // For mobile
        
        try {
            navigator.clipboard.writeText(outputText.value).then(() => {
                showNotification('Text copied to clipboard!', 'success');
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="far fa-copy"></i> Copy Text';
                }, 2000);
            });
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');
            showNotification('Text copied!', 'success');
        }
    }
    
    // Clear input
    function clearInput() {
        inputText.value = '';
        outputText.value = '';
        updateStats();
        outputCharCount.textContent = 'Characters: 0';
        conversionTime.textContent = 'Time: 0ms';
        inputText.focus();
        showNotification('Text cleared', 'info');
    }
    
    // Paste text
    function pasteText() {
        navigator.clipboard.readText().then(text => {
            inputText.value = text;
            updateStats();
            convertText();
            showNotification('Text pasted from clipboard', 'success');
        }).catch(err => {
            showNotification('Could not paste text. Please paste manually.', 'error');
        });
    }
    
    // Load sample text
    function loadSample() {
        const randomIndex = Math.floor(Math.random() * sampleTexts.length);
        inputText.value = sampleTexts[randomIndex];
        updateStats();
        convertText();
        showNotification('Sample text loaded', 'info');
    }
    
    // Swap input and output
    function swapText() {
        if (!outputText.value) return;
        
        const temp = inputText.value;
        inputText.value = outputText.value;
        outputText.value = temp;
        
        updateStats();
        outputCharCount.textContent = `Characters: ${outputText.value.length}`;
        showNotification('Text swapped', 'info');
    }
    
    // Reset all
    function resetAll() {
        inputText.value = '';
        outputText.value = '';
        setActiveCase('upper');
        
        // Reset options
        preserveFormatting.checked = true;
        trimSpaces.checked = false;
        removeDuplicates.checked = false;
        ignoreArticles.checked = false;
        
        updateStats();
        outputCharCount.textContent = 'Characters: 0';
        conversionTime.textContent = 'Time: 0ms';
        
        inputText.focus();
        showNotification('All settings reset', 'info');
    }
    
    // Download text
    function downloadText() {
        if (!outputText.value) {
            showNotification('No text to download', 'error');
            return;
        }
        
        const blob = new Blob([outputText.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `converted-text-${currentCase}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('Text downloaded', 'success');
    }
    
    // Speak text
    function speakText() {
        if (!outputText.value) {
            showNotification('No text to speak', 'error');
            return;
        }
        
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(outputText.value);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            speechSynthesis.speak(utterance);
            showNotification('Speaking text...', 'info');
        } else {
            showNotification('Speech synthesis not supported in your browser', 'error');
        }
    }
    
    // Save preset
    function savePreset() {
        const preset = {
            caseType: currentCase,
            options: {
                preserveFormatting: preserveFormatting.checked,
                trimSpaces: trimSpaces.checked,
                removeDuplicates: removeDuplicates.checked,
                ignoreArticles: ignoreArticles.checked
            },
            timestamp: new Date().toISOString()
        };
        
        try {
            const presets = JSON.parse(localStorage.getItem('caseChangerPresets') || '[]');
            presets.push(preset);
            localStorage.setItem('caseChangerPresets', JSON.stringify(presets.slice(-5))); // Keep last 5
            showNotification('Preset saved successfully', 'success');
        } catch (err) {
            showNotification('Could not save preset', 'error');
        }
    }
    
    // Save to history
    function saveToHistory(original, converted, caseType) {
        const entry = {
            original,
            converted,
            caseType,
            timestamp: new Date().toISOString()
        };
        
        conversionHistory.unshift(entry);
        if (conversionHistory.length > 10) {
            conversionHistory.pop();
        }
        
        // Save to localStorage
        try {
            localStorage.setItem('caseChangerHistory', JSON.stringify(conversionHistory));
        } catch (err) {
            console.warn('Could not save history to localStorage');
        }
    }
    
    // Show notification
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Show and auto-remove
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Initialize the tool
    initialize();
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to convert
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            convertText();
        }
        
        // Ctrl/Cmd + C to copy output
        if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement !== inputText) {
            copyToClipboard();
        }
        
        // Escape to clear
        if (e.key === 'Escape') {
            clearInput();
        }
    });
    
    console.log('%c📝 Case Changer Loaded!', 'color: #3b82f6; font-size: 14px; font-weight: bold;');
    console.log('%c💡 Tip: Use keyboard shortcuts - Ctrl+Enter to convert, Ctrl+C to copy!', 'color: #6b7280;');
});
