#!/usr/bin/env python3
import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont

# Ensure LANCZOS compatibility
if not hasattr(Image, 'ANTIALIAS'):
    Image.ANTIALIAS = Image.Resampling.LANCZOS

from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip

# Target resolution for Instagram reels (9:16)
TARGET_W, TARGET_H = 1080, 1920

def create_filled_clip(clip):
    clip_w, clip_h = clip.size
    
    # Scale to fill target dimensions
    scale = max(TARGET_W / clip_w, TARGET_H / clip_h)
    new_w, new_h = int(clip_w * scale), int(clip_h * scale)
    clip = clip.resize(newsize=(new_w, new_h))
    
    # Center crop to 1080x1920
    x_center = new_w / 2
    y_center = new_h / 2
    clip = clip.crop(x1=x_center - TARGET_W/2, y1=y_center - TARGET_H/2, 
                     x2=x_center + TARGET_W/2, y2=y_center + TARGET_H/2)
    return clip

def create_bottom_overlay(duration):
    # Create transparent overlay image for bottom card + logo
    img = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Fonts paths
    comic_bold_font_path = "/System/Library/Fonts/Supplemental/Comic Sans MS Bold.ttf"
    futura_font_path = "/System/Library/Fonts/Supplemental/Futura.ttc"
    helvetica_path = "/System/Library/Fonts/HelveticaNeue.ttc"
    marker_felt_path = "/System/Library/Fonts/MarkerFelt.ttc"
    
    # Font loading helper
    def load_font(paths_with_indices, default_size):
        for p, idx in paths_with_indices:
            if os.path.exists(p):
                try:
                    if idx is not None:
                        return ImageFont.truetype(p, default_size, index=idx)
                    else:
                        return ImageFont.truetype(p, default_size)
                except Exception as e:
                    print(f"Error loading {p}: {e}")
        return ImageFont.load_default()

    # Load fonts
    fun_font = load_font([
        (comic_bold_font_path, None),
        (marker_felt_path, 0),
        (helvetica_path, 4)
    ], 100)
    
    clean_font = load_font([
        (futura_font_path, 4), # Futura Bold/Medium
        (helvetica_path, 2), # Helvetica Bold
    ], 58)
    
    clean_bold_font = load_font([
        (futura_font_path, 4),
        (helvetica_path, 4),
    ], 62)
    
    # Draw a premium glassmorphic badge at the bottom-center of the screen
    card_w, card_h = 920, 420
    card_x = (TARGET_W - card_w) // 2
    card_y = 1420
    
    # Rounded rectangle background (semi-transparent dark charcoal with a white outline)
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=40,
        fill=(15, 15, 15, 215),
        outline=(255, 255, 255, 45),
        width=3
    )
    
    # Text contents
    line1 = "OPEN HOUSE"
    line2 = "Saturday, Aug 22nd • 12:00 - 2:00 PM"
    line3 = "1032 Thompson, Bay Shore • $639k"
    
    # Center text helper
    def get_text_width(text, font):
        try:
            return draw.textlength(text, font=font)
        except AttributeError:
            w, _ = draw.textsize(text, font=font)
            return w

    l1_w = get_text_width(line1, fun_font)
    l2_w = get_text_width(line2, clean_bold_font)
    l3_w = get_text_width(line3, clean_font)
    
    # Text positions
    l1_x = card_x + (card_w - l1_w) // 2
    l1_y = card_y + 45
    
    l2_x = card_x + (card_w - l2_w) // 2
    l2_y = card_y + 175
    
    l3_x = card_x + (card_w - l3_w) // 2
    l3_y = card_y + 290
    
    # Draw text shadows
    draw.text((l1_x + 3, l1_y + 3), line1, font=fun_font, fill=(0, 0, 0, 150))
    draw.text((l2_x + 2, l2_y + 2), line2, font=clean_bold_font, fill=(0, 0, 0, 150))
    draw.text((l3_x + 2, l3_y + 2), line3, font=clean_font, fill=(0, 0, 0, 150))
    
    # Draw foreground text
    draw.text((l1_x, l1_y), line1, font=fun_font, fill=(255, 215, 0)) # Luxury Gold
    draw.text((l2_x, l2_y), line2, font=clean_bold_font, fill=(255, 255, 255)) # White
    draw.text((l3_x, l3_y), line3, font=clean_font, fill=(240, 240, 240)) # Soft White/Silver
    
    # Paste Realtor Logo centered above the bottom card
    logo_path = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/scripts/jones_hollow_logo_white.png"
    if os.path.exists(logo_path):
        logo_img = Image.open(logo_path).convert("RGBA")
        logo_w, logo_h = logo_img.size
        # Resize logo slightly if needed (let's keep its native 260x175 or resize to 240x160)
        logo_w_new = 240
        logo_h_new = int(logo_h * (logo_w_new / logo_w))
        logo_img = logo_img.resize((logo_w_new, logo_h_new), Image.Resampling.LANCZOS)
        
        logo_x = (TARGET_W - logo_w_new) // 2
        logo_y = card_y - logo_h_new - 30
        
        img.paste(logo_img, (logo_x, logo_y), logo_img)
        print(f"Pasted logo at x={logo_x}, y={logo_y}")
    else:
        print(f"Warning: Logo not found at {logo_path}")
        
    # Save temporary bottom overlay image
    overlay_path = "temp_bottom_overlay.png"
    img.save(overlay_path)
    
    bottom_clip = ImageClip(overlay_path).set_duration(duration)
    return bottom_clip

