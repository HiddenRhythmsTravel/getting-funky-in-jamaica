#!/usr/bin/env python3
import os
import sys
from PIL import Image, ImageDraw, ImageFont

# Ensure LANCZOS compatibility
if not hasattr(Image, 'ANTIALIAS'):
    Image.ANTIALIAS = Image.Resampling.LANCZOS

from moviepy.editor import VideoFileClip, ImageClip, AudioFileClip, CompositeVideoClip

# Target resolution for Instagram reels (9:16)
TARGET_W, TARGET_H = 1080, 1920

def create_filled_clip(clip):
    clip_w, clip_h = clip.size
    
    # Scale to fill target dimensions (1080x1920)
    scale = max(TARGET_W / clip_w, TARGET_H / clip_h)
    new_w, new_h = int(clip_w * scale), int(clip_h * scale)
    clip = clip.resize(newsize=(new_w, new_h))
    
    # Center crop to 1080x1920
    x_center = new_w / 2
    y_center = new_h / 2
    clip = clip.crop(x1=x_center - TARGET_W/2, y1=y_center - TARGET_H/2, 
                     x2=x_center + TARGET_W/2, y2=y_center + TARGET_H/2)
    return clip

def create_text_overlay(duration):
    # Create transparent overlay image
    img = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Fonts
    comic_bold_font_path = "/System/Library/Fonts/Supplemental/Comic Sans MS Bold.ttf"
    futura_font_path = "/System/Library/Fonts/Supplemental/Futura.ttc"
    marker_felt_path = "/System/Library/Fonts/MarkerFelt.ttc"
    helvetica_path = "/System/Library/Fonts/HelveticaNeue.ttc"
    
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

    # Load "fun" font for Just Listed and Price
    # Prefer Comic Sans MS Bold or Marker Felt
    fun_font = load_font([
        (comic_bold_font_path, None),
        (marker_felt_path, 0),
        (helvetica_path, 4)
    ], 110)
    
    price_font = load_font([
        (comic_bold_font_path, None),
        (marker_felt_path, 0),
        (helvetica_path, 4)
    ], 150)
    
    # Load clean font for Address
    clean_font = load_font([
        (futura_font_path, 4), # Futura Bold/Medium
        (helvetica_path, 2), # Helvetica Bold
    ], 65)
    
    # Draw a premium glassmorphic badge at the bottom-center of the screen
    card_w, card_h = 860, 420
    card_x = (TARGET_W - card_w) // 2
    card_y = 1380
    
    # Rounded rectangle background with semi-transparent dark charcoal (matte premium)
    # 85% opacity elegant dark matte with subtle white border
    draw.rounded_rectangle(
        [card_x, card_y, card_x + card_w, card_y + card_h],
        radius=40,
        fill=(15, 15, 15, 215),
        outline=(255, 255, 255, 45),
        width=3
    )
    
    # Text contents
    line1 = "JUST LISTED"
    line2 = "$639k"
    line3_address = "1032 Thompson Dr"
    line4_city = "Bay Shore, NY"
    
    # Calculate text sizes to center them inside the card
    def get_text_width(text, font):
        try:
            return draw.textlength(text, font=font)
        except AttributeError:
            w, _ = draw.textsize(text, font=font)
            return w

    l1_w = get_text_width(line1, fun_font)
    l2_w = get_text_width(line2, price_font)
    l3_w = get_text_width(line3_address, clean_font)
    l4_w = get_text_width(line4_city, clean_font)
    
    # Centering positions
    l1_x = card_x + (card_w - l1_w) // 2
    l1_y = card_y + 35
    
    l2_x = card_x + (card_w - l2_w) // 2
    l2_y = card_y + 140
    
    l3_x = card_x + (card_w - l3_w) // 2
    l3_y = card_y + 280
    
    l4_x = card_x + (card_w - l4_w) // 2
    l4_y = card_y + 345
    
    # Draw shadows for readability
    draw.text((l1_x + 3, l1_y + 3), line1, font=fun_font, fill=(0, 0, 0, 150))
    draw.text((l2_x + 3, l2_y + 3), line2, font=price_font, fill=(0, 0, 0, 150))
    draw.text((l3_x + 2, l3_y + 2), line3_address, font=clean_font, fill=(0, 0, 0, 150))
    draw.text((l4_x + 2, l4_y + 2), line4_city, font=clean_font, fill=(0, 0, 0, 150))
    
    # Draw foreground text
    # "JUST LISTED" in fun vibrant letters (Gold/Yellow)
    draw.text((l1_x, l1_y), line1, font=fun_font, fill=(255, 215, 0)) # Gold
    # "$639k" in fun numbers (Neon Yellow/Green or gold)
    draw.text((l2_x, l2_y), line2, font=price_font, fill=(255, 255, 0)) # Bright Yellow
    # Address lines in clean white
    draw.text((l3_x, l3_y), line3_address, font=clean_font, fill=(255, 255, 255))
    draw.text((l4_x, l4_y), line4_city, font=clean_font, fill=(240, 240, 240))
    
    # Save temporary overlay image
    overlay_path = "temp_overlay_1032.png"
    img.save(overlay_path)
    
    # Create MoviePy clip
    overlay_clip = ImageClip(overlay_path).set_duration(duration)
    return overlay_clip

def build_reel():
    video_file = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/1032 Raw.mp4"
    audio_file = "/Users/adamlinderman/.gemini/antigravity/playground/Hidden Rhythms website/public/michael-jackson-beat-it-reggae.mp3"
    output_filename = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/1032_Thompson_Reel.mp4"
    
    if not os.path.exists(video_file):
        print(f"Error: {video_file} not found!")
        return
        
    if not os.path.exists(audio_file):
        print(f"Error: {audio_file} not found!")
        return
        
    print(f"Found input video: {video_file}")
    print(f"Found input audio: {audio_file}")
    print("Processing vertical Instagram Reel for 1032 Thompson Dr...")
    
    # Load raw video clip
    full_clip = VideoFileClip(video_file)
    
    # Strip original audio
    raw_reel = full_clip.without_audio()
    
    # Scale and center crop to standard 1080x1920 Instagram dimensions
    print("Centering and scaling video to vertical 1080x1920...")
    cropped_reel = create_filled_clip(raw_reel)
    
    # Create the text overlay
    overlay = create_text_overlay(cropped_reel.duration)
    
    # Layer text overlay over the video
    final_video = CompositeVideoClip([cropped_reel, overlay])
    
    # Apply the audio track (Reggae cover) with a smooth fade-out at the end
    print("Applying background music track...")
    audio = AudioFileClip(audio_file)
    
    # Trim audio to fit video duration and add fadeout
    audio = audio.subclip(0.0, final_video.duration)
    audio = audio.audio_fadeout(2.0)
    final_video = final_video.set_audio(audio)
    
    # Export the high-quality vertical Instagram Reel
    print(f"Writing final reel to: {output_filename}")
    final_video.write_videofile(
        output_filename,
        fps=30,
        codec="libx264",
        audio_codec="aac",
        bitrate="10000k",
        threads=4,
        ffmpeg_params=["-crf", "18"]
    )
    
    # Clean up temporary overlay files
    if os.path.exists("temp_overlay_1032.png"):
        os.remove("temp_overlay_1032.png")
        
    print(f"\nSUCCESS! Instagram Reel created at: {output_filename}")

if __name__ == "__main__":
    build_reel()
