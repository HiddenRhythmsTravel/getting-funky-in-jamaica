#!/usr/bin/env python3
import os
import random
import json

base_gallery_dir = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/assets/gallery-all"
dest_json_path = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/data/gallery-active.json"

YEAR_LABELS = {
    "2020": "2020",
    "2023": "2023",
    "2024": "2024",
    "2025": "2025",
    "2025-medellin": "2025 Medellín",
    "2026": "2026",
}

if __name__ == '__main__':
    print("Executing server-side gallery rotation...")
    if not os.path.exists(base_gallery_dir):
        print(f"Error: gallery directory not found: {base_gallery_dir}")
        exit(1)
        
    all_images = []
    for root, dirs, files in os.walk(base_gallery_dir):
        for f in files:
            if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
                fpath = os.path.join(root, f)
                # Get the year folder name
                year_folder = os.path.basename(root)
                rel_path = f"/assets/gallery-all/{year_folder}/{f}"
                all_images.append({
                    "src": rel_path,
                    "year": year_folder,
                    "original_name": f
                })
                
    print(f"Total images found in pool: {len(all_images)}")
    if len(all_images) < 21:
        print("Warning: fewer than 21 images found, selecting all of them.")
        selected = all_images
    else:
        # Select exactly 21 random images
        selected = random.sample(all_images, 21)
        
    # Write to target JSON file
    os.makedirs(os.path.dirname(dest_json_path), exist_ok=True)
    with open(dest_json_path, 'w') as f:
        json.dump(selected, f, indent=2)
        
    print(f"Successfully selected 21 images and wrote to {dest_json_path}:")
    for idx, item in enumerate(selected):
        print(f"  {idx+1}. {item['year']} / {item['original_name']}")
