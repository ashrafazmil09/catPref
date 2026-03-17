# CatPref 🐱

CatPref is a swipe-based web application that lets users browse random cat images and like their favorites.
The project demonstrates modern React development with routing, API fetching, swipe interactions, and local storage persistence.

## 🌐 Live Demo

https://ashrafazmil09.github.io/catPref/

## ✨ Features

* Browse random cat images
* Swipe or drag to like/dislike cats
* Save liked cats using browser LocalStorage
* View all liked cats on a separate page
* Smooth UI interactions and animations
* Mobile-friendly swipe experience

## 🛠 Tech Stack

* React
* React Router
* Framer Motion
* React Swipeable
* LocalStorage
* GitHub Pages (deployment)

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/ashrafazmil09/catPref.git
```

Navigate into the project:

```bash
cd catPref
```

Install dependencies:

```bash
npm install
```

## 🚀 Running the App

Start the development server:

```bash
npm start
```

Open in your browser:

```
http://localhost:3000
```

The page will reload automatically when changes are made.

## 🏗 Build for Production

```bash
npm run build
```

This builds the optimized production version in the `build` folder.

## 🌍 Deploy to GitHub Pages

```bash
npm run deploy
```

The project will be deployed to:

```
https://ashrafazmil09.github.io/catPref/
```

## 📁 Project Structure

```
catPref
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
│
├── src
│   ├── api
│   │   └── cats.js
│   │
│   ├── layout
│   │   ├── Sidebar.jsx
│   │   └── Topbar.jsx
│   │
│   ├── pages
│   │   ├── LandingPage.jsx
│   │   ├── LikedPage.jsx
│   │   └── SwipePage.jsx
│   │
│   ├── routes
│   │   └── web.js
│   │
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── package.json
└── README.md
```

## 📌 Future Improvements

* Show cat breed information
* Add dislike history
* Improve swipe animations
* Add backend for user accounts
* Store liked cats in a database

## 📜 License

This project is for learning and experimentation purposes.
