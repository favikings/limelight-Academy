# Limelight International Academy Landing Page Build PRD

## Goal

Build a modern, mobile-first landing page that persuades visitors to
register for the **70-Day Academic Foundation Recovery Program**.

### Tech Stack

-   HTML5
-   CSS3
-   Vanilla JavaScript (ES6)
-   Google Apps Script (Backend)
-   Google Sheets (Database)

No React, Next.js, Node.js or frameworks.

------------------------------------------------------------------------

# Folder Structure

``` text
limelight-landing-page/
├── index.html
├── css/style.css
├── js/script.js
├── images/
├── appscript/Code.gs
└── README.md
```

# Brand

-   Primary: #0D6B35
-   Accent: #D4AF37
-   White: #FFFFFF
-   Background: #F8FAFC
-   Text: #1F2937
-   Font: Poppins

# Landing Page Sections

1.  Sticky Navigation

-   Logo
-   About
-   Subjects
-   FAQ
-   Register
-   Contact
-   Mobile hamburger menu

2.  Hero

-   Headline: Recover Your Academic Foundation in Just 70 Days
-   Supporting copy
-   Register button
-   Call button
-   Background image with dark overlay

3.  Program Highlights Cards:

-   70 Days
-   Foundation-to-Mastery
-   Experienced Tutors
-   Small Classes
-   Progress Tracking
-   Exam Preparation

4.  Why Students Struggle

5.  About the Program

6.  Benefits

7.  Subjects Grid

-   Mathematics
-   English
-   Physics
-   Chemistry
-   Biology
-   Economics
-   Government
-   Literature
-   Civic Education
-   Commerce
-   CRS
-   IRS

8.  Why Choose Limelight

9.  Registration Form

Fields: - Full Name (required) - WhatsApp Number (required) - Email -
Current Category (dropdown) - Primary School - Junior Secondary School -
Senior Secondary School - WAEC Candidate - NECO Candidate - JAMB
Candidate - Post-UTME Candidate

Client-side validation. Disable submit while sending. Loading spinner.

10. FAQ

11. Contact Phone numbers:

-   08110741486
-   09136454172
-   08148268359

12. Footer

# Google Sheets

Columns: - Timestamp - Registration ID - Full Name - WhatsApp - Email -
Category

# Google Apps Script

Requirements: - doPost(e) - Accept JSON POST - Validate required
fields - Generate Registration ID (LIA-2026-0001...) - Save to Google
Sheet - Return JSON success/error - Enable CORS

# Frontend Submission

Use fetch() to POST JSON to Apps Script Web App URL.

On success: 1. Show success modal 2. Display "Join WhatsApp Group" 3.
Auto redirect after 3 seconds to configured WhatsApp invite link.

# UX

-   Smooth scrolling
-   Fade-in animations
-   Sticky CTA on mobile
-   Responsive design
-   Accessible labels
-   Lazy-loaded images

# SEO

-   Meta title
-   Meta description
-   Open Graph tags
-   Favicon
-   Canonical URL
-   robots.txt
-   sitemap.xml

# Performance

-   Optimized images
-   Minified CSS/JS
-   Lighthouse target \>90

# Deliverables

-   Complete HTML/CSS/JS
-   Google Apps Script
-   Deployment guide
-   README
-   Well-commented code
