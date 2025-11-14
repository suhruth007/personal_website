# EmailJS Setup Guide

Your contact form is now connected to send emails to suhruth9b@gmail.com!

## Steps to activate:

### 1. Go to EmailJS (Free)
- Visit: https://www.emailjs.com/
- Sign up with your email (suhruth9b@gmail.com recommended)

### 2. Add Gmail as Email Service
- Go to "Email Services" in dashboard
- Click "Add Service"
- Select "Gmail"
- Follow the authorization prompts
- Copy your **Service ID** (looks like: `service_xxxxxxxxx`)

### 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this configuration:

**Template Settings:**
- Service: Gmail
- Name it: `template_contact_form`
- TO Email: `suhruth9b@gmail.com`

**Template Content:**
```
From: {{from_name}} <{{from_email}}>
Subject: New Portfolio Contact Message

Message:
{{message}}
```

- Copy your **Template ID** (looks like: `template_xxxxxxxxx`)

### 4. Get Your Public Key
- Go to "Account" > "API Keys"
- Copy your **Public Key**

### 5. Update page.tsx
Replace the placeholder in line ~22 with your Public Key:
```typescript
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with actual key from EmailJS
```

Also update the service/template IDs in the handleSubmitForm function (around line 75):
```typescript
await emailjs.send('service_xxxxxxxxx', 'template_contact_form', {
  // your_service_id above ↑
```

## That's it! 🎉
Users can now submit contact forms and you'll receive emails directly!

**Notes:**
- EmailJS free tier: 200 emails/month
- No backend server needed
- Emails go directly to your Gmail inbox
