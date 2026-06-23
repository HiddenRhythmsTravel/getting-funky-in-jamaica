#!/usr/bin/env python3
import os
import subprocess
import json
import random

ffmpeg_path = "/Users/adamlinderman/Library/Python/3.14/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
base_src_dir = "/Users/adamlinderman/Library/CloudStorage/GoogleDrive-adam@cubaeducationaltravel.com/My Drive/1. Travel Operations Folder/13. Jamaica HR/Getting Funky Website Build/04 Gallery Slideshow"
dest_reels_dir = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/assets/reels"
temp_dir = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/scripts/temp"

folders = ["2020", "2026"]
output_names = {
    "2020": "2020.mp4",
    "2023": "2023.mp4",
    "2024": "2024.mp4",
    "2025": "2025.mp4",
    "2025 - Medellin": "2025-medellin.mp4",
    "2026": "2026.mp4"
}

IMAGE_DURATION = 2.5
VIDEO_DURATION = 4.0
TARGET_DURATION = 40.0

# Keep track of video segment timestamps to generate JSON metadata for frontend audio ducking
ducking_metadata = {}

def get_media_path(file_path, folder_name):
    filename = os.path.basename(file_path)
    base_name, ext = os.path.splitext(filename)
    if ext.lower() in ['.png', '.jpg', '.jpeg', '.webp', '.heic']:
        local_dir = f"/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/public/assets/gallery-all/{folder_name.lower()}"
        local_jpg = os.path.join(local_dir, f"{base_name}.jpg")
        if os.path.exists(local_jpg):
            return local_jpg
    return file_path

