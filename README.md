# D20 3D Dice Roller

This project is a 3D D20 dice roller built with React, TypeScript, Vite, Three.js, and GSAP. The dice is rendered in real-time using @react-three/fiber and @react-three/drei, and animates a realistic roll to a random face when the user clicks the button. The numbers use a custom Joan font subset for optimal performance.

## Features
- 3D interactive D20 dice rendered with Three.js primitives
- Realistic roll animation using GSAP
- Custom font for dice numbers (subsetted for minimal size)
- Responsive and lightweight (optimized assets and bundle)
- No camera controls for a focused user experience

## Demo
![D20 Dice Roller Screenshot](public/vite.svg)

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Install dependencies
```sh
npm install
```

### Run in development
```sh
npm run dev
```

### Build for production
```sh
npm run build
```

### Preview production build
```sh
npm run preview
```

## Project Structure
- `src/components/D20Dice.tsx` — Main 3D dice component
- `public/fonts/Joan/Joan-Regular.woff` — Custom font (subset, only numbers)
- `public/` — Static assets

## Optimization Tips
- The Joan font is subsetted to only include numbers, reducing font size to ~25KB.
- Unused libraries and controls (like OrbitControls) have been removed for a smaller bundle.
- For further optimization, analyze the production build with [vite-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer).

## Dependencies
- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
- [@react-three/drei](https://docs.pmnd.rs/drei/introduction)
- [GSAP](https://greensock.com/gsap/)

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
