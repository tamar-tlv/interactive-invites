# 🎉 Interactive Invites

A beautiful, interactive web-based system for creating and sharing event invitations via WhatsApp or email. Perfect for birthdays, weddings, parties, and any special occasion!

## ✨ Features

- 🎨 **Multiple Event Types**: Birthday, Wedding, Anniversary, Party, Baby Shower, Graduation, and more
- 🎁 **Interactive Scratch Card**: Add hidden surprise messages that guests can reveal by scratching
- 🎊 **Confetti Animations**: Delightful animations to celebrate your event
- 📱 **WhatsApp Integration**: Share invitations directly via WhatsApp
- ✉️ **Email Sharing**: Send invitations through email
- 🔗 **Link Sharing**: Copy and share invitation links
- 🎨 **Customizable Themes**: Choose your own color scheme
- 📱 **Fully Responsive**: Works beautifully on mobile and desktop devices
- 🌐 **No Backend Required**: Pure HTML, CSS, and JavaScript

## 🚀 Getting Started

### Option 1: Open Locally
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start creating invitations!

### Option 2: Deploy to GitHub Pages
1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Select your branch and save
4. Your invitation system will be live at `https://tamar-tlv.github.io/interactive-invites`

### Option 3: Deploy to any web server
Simply upload all files to your web server and access `index.html`

## 📖 How to Use

### Creating an Invitation

1. **Fill in Event Details**:
   - Select event type (Birthday, Wedding, etc.)
   - Enter host name
   - Add event name/title
   - Set date and time
   - Specify location
   - Write a personal message

2. **Add Scratch Card Surprise**:
   - Enter a hidden message that will be revealed when guests scratch the card
   - This could be a special note, dress code, surprise guest info, etc.

3. **Choose Theme Color**:
   - Pick a color that matches your event theme

4. **Create Invitation**:
   - Click "Create Invitation" to generate your interactive invite

### Viewing an Invitation

When you view an invitation, you'll see:
- Event details with beautiful animations
- An interactive scratch card (scratch with mouse or finger)
- Confetti effects for celebration
- Share buttons for WhatsApp, Email, and Copy Link

### Sharing an Invitation

**WhatsApp**: 
- Click the WhatsApp button
- Select contacts to share with
- The invitation link and details are automatically included

**Email**:
- Click the Email button
- Your email client opens with pre-filled content
- Add recipient addresses and send

**Copy Link**:
- Click the Copy Link button
- The invitation URL is copied to your clipboard
- Paste it anywhere you want to share

## 🎨 Customization

### Changing Colors
The theme color can be selected when creating an invitation. For more advanced customization, edit `styles.css`:

```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button colors */
.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding Event Types
Edit `index.html` to add new event types:

```html
<option value="new-event">🎯 New Event</option>
```

And update the icon mapping in `script.js`:

```javascript
const eventIcons = {
    'new-event': '🎯',
    // ... other events
};
```

## 🔧 Technical Details

- **No Dependencies**: Pure vanilla JavaScript, HTML5, and CSS3
- **Canvas API**: Used for scratch card functionality
- **URL Encoding**: Invitation data is encoded in URL for sharing
- **Responsive Design**: Mobile-first approach with flexbox and media queries
- **Animations**: CSS animations and transitions for smooth effects

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Use Cases

- 🎂 Birthday parties
- 💒 Wedding invitations
- 🎉 Anniversary celebrations
- 👶 Baby showers
- 🎓 Graduation parties
- 🎊 Any special event!

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🎉 Enjoy Creating Beautiful Invitations!

Make every event special with interactive, memorable invitations that your guests will love!
