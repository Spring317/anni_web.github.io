#!/bin/bash

# Script to generate JavaScript array for your PNG images
# Run this in your anni_web directory

echo "Generating image arrays for GitHub Pages deployment..."
echo ""

echo "=== Distance Gallery Images ==="
echo "Copy this into the 'distance-gallery' array in script-static.js:"
echo ""
for file in images/distance/*.PNG; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "        { name: '$filename', url: 'images/distance/$filename' },"
    fi
done

echo ""
echo "=== Meet Gallery Images ==="
echo "Copy this into the 'meet-gallery' array in script-static.js:"
echo ""
for file in images/meet/*.jpg images/meet/*.jpeg images/meet/*.png images/meet/*.gif images/meet/*.webp images/meet/*.JPG images/meet/*.JPEG images/meet/*.PNG images/meet/*.GIF images/meet/*.WEBP; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "        { name: '$filename', url: 'images/meet/$filename' },"
    fi
done

echo ""
echo "=== First Gallery Images ==="
echo "Copy this into the 'first-gallery' array in script-static.js:"
echo ""
for file in images/first/*.jpg images/first/*.jpeg images/first/*.png images/first/*.gif images/first/*.webp images/first/*.JPG images/first/*.JPEG images/first/*.PNG images/first/*.GIF images/first/*.WEBP; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "        { name: '$filename', url: 'images/first/$filename' },"
    fi
done

echo ""
echo "=== Together Gallery Images ==="
echo "Copy this into the 'together-gallery' array in script-static.js:"
echo ""
for file in images/together/*.jpg images/together/*.jpeg images/together/*.png images/together/*.gif images/together/*.webp images/together/*.JPG images/together/*.JPEG images/together/*.PNG images/together/*.GIF images/together/*.WEBP; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "        { name: '$filename', url: 'images/together/$filename' },"
    fi
done

echo ""
echo "🎯 Instructions:"
echo "1. Copy the arrays above into script-static.js"
echo "2. Replace the example entries in the galleries object"
echo "3. Commit all files including images to your GitHub repository"
echo "4. Enable GitHub Pages in repository settings"