def compile_clip(item, index, folder_name):
    fpath = get_media_path(item["path"], folder_name)
    media_type = item["type"]
    
    os.makedirs(temp_dir, exist_ok=True)
    temp_clip_path = os.path.join(temp_dir, f"clip_{folder_name}_{index}.mp4")
    
    # Standard 9:16 vertical overlay filter:
    # 1. Scale background to cover 1080x1920, crop, and apply heavy boxblur.
    # 2. Scale foreground to fit 1080x1920 (maintaining original aspect ratio).
    # 3. Overlay the clean centered foreground on the blurred background.
    vertical_pad_filter = (
        "split[bg_in][fg_in];"
        "[bg_in]scale=540:960:force_original_aspect_ratio=increase,crop=540:960,boxblur=30:5[bg];"
        "[fg_in]scale=540:960:force_original_aspect_ratio=decrease[fg];"
        "[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1"
    )
    
    if media_type == "image":
        print(f"    - Compiling image: {os.path.basename(fpath)}")
        
        # Check aspect ratio of the image.
        # Portrait/vertical images (w <= h) should scale & crop to fill the full screen.
        # Landscape/horizontal images (w > h) should use the blurred padding filter to fit without cropping.
        use_blur_pad = True
        try:
            from PIL import Image
            with Image.open(fpath) as img:
                w, h = img.size
                if w <= h:
                    use_blur_pad = False
        except Exception as e:
            print(f"      Error reading image size with PIL: {e}. Defaulting to blur pad.")
            
        img_filter = vertical_pad_filter if use_blur_pad else "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,setsar=1"
        
        cmd = [
            ffmpeg_path, "-y",
            "-loop", "1", "-i", fpath,
            "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
            "-t", str(IMAGE_DURATION),
            "-vf", img_filter,
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "24",
            "-c:a", "aac", "-shortest",
            temp_clip_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode != 0:
            print(f"      Error compiling image: {res.stderr}")
            return None
        return temp_clip_path
        
    elif media_type == "video":
        print(f"    - Compiling video: {os.path.basename(fpath)}")
        # Try to compile preserving audio
        cmd = [
            ffmpeg_path, "-y",
            "-ss", "0", "-i", fpath,
            "-t", str(VIDEO_DURATION),
            "-vf", vertical_pad_filter,
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "24",
            "-ac", "2", "-ar", "44100", "-c:a", "aac",
            temp_clip_path
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        if res.returncode == 0:
            return temp_clip_path
            
        # Fallback to silent audio if there is an audio codec mismatch or error
        print(f"      Audio preservation failed. Falling back to silent audio for {os.path.basename(fpath)}...")
        cmd_fallback = [
            ffmpeg_path, "-y",
            "-ss", "0", "-i", fpath,
            "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
            "-t", str(VIDEO_DURATION),
            "-vf", vertical_pad_filter,
            "-map", "0:v", "-map", "1:a",
            "-c:v", "libx264", "-pix_fmt", "yuv420p", "-r", "24",
            "-c:a", "aac", "-shortest",
            temp_clip_path
        ]
        res_fallback = subprocess.run(cmd_fallback, capture_output=True, text=True)
        if res_fallback.returncode == 0:
            return temp_clip_path
        else:
            print(f"      Fallback failed: {res_fallback.stderr}")
            return None

def compile_reel(folder):
    folder_path = os.path.join(base_src_dir, folder)
    if not os.path.exists(folder_path):
        print(f"Folder not found: {folder_path}")
        return
        
    print(f"\nScanning media in folder: {folder}")
    images = []
    videos = []
    
    for file in sorted(os.listdir(folder_path)):
        if file.startswith('.'):
            continue
        pass
        fpath = os.path.join(folder_path, file)
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.heic')):
            images.append({"path": fpath, "type": "image"})
        elif file.lower().endswith(('.mp4', '.mov', '.avi', '.m4v')):
            videos.append({"path": fpath, "type": "video"})
            
    print(f"  Found {len(images)} images and {len(videos)} videos.")
    
    # Select all media files from the folder to include everything
    # Mix them up deterministically so videos are interspersed with images
    random.seed(42)
    random.shuffle(images)
    random.shuffle(videos)
    
    selected_items = videos + images
    random.seed(42)
    random.shuffle(selected_items)
    
    # Calculate the total duration of the reel dynamically
    total_dur = len(videos) * VIDEO_DURATION + len(images) * IMAGE_DURATION
    
    print(f"  Selected {len(selected_items)} items. Total estimated duration: {total_dur}s.")
    
    # Compile each clip
    temp_clips = []
    timeline_pointer = 0.0
    video_segments = []
    
    for idx, item in enumerate(selected_items):
        clip_path = compile_clip(item, idx, folder.replace(" ", ""))
        if clip_path:
            temp_clips.append(clip_path)
            # Record video segment timestamps if it's a video
            clip_dur = VIDEO_DURATION if item["type"] == "video" else IMAGE_DURATION
            if item["type"] == "video":
                video_segments.append({
                    "start": timeline_pointer,
                    "end": timeline_pointer + clip_dur
                })
            timeline_pointer += clip_dur
            
    if not temp_clips:
        print("  No clips were successfully compiled.")
        return
        
    # Write list file
    list_path = os.path.join(temp_dir, f"list_{folder.replace(' ', '')}.txt")
    with open(list_path, 'w') as f:
        for clip in temp_clips:
            f.write(f"file '{clip}'\n")
            
    # Concatenate
    intermediate_path = os.path.join(temp_dir, f"intermediate_{folder.replace(' ', '')}.mp4")
    print(f"  Concatenating clips...")
    cmd_concat = [
        ffmpeg_path, "-y",
        "-f", "concat", "-safe", "0", "-i", list_path,
        "-c", "copy", intermediate_path
    ]
    res_concat = subprocess.run(cmd_concat, capture_output=True, text=True)
    if res_concat.returncode != 0:
        print(f"  Error concatenating: {res_concat.stderr}")
        return
        
    # Render final trimmed mp4
    out_name = output_names[folder]
    out_path = os.path.join(dest_reels_dir, out_name)
    print(f"  Rendering final optimized reel to {out_path} with duration {total_dur}s...")
    cmd_trim = [
        ffmpeg_path, "-y",
        "-i", intermediate_path,
        "-t", str(total_dur),
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.0", "-crf", "26",
        "-preset", "faster", "-movflags", "+faststart",
        "-c:a", "aac", "-b:a", "128k",
        out_path
    ]
    res_trim = subprocess.run(cmd_trim, capture_output=True, text=True)
    if res_trim.returncode == 0:
        print(f"  Successfully compiled reel: {out_name}")
        # Clean up temp files for this folder
        os.remove(list_path)
        os.remove(intermediate_path)
        for clip in temp_clips:
            if os.path.exists(clip):
                os.remove(clip)
                
        # Store metadata (keep all video segments that fit the dynamic duration)
        final_video_segments = []
        for seg in video_segments:
            if seg["start"] < total_dur:
                final_video_segments.append({
                    "start": seg["start"],
                    "end": min(seg["end"], total_dur)
                })
        ducking_metadata[output_names[folder]] = final_video_segments
    else:
        print(f"  Error trimming reel: {res_trim.stderr}")

if __name__ == "__main__":
    os.makedirs(dest_reels_dir, exist_ok=True)
    os.makedirs(temp_dir, exist_ok=True)
    
    print("Starting Getting Funky Reels Compilation...")
    for folder in folders:
        compile_reel(folder)
        
    # Write metadata JSON file for frontend audio ducking
    dest_metadata_json = "/Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/data/reels-metadata.json"
    if os.path.exists(dest_metadata_json):
        try:
            with open(dest_metadata_json, 'r') as f:
                existing_metadata = json.load(f)
        except Exception as e:
            print(f"Error loading metadata: {e}")
            existing_metadata = {}
    else:
        existing_metadata = {}
    existing_metadata.update(ducking_metadata)
    with open(dest_metadata_json, 'w') as f:
        json.dump(existing_metadata, f, indent=2)
    print(f"\nSuccessfully wrote reels metadata to {dest_metadata_json}")
    
    # Cleanup temp dir
    try:
        os.rmdir(temp_dir)
    except:
        pass
    print("All reels compiled successfully!")
