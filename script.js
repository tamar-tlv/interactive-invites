// Store invitation data
let invitationData = null;

// Event type icons mapping
const eventIcons = {
    'birthday': '🎂',
    'wedding': '💒',
    'anniversary': '💑',
    'party': '🎉',
    'baby-shower': '👶',
    'graduation': '🎓',
    'other': '🎊'
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkURLParams();
});

function setupEventListeners() {
    // Form submission
    document.getElementById('invitationForm').addEventListener('submit', handleFormSubmit);
    
    // Share buttons
    document.getElementById('shareWhatsApp').addEventListener('click', shareViaWhatsApp);
    document.getElementById('shareEmail').addEventListener('click', shareViaEmail);
    document.getElementById('copyLink').addEventListener('click', copyLink);
    
    // Create new button
    document.getElementById('createNew').addEventListener('click', showCreationMode);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Collect form data
    invitationData = {
        eventType: document.getElementById('eventType').value,
        hostName: document.getElementById('hostName').value,
        eventName: document.getElementById('eventName').value,
        eventDate: document.getElementById('eventDate').value,
        eventTime: document.getElementById('eventTime').value,
        location: document.getElementById('location').value,
        message: document.getElementById('message').value,
        scratchMessage: document.getElementById('scratchMessage').value,
        backgroundColor: document.getElementById('backgroundColor').value
    };
    
    // Store in URL params for sharing
    updateURL();
    
    // Show invitation
    showInvitation();
}

function showInvitation() {
    // Switch modes
    document.getElementById('creationMode').classList.remove('active');
    document.getElementById('viewMode').classList.add('active');
    
    // Apply theme color
    const card = document.querySelector('.invitation-card');
    card.style.borderTop = `10px solid ${invitationData.backgroundColor}`;
    
    // Update content
    document.getElementById('inviteEventName').textContent = invitationData.eventName;
    document.getElementById('eventIcon').textContent = eventIcons[invitationData.eventType];
    document.getElementById('inviteDate').textContent = formatDate(invitationData.eventDate);
    document.getElementById('inviteTime').textContent = formatTime(invitationData.eventTime);
    document.getElementById('inviteLocation').textContent = invitationData.location;
    document.getElementById('inviteMessage').textContent = invitationData.message;
    document.getElementById('inviteHost').textContent = invitationData.hostName;
    
    // Update scratch card message
    document.getElementById('scratchReveal').textContent = invitationData.scratchMessage;
    
    // Initialize scratch card
    initScratchCard();
    
    // Trigger confetti
    setTimeout(() => createConfetti(), 500);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCreationMode() {
    document.getElementById('viewMode').classList.remove('active');
    document.getElementById('creationMode').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Scratch Card Implementation
function initScratchCard() {
    const canvas = document.getElementById('scratchCanvas');
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    
    // Set canvas size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    
    // Draw scratch surface
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#c471ed');
    gradient.addColorStop(1, '#f64f59');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch Here!', canvas.width / 2, canvas.height / 2);
    
    // Scratch variables
    let isScratching = false;
    let scratchPercentage = 0;
    
    // Mouse/Touch events
    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('mouseleave', stopScratch);
    
    canvas.addEventListener('touchstart', startScratch);
    canvas.addEventListener('touchmove', scratch);
    canvas.addEventListener('touchend', stopScratch);
    
    function startScratch(e) {
        isScratching = true;
        scratch(e);
    }
    
    function scratch(e) {
        if (!isScratching) return;
        
        e.preventDefault();
        
        const rect = canvas.getBoundingClientRect();
        let x, y;
        
        if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
        
        // Scale coordinates
        x = (x / rect.width) * canvas.width;
        y = (y / rect.height) * canvas.height;
        
        // Erase area
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Check scratch percentage
        checkScratchComplete();
    }
    
    function stopScratch() {
        isScratching = false;
    }
    
    function checkScratchComplete() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparentPixels = 0;
        
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] < 128) {
                transparentPixels++;
            }
        }
        
        scratchPercentage = (transparentPixels / (imageData.data.length / 4)) * 100;
        
        // If 60% scratched, reveal completely
        if (scratchPercentage > 60) {
            revealScratchCard();
        }
    }
    
    function revealScratchCard() {
        canvas.style.transition = 'opacity 0.5s';
        canvas.style.opacity = '0';
        document.getElementById('scratchReveal').classList.add('scratch-revealed');
        
        setTimeout(() => {
            canvas.style.display = 'none';
            createConfetti();
        }, 500);
    }
}

// Confetti Animation
function createConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = ''; // Clear existing confetti
    
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

// Sharing Functions
function shareViaWhatsApp() {
    const url = window.location.href;
    const text = `🎉 You're invited to ${invitationData.eventName}!\n\n` +
                 `📅 ${formatDate(invitationData.eventDate)}\n` +
                 `⏰ ${formatTime(invitationData.eventTime)}\n` +
                 `📍 ${invitationData.location}\n\n` +
                 `View your interactive invitation: ${url}`;
    
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, '_blank');
}

function shareViaEmail() {
    const subject = `Invitation: ${invitationData.eventName}`;
    const body = `You're invited to ${invitationData.eventName}!\n\n` +
                 `Date: ${formatDate(invitationData.eventDate)}\n` +
                 `Time: ${formatTime(invitationData.eventTime)}\n` +
                 `Location: ${invitationData.location}\n\n` +
                 `${invitationData.message}\n\n` +
                 `View your interactive invitation here:\n${window.location.href}`;
    
    const mailtoURL = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoURL;
}

function copyLink() {
    const url = window.location.href;
    
    // Use Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            showCopyNotification();
        }).catch(err => {
            fallbackCopyTextToClipboard(url);
        });
    } else {
        fallbackCopyTextToClipboard(url);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        alert('Failed to copy link');
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification() {
    const btn = document.getElementById('copyLink');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span>✓</span> Copied!';
    btn.style.background = '#28a745';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
    }, 2000);
}

// URL Management
function updateURL() {
    const params = new URLSearchParams();
    // Use encodeURIComponent to handle Unicode characters properly
    params.set('data', btoa(encodeURIComponent(JSON.stringify(invitationData))));
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newURL);
}

function checkURLParams() {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    
    if (data) {
        try {
            invitationData = JSON.parse(decodeURIComponent(atob(data)));
            showInvitation();
        } catch (e) {
            console.error('Failed to parse invitation data:', e);
        }
    }
}
