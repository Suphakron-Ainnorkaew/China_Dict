#!/bin/bash

echo "Building Vue.js application..."

# Clean previous build
rm -rf dist

# Install dependencies
npm install

# Build the application
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "Build completed successfully!"
    echo "Files in dist directory:"
    ls -la dist/
else
    echo "Build failed!"
    exit 1
fi

echo "Ready for deployment!" 