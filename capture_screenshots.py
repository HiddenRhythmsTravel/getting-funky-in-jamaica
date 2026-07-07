import subprocess
import time
import os

def run_mcp(command):
    cmd = f"npx -y chrome-devtools-mcp@latest {command}"
    print(f"Running: {cmd}")
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    print(f"Stdout: {result.stdout}")
    print(f"Stderr: {result.stderr}")
    return result.stdout

# Navigate to home and take screenshot of hero banner
run_mcp("new_page url=http://localhost:3000/")
time.sleep(10) # Wait for Next.js to compile and load
run_mcp("take_screenshot filePath=/Users/adamlinderman/.gemini/antigravity/brain/d0aedc0b-f0dd-4c32-acc6-f7be6cc05c17/hero_full_view.png")

# Scroll to Island Exodus section and take screenshot
run_mcp("navigate_page url=http://localhost:3000/#island-exodus")
time.sleep(5)
run_mcp("take_screenshot filePath=/Users/adamlinderman/.gemini/antigravity/brain/d0aedc0b-f0dd-4c32-acc6-f7be6cc05c17/island_exodus_full_view.png")

# Also take one of the dropdown if possible (tricky with hover, maybe just mobile)
run_mcp("navigate_page url=http://localhost:3000/")
time.sleep(2)
# Try to click the VIP Program to open it if it's click-triggerable or just mobile view
run_mcp("take_screenshot filePath=/Users/adamlinderman/.gemini/antigravity/brain/d0aedc0b-f0dd-4c32-acc6-f7be6cc05c17/homepage_final.png")
