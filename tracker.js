// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = '7473229254:AAH6gQtxqyY32NpHpWiQ7v0GSXRxMM8UVX8'; // Replace with your bot token
const TELEGRAM_CHAT_ID = '5287071616'; // Replace with your chat ID

// Function to get visitor's IP address
async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown';
    }
}

// Function to get visitor's location based on IP
async function getVisitorLocation(ip) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await response.json();
        return {
            country: data.country_name || 'Unknown',
            region: data.region || 'Unknown',
            city: data.city || 'Unknown',
            latitude: data.latitude || 'Unknown',
            longitude: data.longitude || 'Unknown',
            timezone: data.timezone || 'Unknown',
            isp: data.org || 'Unknown'
        };
    } catch (error) {
        console.error('Error fetching location:', error);
        return {
            country: 'Unknown',
            region: 'Unknown',
            city: 'Unknown',
            latitude: 'Unknown',
            longitude: 'Unknown',
            timezone: 'Unknown',
            isp: 'Unknown'
        };
    }
}

// Function to get browser and device information
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const cookieEnabled = navigator.cookieEnabled;
    const onLine = navigator.onLine;
    
    return {
        userAgent: userAgent,
        platform: platform,
        language: language,
        cookieEnabled: cookieEnabled,
        onLine: onLine,
        screenResolution: `${screen.width}x${screen.height}`,
        colorDepth: screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

// Function to get page information
function getPageInfo() {
    return {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer || 'Direct visit',
        timestamp: new Date().toISOString()
    };
}

// Function to send message to Telegram
async function sendToTelegram(message) {
    const telegramAPI = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(telegramAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });
        const respText = await response.text();
        if (response.ok) {
            console.log('Visitor data sent to Telegram successfully:', respText);
        } else {
            console.error('Failed to send to Telegram:', response.status, respText);
        }
    } catch (error) {
        console.error('Error sending to Telegram:', error);
    }
}

// Function to format and send visitor data
async function trackVisitor() {
    try {
        // Get all visitor information
        const ip = await getVisitorIP();
        const location = await getVisitorLocation(ip);
        const browserInfo = getBrowserInfo();
        const pageInfo = getPageInfo();
        
        // Format the message
        const message = `
🌐 <b>New Website Visitor</b>

📍 <b>Location Info:</b>
• IP Address: ${ip}
• Country: ${location.country}
• Region: ${location.region}
• City: ${location.city}
• Coordinates: ${location.latitude}, ${location.longitude}
• Timezone: ${location.timezone}
• ISP: ${location.isp}

💻 <b>Device Info:</b>
• Platform: ${browserInfo.platform}
• Screen: ${browserInfo.screenResolution}
• Language: ${browserInfo.language}
• Online: ${browserInfo.onLine ? 'Yes' : 'No'}
• Cookies: ${browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}

📱 <b>Browser Info:</b>
• User Agent: ${browserInfo.userAgent.substring(0, 100)}...
• Color Depth: ${browserInfo.colorDepth}-bit
• Timezone: ${browserInfo.timezone}

📄 <b>Page Info:</b>
• URL: ${pageInfo.url}
• Title: ${pageInfo.title}
• Referrer: ${pageInfo.referrer}
• Visit Time: ${pageInfo.timestamp}
        `.trim();
        
        // Send to Telegram
        await sendToTelegram(message);
        
    } catch (error) {
        console.error('Error tracking visitor:', error);
    }
}

// Auto-execute when page loads
(function ensureTracking() {
    // Prevent multiple executions
    if (window.__visitorTracked) return;
    window.__visitorTracked = true;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', trackVisitor);
    } else {
        trackVisitor();
    }
})();