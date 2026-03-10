# Solar Calculator - React + Vite + Tailwind CSS

A modern, full-featured solar energy calculator built with React, Vite, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool (super fast!)
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Modern JavaScript

## ✨ Features

- 🌟 Beautiful landing page with smooth animations
- 📤 Bill upload with AI extraction simulation
- 📊 Comprehensive analytics dashboard
- 💰 Cost comparison and savings calculator
- ☀️ Solar system requirements calculator
- 🌍 Environmental impact metrics
- 📱 Fully responsive design
- ⚡ Lightning-fast performance with Vite

## 🛠️ Installation

```bash
cd solar-app
npm install
```

## 🏃 Running the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.

## 🎨 Tailwind CSS

This project uses Tailwind CSS for styling. Key features:

- Utility-first approach
- Custom color palette (cyan/blue theme)
- Custom gradients
- Responsive design utilities
- Custom animations

### Custom Colors

```javascript
primary: '#06b6d4'    // Cyan
secondary: '#10b981'  // Green
accent: '#f59e0b'     // Amber
```

### Custom Gradients

- `bg-gradient-hero` - Hero section gradient
- `bg-gradient-primary` - Primary button gradient

## 📁 Project Structure

```
solar-app/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx          ✅ Complete
│   │   ├── Calculator.jsx            ✅ Complete
│   │   └── calculator/
│   │       ├── InstallationType.jsx  📝 To create
│   │       ├── BillUpload.jsx        📝 To create
│   │       ├── Results.jsx           📝 To create
│   │       └── PanelSelection.jsx    📝 To create
│   ├── App.jsx                       ✅ Complete
│   ├── index.css                     ✅ Complete
│   └── main.jsx                      ✅ Complete
├── index.html
├── tailwind.config.js                ✅ Complete
├── postcss.config.js                 ✅ Complete
├── vite.config.js
└── package.json
```

## 🎯 Next Steps

### Create Calculator Components

You need to create these component files in `src/components/calculator/`:

1. **InstallationType.jsx** - Installation type selection
2. **BillUpload.jsx** - Bill upload and extraction
3. **Results.jsx** - Results and analytics dashboard
4. **PanelSelection.jsx** - Panel and inverter selection

### Example Component Structure

```jsx
const InstallationType = ({ onBack, onNext, selectedType }) => {
  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:border-primary transition-colors">
          ← Back
        </button>
      </header>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-black mb-8">Select Installation Type</h2>
        {/* Your content here */}
      </div>
    </div>
  )
}

export default InstallationType
```

## 🎨 Tailwind Utilities Used

### Layout
- `flex`, `grid` - Flexbox and Grid
- `max-w-*` - Max width containers
- `gap-*` - Spacing between items

### Styling
- `bg-gradient-*` - Gradient backgrounds
- `rounded-*` - Border radius
- `shadow-*` - Box shadows
- `border-*` - Borders

### Animations
- `hover:*` - Hover states
- `transition-*` - Transitions
- `animate-*` - Custom animations

### Responsive
- `md:*` - Medium screens and up
- `lg:*` - Large screens and up

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder
```

## 📝 Customization

### Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
    }
  }
}
```

### Fonts
Add to `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
PORT=3000 npm run dev
```

### Tailwind Not Working
1. Check `tailwind.config.js` content paths
2. Ensure `@tailwind` directives are in `index.css`
3. Restart dev server

### Build Errors
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 📄 License

This project is for educational purposes (Final Year Project).

## 🤝 Support

For issues or questions, please contact: info@wattwise.com

---

Built with ❤️ using React + Vite + Tailwind CSS
