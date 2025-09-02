#!/bin/bash

# Build script for all prelanders
echo "Building all prelanders..."

DIRS=(
  "prelander-wheel-netlify"
  "prelander-newsletters-netlify"
  "prelander-scratch-netlify"
  "prelander-slot-netlify"
)

for dir in "${DIRS[@]}"; do
  echo "Building $dir..."
  cd "$dir"
  
  # Use existing node_modules from wheel if not present
  if [ ! -d "node_modules" ]; then
    echo "Copying node_modules from wheel prelander..."
    cp -r "../prelander-wheel-netlify/node_modules" .
  fi
  
  # Build using npx
  npx vite build
  
  if [ $? -eq 0 ]; then
    echo "✅ $dir built successfully"
  else
    echo "❌ $dir build failed"
  fi
  echo ""
  
  # Return to root directory
  cd ..
done

echo "Build process complete!"