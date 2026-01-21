# Contact Form Setup Guide

Your portfolio now has a fully functional contact form that sends emails directly to your inbox!

## 🎯 How It Works

The contact form uses **Web3Forms** - a free service that converts form submissions into emails without requiring a backend server.

## 📝 Setup Instructions (5 minutes)

### Step 1: Get Your Free Access Key

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click **"Get Started for Free"**
3. Enter your email address (the email where you want to receive messages)
4. Click **"Create Access Key"**
5. You'll receive an email with your **Access Key**
6. Copy the access key (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Step 2: Add Your Access Key to the Portfolio

Open `src/components/Contact.vue` and find line 134:

```javascript
accessKey: 'YOUR_WEB3FORMS_ACCESS_KEY'
```

Replace `YOUR_WEB3FORMS_ACCESS_KEY` with your actual access key:

```javascript
accessKey: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

### Step 3: Test It!

1. Run your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form and submit
4. Check your email inbox - you should receive the message!

## ✨ Features

- ✅ **Real-time feedback** - Users see success/error messages
- ✅ **Loading state** - Button shows "Sending..." during submission
- ✅ **Form validation** - All fields are required
- ✅ **Auto-reset** - Form clears after successful submission
- ✅ **No backend needed** - Works entirely client-side
- ✅ **Free forever** - Up to 250 submissions per month (free tier)

## 📧 What Emails Look Like

When someone contacts you, you'll receive an email with:
- Name of the sender
- Their email address
- Subject line
- Message content
- Timestamp

## 🔒 Security & Privacy

- Web3Forms is GDPR compliant
- No data is stored on their servers
- Emails go directly to your inbox
- SSL/TLS encrypted submissions
- No tracking or analytics

## 🎨 Customization

### Change the Email Format

Edit the `body` section in `Contact.vue` (lines 149-157) to customize what information is sent.

### Add More Fields

Add new fields to the form:

1. Add to the template:
```vue
<div class="form-group">
  <label for="phone">Phone</label>
  <input type="tel" id="phone" v-model="formData.phone" />
</div>
```

2. Add to formData:
```javascript
formData: {
  name: '',
  email: '',
  subject: '',
  message: '',
  phone: '' // new field
}
```

3. Include in submission:
```javascript
body: JSON.stringify({
  // ... existing fields
  phone: this.formData.phone
})
```

## 📊 Upgrade Options

Web3Forms offers paid plans if you need:
- More than 250 submissions/month
- Custom reply-to addresses
- File attachments
- Webhooks
- Priority support

## 🆘 Troubleshooting

### Form Not Sending

1. **Check access key** - Make sure it's correctly pasted
2. **Verify email** - Confirm your email with Web3Forms
3. **Check console** - Open browser DevTools (F12) for error messages
4. **Test internet** - Form needs internet connection

### Not Receiving Emails

1. **Check spam folder** - Emails might be filtered
2. **Verify email address** - Confirm the email you registered with Web3Forms
3. **Wait a minute** - Sometimes there's a slight delay
4. **Check Web3Forms dashboard** - Log in to see submission history

### Error Messages

- **Network error**: Check internet connection
- **Invalid access key**: Verify the key is correct
- **Rate limit exceeded**: You've hit the monthly limit (upgrade or wait for reset)

## 🔄 Alternative Email Services

If you prefer a different service, here are alternatives:

### EmailJS
- Website: [emailjs.com](https://www.emailjs.com)
- Free tier: 200 emails/month
- Requires more setup

### FormSpree
- Website: [formspree.io](https://formspree.io)
- Free tier: 50 submissions/month
- Very simple setup

### Netlify Forms
- Only works if deployed on Netlify
- Free tier: 100 submissions/month
- Zero configuration

## 💡 Pro Tips

1. **Test before deploying** - Always test the form locally first
2. **Monitor submissions** - Check Web3Forms dashboard regularly
3. **Response template** - Create an email template for quick responses
4. **Backup contact** - Keep your email visible as a backup option
5. **Mobile test** - Test the form on mobile devices

## 📱 Mobile Optimization

The contact form is fully responsive and works great on mobile devices:
- Touch-friendly input fields
- Optimized keyboard types (email keyboard for email field)
- Large, easy-to-tap submit button
- Clear error/success messages

## 🎯 Next Steps

1. Get your Web3Forms access key
2. Add it to `Contact.vue`
3. Test the form
4. Deploy your portfolio
5. Share your portfolio link!

---

Need help? Check the [Web3Forms Documentation](https://docs.web3forms.com) or their FAQ section.

