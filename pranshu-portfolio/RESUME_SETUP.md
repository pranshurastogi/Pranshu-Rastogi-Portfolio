# Resume Setup Instructions

## How to Add Your Resume to the Website

### Step 1: Upload Your Resume PDF
1. Take your resume PDF file
2. Rename it to `resume.pdf` (if it's not already named that)
3. Copy the file to the `public/` folder in your project
4. The file should be located at: `public/resume.pdf`

### Step 2: Test the Resume Links
1. Start your development server: `npm run dev` or `yarn dev`
2. Visit your website
3. Check that:
   - The "Download Resume" button appears in the Hero section
   - The "Resume" link appears in the header navigation
   - Both links open your PDF in a new tab

### Step 3: Customize (Optional)
If you want to change the resume file name or location, update the `resumeUrl` variable in:
- `src/components/Hero.jsx` (line 310)
- `src/components/Header.jsx` (line 19)

## Features Added:
✅ **Hero Section Resume Button**: Prominent download button with terminal styling
✅ **Header Navigation**: Resume link in both desktop and mobile menus
✅ **Responsive Design**: Works on all screen sizes
✅ **Terminal Aesthetic**: Matches your blockchain/hacker theme
✅ **External Link Handling**: Opens in new tab with proper security attributes

## File Structure:
```
public/
├── resume.pdf          ← Your resume goes here
├── images/
├── eth.svg
└── ...other files
```

Your resume is now integrated into your portfolio website with a professional, themed presentation that matches your blockchain aesthetic!
