# AstraPharma Admin Panel

This is the admin panel for the AstraPharma Nexus e-commerce website. It provides comprehensive product management capabilities for the website owner.

## Features

- **Admin Authentication**: Secure login for website owner only (no signup option)
- **Dashboard**: Overview with product statistics and quick actions
- **Product Management**: 
  - View all products with advanced filtering and search
  - Add new products with comprehensive form
  - Edit existing products
  - Delete products
  - Filter by category, brand, price, stock, dietary preferences, status
  - Sort by various criteria
- **Profile Management**: Change admin password and view account info
- **Order Management**: Placeholder for future order management

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Backend server running on port 5000

### Installation

1. **Install Dependencies**
   ```bash
   npm install react-router-dom axios @reduxjs/toolkit react-redux
   ```

2. **Create Admin User**
   Navigate to the backend directory and run:
   ```bash
   cd ../../Backend_Server
   node scripts/createAdmin.js
   ```
   This creates an admin user with:
   - Email: admin@AstraPharma.com
   - Password: admin123

3. **Start the Backend Server**
   ```bash
   cd Backend_Server
   npm start
   ```

4. **Start the Admin Frontend**
   ```bash
   cd Frontend_Admin/my-app
   npm start
   ```

5. **Access the Admin Panel**
   - Open http://localhost:3000
   - Login with admin@AstraPharma.com / admin123

## API Endpoints

### Authentication
- `POST /api/admin/signin` - Admin login
- `PUT /api/admin/password` - Update admin password

### Product Management
- `GET /api/admin/products` - Get all products (with filtering)
- `GET /api/admin/products/:id` - Get single product
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## Product Model Fields

The admin panel supports all fields from the Product model:

### Basic Information
- name (required)
- description (required)
- shortDescription
- price (required)
- originalPrice
- discount
- category (required)
- subcategory
- brand (required)
- sku

### Images
- mainImage (required)
- images (array)

### Inventory
- stock (required)

### Product Details
- weight (value, unit)
- servingSize
- servingsPerContainer

### Content
- ingredients (array)
- nutritionalInfo (calories, protein, carbs, fat, fiber, sugar, sodium)
- benefits (array)
- usageInstructions
- warnings (array)
- allergens (array)
- tags (array)

### Attributes
- isVegetarian
- isVegan
- isGlutenFree
- isOrganic
- isNonGMO
- isActive
- isFeatured

## Filtering Options

The product management page supports comprehensive filtering:

- **Search**: Text search across name, description, brand, category
- **Category**: Filter by product category
- **Brand**: Filter by brand name
- **Status**: Active/Inactive products
- **Featured**: Featured/Non-featured products
- **Dietary**: Vegetarian, Vegan, Gluten-free, Organic
- **Price Range**: Min/Max price
- **Stock Range**: Min/Max stock quantity
- **Sorting**: By name, price, stock, rating, creation date

## Security Features

- JWT token-based authentication
- Admin-only access
- Password change functionality
- Secure API endpoints with authentication middleware

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration includes the admin frontend URL
2. **Authentication Errors**: Check if the admin user exists in the database
3. **API Connection Errors**: Verify the backend server is running on port 5000
4. **Product Creation Errors**: Check that all required fields are filled

### Testing the Connection

1. Start the backend server
2. Start the admin frontend
3. Login with admin credentials
4. Try to view products in the dashboard
5. Test adding a new product
6. Test editing an existing product

## Development Notes

- The admin panel uses React Router for navigation
- Axios is used for API calls
- Tailwind CSS is used for styling
- All forms include validation and error handling
- The interface is responsive and mobile-friendly