def create_top_overlay(duration):
    # Create a separate transparent overlay just for the bulging "Another Opportunity" text
    img = Image.new("RGBA", (TARGET_W, 300), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Load bold/fun font for "ANOTHER OPPORTUNITY!"
    # Prioritize Impact for a classic, heavy real estate bold look
    impact_font_path = "/System/Library/Fonts/Supplemental/Impact.ttf"
    comic_bold_font_path = "/System/Library/Fonts/Supplemental/Comic Sans MS Bold.ttf"
    helvetica_path = "/System/Library/Fonts/HelveticaNeue.ttc"
    
    font_paths = [
        impact_font_path,
        comic_bold_font_path,
        helvetica_path
    ]
    
    fun_font = None
    for p in font_paths:
        if os.path.exists(p):
            try:
                fun_font = ImageFont.truetype(p, 95)
                break
            except Exception as e:
                print(f"Error loading {p}: {e}")
                
    if fun_font is None:
        fun_font = ImageFont.load_default()
        
    text = "ANOTHER OPPORTUNITY!"
    
    def get_text_width(text, font):
        try:
            return draw.textlength(text, font=font)
        except AttributeError:
            w, _ = draw.textsize(text, font=font)
            return w

    text_w = get_text_width(text, fun_font)
    text_x = (TARGET_W - text_w) // 2
    text_y = (300 - 120) // 2
    
    # Draw foreground text with a thick black outline (stroke) to make it extremely bold and visible on any background
    draw.text(
        (text_x, text_y), 
        text, 
        font=fun_font, 
        fill=(255, 215, 0), # Gold/Yellow
        stroke_width=8, 
        stroke_fill=(0, 0, 0, 255) # Thicker solid black outline for high-contrast visibility
    )
    
    overlay_path = "temp_top_overlay.png"
    img.save(overlay_path)
    
    top_clip = ImageClip(overlay_path).set_duration(duration)
    return top_clip

def build_reel():
    video_file = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/1032 Raw.mp4"
    output_filename = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/1032_Thompson_Open_House_Reel.mp4"
    
    if not os.path.exists(video_file):
        print(f"Error: {video_file} not found!")
        return
        
    print(f"Found input video: {video_file}")
    print("Processing Open House vertical Instagram Reel...")
    
    # Load raw video clip and strip audio entirely
    raw_reel = VideoFileClip(video_file).without_audio()
    video_duration = raw_reel.duration
    
    # Scale and center crop to standard 1080x1920 Instagram dimensions
    print("Centering and scaling video to vertical 1080x1920...")
    cropped_reel = create_filled_clip(raw_reel)
    
    # Create the bottom overlay (badge + logo)
    bottom_overlay = create_bottom_overlay(video_duration)
    
    # Create the top opportunity overlay
    top_overlay = create_top_overlay(video_duration)
    
    # Animate the top overlay (bulging letters in a classy way)
    # Scale pulses between 0.95 and 1.05 every 1.5 seconds
    pulse_fn = lambda t: 1.0 + 0.06 * math.sin(2 * math.pi * t / 1.5)
    top_overlay_animated = top_overlay.resize(pulse_fn).set_position(("center", 200))
    
    # Layer everything together
    final_video = CompositeVideoClip([
        cropped_reel,
        bottom_overlay.set_position((0, 0)),
        top_overlay_animated
    ])
    
    # Export final video (silent, as requested: "No music is necessary")
    print(f"Writing final reel to: {output_filename}")
    final_video.write_videofile(
        output_filename,
        fps=30,
        codec="libx264",
        audio=False, # Make sure audio track is completely omitted/silent
        bitrate="10000k",
        threads=4,
        ffmpeg_params=["-crf", "18"]
    )
    
    # Clean up temp files
    for temp_f in ["temp_bottom_overlay.png", "temp_top_overlay.png"]:
        if os.path.exists(temp_f):
            os.remove(temp_f)
            
    print(f"\nSUCCESS! Open House Instagram Reel created at: {output_filename}")

if __name__ == "__main__":
    build_reel()
