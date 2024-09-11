
# Property Management Next.js

## Overview

This project is a Property Management web application built with Next.js. It allows users to browse properties, view detailed property information, and manage property listings. Authentication is handled through NextAuth with Google as the login provider.

## Features

- Browse properties with detailed information.
- Google OAuth for authentication and property management.
- Responsive design for mobile and desktop devices.
- Image management using Cloudinary.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Photoswipe](https://photoswipe.com/)
- [Cloudinary](https://cloudinary.com/)
- [Mapbox](https://www.mapbox.com/)
- [React Map GL](https://visgl.github.io/react-map-gl/)
- [React Geocode](https://www.npmjs.com/package/react-geocode)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Share](https://www.npmjs.com/package/react-share)

## Prerequisites

- Node.js version 18 or higher
- MongoDB Atlas account and a cluster. Sign up and create a cluster at [MongoDB](https://www.mongodb.com/)
- Cloudinary account. Sign up at [Cloudinary](https://cloudinary.com/)
- Google console account. Sign up at [Google Cloud](https://console.cloud.google.com/)
- Mapbox account. Sign up at [Mapbox](https://www.mapbox.com/)

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/penn201500/property-management-nextjs
cd property-management-nextjs
```

### 2. Install Dependencies

Make sure you have `node` and `npm` installed, then run:

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGODB_URI=mongodb+srv://mongo:...
NEXT_PUBLIC_DOMAIN=http://localhost:3000
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=<random-string>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY=<your-google-geocoding-api-key>
NEXT_PUBLIC_MAPBOX_TOKEN=<your-mapbox-token>
```

- Generate a random string for `NEXTAUTH_SECRET` using the following command:

```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 5. Build for Production

To create an optimized production build, run:

```bash
npm run build
```

## File Structure

- **app/**: Main application logic and page components.
- **components/**: Reusable UI components.
- **context/**: Global state management using React Context API.
- **models/**: Mongoose models for MongoDB.
- **public/**: Static assets.
- **utils/**: Utility functions.

## License

This project is licensed under the MIT License.
