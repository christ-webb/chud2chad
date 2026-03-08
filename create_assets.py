#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create assets directory if it doesn't exist
os.makedirs('assets', exist_ok=True)

# Define colors matching the app's branding
bg_color = (168, 207, 255)  # #A8CFFF from splash config
text_color = (0, 0, 0)

# Create icon.png (1024x1024)
icon = Image.new('RGB', (1024, 1024), bg_color)
draw = ImageDraw.Draw(icon)
# Draw a simple centered circle
draw.ellipse([192, 192, 832, 832], fill=(255, 255, 255), outline=text_color, width=20)
# Add text
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 120)
except:
    font = ImageFont.load_default()
text = "C2C"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
draw.text(((1024 - text_width) / 2, (1024 - text_height) / 2), text, fill=text_color, font=font)
icon.save('assets/icon.png', 'PNG')
print("Created assets/icon.png")

# Create splash.png (1284x2778 - iPhone 14 Pro Max resolution)
splash = Image.new('RGB', (1284, 2778), bg_color)
draw = ImageDraw.Draw(splash)
try:
    font_large = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 180)
    font_small = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 80)
except:
    font_large = ImageFont.load_default()
    font_small = ImageFont.load_default()
title = "CHUD2CHAD"
bbox = draw.textbbox((0, 0), title, font=font_large)
text_width = bbox[2] - bbox[0]
draw.text(((1284 - text_width) / 2, 1200), title, fill=text_color, font=font_large)
splash.save('assets/splash.png', 'PNG')
print("Created assets/splash.png")

# Create adaptive-icon.png (1024x1024)
adaptive_icon = Image.new('RGB', (1024, 1024), bg_color)
draw = ImageDraw.Draw(adaptive_icon)
draw.ellipse([192, 192, 832, 832], fill=(255, 255, 255), outline=text_color, width=20)
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 120)
except:
    font = ImageFont.load_default()
text = "C2C"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
draw.text(((1024 - text_width) / 2, (1024 - text_height) / 2), text, fill=text_color, font=font)
adaptive_icon.save('assets/adaptive-icon.png', 'PNG')
print("Created assets/adaptive-icon.png")

# Create favicon.png (48x48)
favicon = Image.new('RGB', (48, 48), bg_color)
draw = ImageDraw.Draw(favicon)
draw.ellipse([4, 4, 44, 44], fill=(255, 255, 255), outline=text_color, width=2)
try:
    font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 18)
except:
    font = ImageFont.load_default()
text = "C2C"
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
draw.text(((48 - text_width) / 2, (48 - text_height) / 2 - 2), text, fill=text_color, font=font)
favicon.save('assets/favicon.png', 'PNG')
print("Created assets/favicon.png")

print("\nAll placeholder assets created successfully!")
print("You can replace these with your custom designs later.")
