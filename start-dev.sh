#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")/next-3d-app" || exit

# Start the development server
echo "Starting Next.js development server..."
npm run dev
