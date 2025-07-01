# RR Equipment Web Frontend

A modern, fully-featured, powerful web app template built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

Have you ever wanted to spin up a powerful frontend quickly? You can use tools like v0, lovable, bolt or firebase studio to do this easily and for free (kinda). But what should you include? Good code practices like modularity, DRY code and sensible architecture? UI nice-to-haves like high interactivity, mobile responsiveness and themes? TypeScript set up in a minimal, yet effective way? All this is included in Praram.js!

I chose the name Praram because it means "start" or "beginning" in Telugu, the language of my ancestors. My vision for this open source project is to maintain a powerful starter kit that encompasses all important aspects of an e-commerce-like web application: Good architecture, powerful SEO, testing and scalability.

## 🚀 Features

### Core Functionality
- **Equipment Marketplace** - Browse and shop construction equipment
- **Blog System** - Industry insights and equipment news
- **Authentication System** - User sign-in and protected routes
- **Dark Mode** - Full dark/light theme support with system preference detection
- **SEO Optimized** - Comprehensive metadata, Open Graph, and structured data

### User Experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for enhanced interactions
- **Advanced Filtering** - Filter equipment by category, condition, and price
- **Image Galleries** - Multiple product images with thumbnail navigation
- **Contact Forms** - Quote requests and inquiries

### Technical Features
- **Next.js 14** with App Router and Server Components
- **TypeScript** for complete type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for animations and micro-interactions
- **Middleware** for route protection
- **Static Generation** for optimal performance

## 📁 Project Structure

```
├── 📁 src/
│   ├── 📁 app/                     # Next.js app directory
│   │   ├── layout.tsx              # Root layout with providers
│   │   ├── page.tsx                # Home page
│   │   ├── 📁 about/               # About page
│   │   ├── 📁 auth/                # Authentication pages
│   │   │   └── 📁 signin/          # Sign-in page
│   │   ├── 📁 blog/                # Blog system
│   │   │   ├── page.tsx            # Blog listing (server)
│   │   │   ├── BlogPageClient.tsx  # Blog listing (client)
│   │   │   └── 📁 [slug]/          # Individual blog posts
│   │   │       ├── page.tsx        # Blog post (server)
│   │   │       └── BlogPostClient.tsx # Blog post (client)
│   │   ├── 📁 shop/                # Equipment marketplace
│   │   │   ├── page.tsx            # Shop listing (server)
│   │   │   ├── ShopPageClient.tsx  # Shop listing (client)
│   │   │   └── 📁 [id]/            # Individual product pages
│   │   │       ├── page.tsx        # Product page (server)
│   │   │       └── ProductPageClient.tsx # Product page (client)
│   │   └── 📁 routes/              # Route definitions
│   ├── 📁 components/              # Reusable components
│   │   ├── AnimatedButton.tsx      # Framer Motion button component
│   │   ├── Footer.tsx              # Site footer
│   │   ├── Navbar.tsx              # Navigation with theme toggle
│   │   └── ProtectedRoute.tsx      # Route protection component
│   ├── 📁 contexts/                # React contexts
│   │   ├── AuthContext.tsx         # Authentication state management
│   │   └── ThemeContext.tsx        # Dark mode state management
│   ├── 📁 lib/                     # Utility libraries
│   │   ├── blog.ts                 # Blog data and utilities
│   │   ├── equipment.ts            # Equipment data and utilities
│   │   └── seo.ts                  # SEO utilities and structured data
│   ├── 📁 types/                   # TypeScript type definitions
│   │   ├── auth.ts                 # Authentication types
│   │   └── content.ts              # Content types (Equipment, Blog, etc.)
│   └── middleware.ts               # Route protection middleware
├── 📁 public/                      # Static assets
│   ├── 📁 images/                  # Image assets
│   └── 📁 videos/                  # Video assets
├── 📁 tests/                       # Test suite
│   ├── 📁 unit/                    # Unit tests
│   ├── 📁 integration/             # Integration tests
│   ├── 📁 e2e/                     # End-to-end tests
│   └── setup.ts                   # Test configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── next.config.ts                  # Next.js configuration
└── package.json                    # Dependencies and scripts
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React** - UI library

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing

### Features
- **Server Components** - Performance optimization
- **Static Generation** - SEO and performance
- **Middleware** - Route protection and redirects
- **Image Optimization** - Next.js Image component

## 📊 Data Models

### Equipment Interface
```typescript
interface Equipment {
  id: string;
  name: string;
  description: string;
  price: number;
  imageSrcs: string[];
  category: string;
  condition: string;
  manufacturer: string;
  modelNumber: string;
  yearManufactured: number;
  specifications: Record<string, string>;
  features: string[];
}
```

### Blog Post Interface
```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  author: Author;
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd rrequipmentwebfrontend-next
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |

## 🎨 Design System

### Colors
- **Primary**: Blue theme for branding
- **Semantic**: Success (green), warning (yellow), error (red)
- **Neutral**: Gray scale for text and backgrounds
- Edit these in `tailwind.config.js`

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable line height and spacing
- **Code**: Monospace for technical content

### Components
- **AnimatedButton**: Variants (primary, secondary, outline) with sizes
- **Cards**: Equipment and blog post cards with hover effects
- **Modals**: Contact forms and overlays
- **Navigation**: Responsive navbar with theme toggle

## 🔒 Authentication & Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/blog` - Blog listing and posts
- `/shop` - Equipment marketplace
- `/auth/signin` - Sign-in page

### Protected Routes
- `/routes/admin/*` - Admin dashboard (future)
- Any route not in public list requires authentication

### Middleware
- Automatic redirects for unauthenticated users
- Theme persistence across sessions
- Route protection enforcement

## 🔍 SEO Features

### Metadata
- Dynamic page titles and descriptions
- Open Graph tags for social sharing
- Twitter Card optimization
- Canonical URLs

### Structured Data
- Product schema for equipment
- Article schema for blog posts
- Organization schema for company info
- Breadcrumb navigation schema

### Performance
- Static generation for content pages
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Font optimization

## 🧪 Testing

### Test Types
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Page and feature testing  
- **E2E Tests**: Full user journey testing

### Test Coverage
- Components with interactive features
- Utility functions and data processing
- Navigation and user flows
- Blog and shop functionality

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
Create `.env.local` for development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=your_api_url
```

### Optimization
- Static generation for performance
- Image optimization enabled
- Bundle analysis available
- SEO and metadata configured

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Run linting and type checks
4. Submit pull request with description
5. Code review and merge

### Code Standards
- TypeScript for all new code
- ESLint rules enforcement
- Component composition patterns
- Responsive design principles

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**RR Equipment** - Modern construction equipment marketplace built with cutting-edge web technologies.
