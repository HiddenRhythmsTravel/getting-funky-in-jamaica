import subprocess
import os
from PIL import Image, ImageDraw

ffmpeg_path = "/Users/adamlinderman/Library/Python/3.14/lib/python/site-packages/imageio_ffmpeg/binaries/ffmpeg-macos-aarch64-v7.1"
if not os.path.exists(ffmpeg_path):
    ffmpeg_path = "ffmpeg"

video_path = "./public/assets/reels/promo_16_9.mp4"
cimafunk_path = "./public/assets/reels/cimafunk_loop.mp4"
overlay_path = "./tmp_play_overlay.png"
out_gif_path = "./public/assets/email_video_loop.gif"

# 1. Create a high-definition transparent play button overlay image (90x63 px)
btn_w, btn_h = 90, 63
overlay = Image.new("RGBA", (btn_w, btn_h), (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)

# Draw rounded rectangle for play button (YouTube red with 90% opacity)
draw.rounded_rectangle(
    [(0, 0), (btn_w - 1, btn_h - 1)],
    radius=16,
    fill=(230, 33, 23, 230), # YouTube red
    outline=(255, 255, 255, 255), # solid white border
    width=2
)

# Draw white triangle pointing right
center_x, center_y = btn_w // 2, btn_h // 2
tri_points = [
    (center_x - 10, center_y - 16), # top left
    (center_x + 16, center_y),      # right tip
    (center_x - 10, center_y + 16)  # bottom left
]
draw.polygon(tri_points, fill=(255, 255, 255, 255))

# Save overlay
overlay.save(overlay_path, "PNG")
print("Generated temporary play overlay at:", overlay_path)

# 2. Run complex ffmpeg command
# Segment 1: Cliff dive (4.0s - 5.0s) from promo_16_9.mp4
# Segment 2: Cimafunk (1.0s - 2.0s) from cimafunk_loop.mp4 (Centered on lead singer)
# Segment 3: Trombone Shorty (7.0s - 8.0s) from promo_16_9.mp4
# Segment 4: Primera Linea (11.5s - 12.5s) from promo_16_9.mp4
# Scale: 540x304, FPS: 12, Dither: sierra2_4a

# For Cimafunk loop (540x960), we crop to 540x304 centered on his face area.
# Face area is roughly y=250 to y=554.
ffmpeg_cmd = [
    ffmpeg_path, "-y",
    "-i", video_path,
    "-i", cimafunk_path,
    "-i", overlay_path,
    "-filter_complex",
    "[0:v]trim=start=4.0:end=5.0,setpts=PTS-STARTPTS,scale=540:304,setsar=1[v1];"
    "[1:v]trim=start=1.0:end=2.0,setpts=PTS-STARTPTS,crop=540:304:0:280,scale=540:304,setsar=1[v2];"
    "[0:v]trim=start=7.0:end=8.0,setpts=PTS-STARTPTS,scale=540:304,setsar=1[v3];"
    "[0:v]trim=start=11.5:end=12.5,setpts=PTS-STARTPTS,scale=540:304,setsar=1[v4];"
    "[v1][v2][v3][v4]concat=n=4:v=1:a=0[vconcat];"
    "[vconcat][2:v]overlay=(W-w)/2:(H-h)/2[overlayed];"
    "[overlayed]split[s0][s1];[s0]palettegen=reserve_transparent=0[p];[s1][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle",
    "-r", "12",
    out_gif_path
]

print("Running optimized ffmpeg compilation command...")
subprocess.run(ffmpeg_cmd)

if os.path.exists(out_gif_path):
    print("Successfully generated high-definition custom GIF at:", out_gif_path)
    print("GIF File Size:", os.path.getsize(out_gif_path), "bytes")
else:
    print("FAILED to generate GIF.")

# Clean up
if os.path.exists(overlay_path):
    os.remove(overlay_path)
    print("Cleaned up temporary play overlay")
