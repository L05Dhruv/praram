# Admin Dashboard Documentation

## Overview

The admin dashboard provides a comprehensive interface for managing equipment inventory and images. It includes functionality for creating, editing, and deleting equipment, as well as managing associated images.

## Features

### 📊 Dashboard Overview (`/admin`)
- Equipment inventory statistics
- Total value calculation
- Category breakdown
- Quick navigation to management sections

### 🚜 Equipment Management (`/admin/equipment`)
- **List View**: Browse all equipment with search and filtering
  - Search by name or manufacturer
  - Filter by category
  - View equipment cards with images, prices, and conditions
- **Add New Equipment** (`/admin/equipment/new`)
  - Complete form with all equipment details
  - Image upload with drag-and-drop
  - Dynamic specifications and features management
- **Edit Equipment** (`/admin/equipment/[id]/edit`)
  - Pre-populated form with existing data
  - Update any equipment information
  - Manage existing images

### 🖼️ Image Management (`/admin/images`)
- **Grid View**: Visual overview of all images
- **List View**: Detailed table with image information
- **Bulk Operations**: Select and delete multiple images
- **Usage Tracking**: See which equipment uses each image
- **Image Organization**: Drag-and-drop reordering

## Access Control

### Authentication
- Protected routes require admin privileges
- In development mode, admin routes are accessible for demo purposes
- Production deployment should implement proper authentication

### Role-Based Access
- Admin users: Full access to all admin features
- Regular users: No access to admin routes
- Unauthenticated users: Redirected to sign-in page

## Technical Implementation

### Routes Structure
```
/admin                          # Main dashboard
├── /equipment                  # Equipment list
│   ├── /new                   # Add new equipment
│   └── /[id]/edit            # Edit existing equipment
└── /images                    # Image management
```

### Components
- `ProtectedRoute`: Handles authentication and authorization
- `EquipmentFormClient`: Comprehensive form for equipment data
- `ImageUpload`: Drag-and-drop image upload with preview
- `ImageManagerClient`: Image organization and management
- `EquipmentManagerClient`: Equipment listing and operations

### Key Features
1. **Form Validation**: Required fields and data type validation
2. **Image Upload**: Support for multiple images with size and type validation
3. **Dynamic Fields**: Add/remove specifications and features
4. **Search & Filter**: Real-time search and category filtering
5. **Responsive Design**: Works on all device sizes
6. **State Management**: Local state for real-time updates

## Usage Instructions

### Adding New Equipment
1. Navigate to `/admin/equipment/new`
2. Fill in basic information (name, manufacturer, price, etc.)
3. Upload images using drag-and-drop or file selection
4. Add specifications (key-value pairs)
5. Add features (list of capabilities)
6. Save the equipment

### Editing Equipment
1. Go to `/admin/equipment`
2. Find the equipment and click "Edit"
3. Modify any information
4. Update images as needed
5. Save changes

### Managing Images
1. Visit `/admin/images`
2. Switch between grid and list views
3. Select images for bulk operations
4. View usage information for each image
5. Delete unused or unwanted images

## Development Notes

### Mock Data
Currently uses mock data from `lib/equipment.ts`. In production, replace with actual API calls.

### Image Storage
Images are currently handled with mock URLs. Implement actual file upload to cloud storage (AWS S3, Cloudinary, etc.) for production.

### API Integration
The forms currently log data to console. Implement actual API endpoints for:
- Creating equipment
- Updating equipment
- Deleting equipment
- Uploading images
- Managing image metadata

### Security Considerations
- Implement proper file upload validation
- Add CSRF protection
- Validate file types and sizes on server-side
- Implement proper error handling
- Add audit logging for admin actions

## Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design
- Progressive enhancement for older browsers

## Deployment
1. Set `NODE_ENV=production` for production deployment
2. Implement proper authentication system
3. Configure cloud storage for images
4. Set up API endpoints for data persistence
5. Add proper error monitoring and logging 