# Product List Ecommerce Demo

A modern React-based ecommerce demo project featuring a product listing page with shopping cart functionality.

## Features

- ✨ **Product Listing**: Browse through a selection of products with images and descriptions
- 🛒 **Shopping Cart**: Add/remove products and adjust quantities
- 💰 **Order Summary**: View subtotal, tax, and total price calculations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean and intuitive user interface

## Project Structure

```
├── public/
│   ├── index.html
│   └── index.css
├── src/
│   ├── components/
│   │   ├── ProductList.js
│   │   ├── ProductList.css
│   │   ├── ProductCard.js
│   │   ├── ProductCard.css
│   │   ├── Cart.js
│   │   ├── Cart.css
│   │   ├── CartItem.js
│   │   └── CartItem.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ust-gau/product-list-ecommerce.git
cd product-list-ecommerce
```

2. Install dependencies:
```bash
npm install
```

### Running the Project

Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` directory.

## Components

### ProductList
Displays a grid of products using the ProductCard component.

### ProductCard
Showcases individual product information including name, description, price, and an "Add to Cart" button.

### Cart
Manages the shopping cart, displaying all items, quantities, and order summary with total price calculation.

### CartItem
Represents a single item in the cart with quantity controls and remove functionality.

## Features to Add

- 🔍 Product search and filtering
- ⭐ Product ratings and reviews
- 🎯 Product categories

## Technologies Used

- React 18
- CSS3
- JavaScript ES6+

## License

MIT License - feel free to use this project for educational purposes.

## Author

ust-gau