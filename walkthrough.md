# Walkthrough - Final Website Enhancements

We have successfully completed all pending enhancements for the **Getting Funky in Jamaica** platform. The website compiles perfectly, compiles to static content, and is ready for live production deployment.

---

## Completed Tasks & Implementations

### 1. Artist Line Up & Loop Adjustments
*   **Video Loops Focal Point**: Modified the video tags in `ArtistCard` inside [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx) from `object-[center_20%]` to `object-center`. On mobile, this correctly centers the focal area on the bands themselves in action, resolving the framing cutoffs.
*   **Roster Verifications**: Verified the precise alphabetized rosters for both Cuban and Traveling artist categories.
*   **Archive Cleanup**: Removed the legacy description paragraph:
    > "Our cultural exchanges are deeply rooted. These legendary performers shape our historic jams, concerts, and workshops."
    This paragraph has been fully deleted from the layout below the archive section in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx).

### 2. Collaborators UI Enhancements
*   **Centered Card Layouts**: Centered all text content inside the partner card containers in [StoryImpact.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/StoryImpact.tsx).
*   **Circular Logo Framing**: Replaced the rectangular logo showcase headers with premium, rounded circular borders (`rounded-full`).
*   **Branding Pops**: Added gold outlines (`border-brand-gold/30`) and a glowing drop shadow on hover state (`hover:shadow-[0_0_20px_rgba(245,124,0,0.4)]` and scale translation) to make the **Trombone Shorty Foundation**, **Zankel Music Fund**, and **Hidden Rhythms** logos visually pop.
*   **Color Preservation**: The **Hidden Rhythms** logo and other partner images are rendered in their full native colors (no grayscale filters).

### 3. Gallery Page Upgrade
*   **Permanent Assets**: Configured the gallery grid in [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) to pull from the exactly 21 permanent files inside `/assets/gallery/permanent/`.
*   **Randomized Grid**: Implemented dynamic shuffling of the 21 tiles on mount to ensure a fresh experience without causing hydration mismatch errors.
*   **Live Video Previews**: Embedded looping, muted HTML5 video elements for video files (`.mov`, `.MOV`, and `.mp4` formats) directly in the grid.
*   **Removed Alerts & Headers**: Removed the developer-facing background update daemon alert block at the bottom of the page, keeping the user interface clean and professional.
*   **Fullscreen Glass Lightbox Slideshow**:
    *   Clicking a tile opens a full-viewport glassmorphic background lightbox overlay (`bg-brand-green/90 backdrop-blur-2xl`).
    *   Loads the full 750+ image database from [gallery-images.json](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/data/gallery-images.json).
    *   Starts the slideshow exactly at the index of the clicked item (matching by file base name; if not found, it prepends the asset and starts at 0).
    *   Supports click navigation (Next/Previous Chevron buttons), keyboard arrow keys navigation (`ArrowLeft` / `ArrowRight` / `Escape`), and mobile swipe gestures (via touch events `onTouchStart`, `onTouchMove`, `onTouchEnd`).
    *   **Audio Coordination & Conflict Resolution**: Automatically pauses the global background playlist audio and caches the exact playhead position (`currentTime`) when opening or swiping onto a video slide, unmuting the native video clip audio. Seamlessly resumes background audio from the cached timestamp upon swiping to a static image slide or closing the lightbox entirely.


### 4. Floating Global Audio Player
*   **Omnipresent Widget**: Inserted the `GlobalAudioPlayer` component in the root [layout.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/layout.tsx), ensuring it floats cleanly at the bottom-left on all pages.
*   **Minimize/Maximize**: Supports full minimize toggle state.
    *   *Minimized*: A small circular button featuring a custom CSS equalizer animation that pulses matching the track play state.
    *   *Maximized*: A glassmorphic card showcasing the current track's title, artists list, and a spinning record CD icon.
*   **Controls**: Exposes options to toggle **Mute/Unmute** (syncs globally with all sections) and **Next Track** (which loops through the playlist).
*   **Track 1 Swap**: Overwrote the Track 1 audio asset with "Bacao Rhythm & Steel Band - Juicy Fruit - BC124-45 - Side B.mp3" and set the starting playhead to `0:00` for first-load and timeline overrides.
*   **Metadata Integration**: Displays "Juicy Fruit" and "Bacao Rhythm & Steel Band" in the floating player details.
*   **Equalizer CSS**: Added custom `@keyframes equalizer` animation parameters in [globals.css](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/globals.css) to drive the playback visuals.

### 5. Year & Timeline Section Layout Refactoring
*   **Elimination of Hover Overlays**: Completely removed the "Play Reel Sound" overlay block from [TimelineGallery.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/TimelineGallery.tsx) to ensure the reels remain clean and visually unencumbered.
*   **Global Zero-Margin Spacing Reset**: Applied a strict layout reset on the main timeline container, individual year grid rows, media wrappers, and underlying card columns. Set `margin: 0 !important; padding: 0 !important; width: 100%; max-width: 100% !important; border: none; border-radius: 0;` globally to achieve a seamless, edge-to-edge cinematic aesthetic.
*   **Centered Mobile Layout Structure**: Restructured viewports under 768px wide into a centered column layout (`display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; width: 100vw;`) with zero margins.
*   **Dynamic Video Orientation Sizing**: Scaled vertical reels to `width: 100vw; height: 65vh;` and horizontal reels to `width: 100vw; height: 45vh;` on mobile with `object-fit: cover;` to center the video content perfectly on the screen.
*   **Seamless Desktop Split Layout**: Enforced a perfect 50/50 split on desktop screens (>=768px) where the left media column binds to the absolute left edge of the display, the right narrative column binds to the absolute right edge, and they meet in the center with zero pixels of separation.
*   **Premium Copy & Grammatical Refinement**: Integrated premium copy descriptions across all project years (2020–2026) with the em-dash edit for 2020 (*"travel experience, it was"*).
*   **Removal of Audio Controls**: Removed the duplicate "Mute Audio" button and "Toggle Background Music" text label from the timeline control panels, keeping controls clean and visually tidy.



### 6. Day-to-Day Itinerary Program Details Overwrite
*   **Verbatim Copy Ingestion**: Replaced the entire itinerary dataset inside [VipProgram.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/VipProgram.tsx) with the high-end 5-day Day-to-Day itinerary text. Printed 100% verbatim, including optional events, sound-system bullets, and Island Exodus URLs.
*   **Interactive Day Sub-Tabs Selector**: Implemented a polished sub-tab navigation (`[Day 1] [Day 2] [Day 3] [Day 4] [Day 5]`) under the Itinerary section using Framer Motion (`layoutId="activeDayPill"`) for fluid spring transitions.
*   **Gradient Timeline Layout Container**: Built a flowing vertical timeline design with a gold-to-transparent line gradient, glowing nodes, and clean structural line breaks separating:
    - Time tags (rendered as a custom gold outlined badge with a `Clock` icon)
    - Block headers (large, bold font-serif text)
    - Narrative paragraphs (soft white text, with line breaks and interactive URLs parsed on the fly)
*   **Markdown & URL Ingestion Parser**: Added a dynamic client-side text formatter that splits paragraphs, preserves hanging list item layouts (for the Day 4 Deep Dives), bolds Markdown elements (`**Optional...**`), and creates clickable links (`https://www.islandexodus.com`) automatically.

### 7. Getting Funky Logo Spacing Adjustment
*   **Desktop Logo Shift**: Added a top margin class spacer (`mt-4 md:mt-12`) to the Getting Funky logo container inside [Hero.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/Hero.tsx). This shifts the logo down slightly on desktop upon page load for optimal header spacing, while keeping it perfectly centered.

### 8. Performance Optimization & Deployment
*   **Video Compression**: Squeezed the large `Brass Band Colombia New Orleans.MOV` asset (145.52 MB) down to **2.45 MB** using `ffmpeg` H.264 compression, resolving the GitHub file size push limit and allowing the page to load fast on desktop and mobile viewports.
*   **Vercel Build**: Ran production compiler checks (`npm run build`) which succeeded with zero compilation errors. Pushed all commits to GitHub to trigger Vercel's automatic deploy pipeline.

### 9. Vercel Toolbar Suppression
*   **Environment Variable Deactivation**: Created a `.env.production` (and `.env` for local preview/development testing) setting `VERCEL_TOOLBAR=0` directly in the root directory. Added the `VERCEL_TOOLBAR: "0"` variable inside `env` parameters in [next.config.ts](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/next.config.ts) to suppress Vercel's Edge/routing toolbar injection.
*   **Script/DOM Observer Interceptor**: Integrated a synchronous interceptor script in the `<head>` of the root [layout.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/layout.tsx). This uses a `MutationObserver` to dynamically scan added elements, identifying and immediately removing any script nodes sourced from `vercel.com/toolbar` on the client viewport before they compile or run.

### 10. Revised 3-Song Audio Engine Overwrite
*   **3-Song Core Playlist**: Configured the global audio engine to map to three exact assets:
    1.  *Track 1*: `"Juicy Fruit"` by Bacao Rhythm & Steel Band (mapped to `/assets/audio/track2.mp3`)
    2.  *Track 2*: `"I Don't Care"` by Cimafunk ft. Nik West (mapped to `/assets/audio/track1.mp3`)
    3.  *Track 3*: `"Carnival Horns"` by Mista Nova Session (mapped to `/assets/audio/track3.mp3`)
*   **Sequential Playlist Progression**: Initialized the player in a muted idle state to comply with standard browser policies. Added scroll, click, and touch event triggers in [InteractionUnlocker.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/InteractionUnlocker.tsx) to unmute and play Track 1 upon first physical interaction. Naturally loops sequentially: Track 1 &rarr; Track 2 &rarr; Track 3 &rarr; Track 1.
*   **Contextual Section Triggers (Absolute Overrides)**:
    *   *VIP Program Trigger*: Created an `IntersectionObserver` on the VIP Program section in [VipProgram.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/VipProgram.tsx) and updated click handlers in [Navbar.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/Navbar.tsx) to immediately crossfade into Track 2 ("I Don't Care") when entered or clicked.
    *   *Gallery Trigger*: Set up an `IntersectionObserver` on the Gallery grid in [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) and updated navigation handlers in [Navbar.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/Navbar.tsx) to immediately crossfade into Track 3 ("Carnival Horns") when loaded, scrolled into view, or clicked.

### 11. Artist Roster & Section Renaming
*   **Added Robe L Ninho & La Reyna y Real**:
    *   Added Colombian artist `"Robe L Ninho"` to the `travelingArtists` array, fully alphabetized in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx).
    *   Added Cuban hip-hop duo `"La Reyna y Real"` to the `cubanArtists` array, fully alphabetized in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx).
*   **Renamed Subsection Header**: Renamed the section header from `"Traveling Artists"` to `"International Artists"` in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx) to match the user's preference.
*   **Roster Alphabetization Correction**: Corrected the sorting order of the `cubanArtists` array in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx) to ensure `"Victor Campbell"` correctly precedes `"Wampi"`.

### 12. Media Re-indexing, Reel Rebuilding, and Dynamic Captions
*   **Re-indexed 2020 and 2026 Directories**: Sync-copied the updated Google Drive media folders to local assets, automatically resizing images to a max width/height of 1000px, converting HEIC files to web-friendly `.jpg` formats via `sips`, and regenerating `gallery-images.json` and `gallery-active.json`.
*   **Rebuilt & Optimized Background Reels**: Recompiled `2020.mp4` and `2026.mp4` using local `ffmpeg`. Optimizations include:
    *   Setting resolution to `540x960` (providing 4x pixel reduction to make background video loading extremely fast on both mobile and desktop viewports).
    *   Changing compilation compression parameter to `-crf 26` with `-preset faster` for highly efficient file size reduction.
    *   Lifting 2020 custom format exclusions to include all valid media assets (including `.mov` clips like `Maracas in Old Havana.mov`).
    *   Automatically mapping Google Drive HEIC assets to their converted local JPG files to resolve video compilation errors.
*   **Dynamic Filename-to-Caption Rendering Engine**: Integrated a formatting utility in [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) that extracts raw filename strings, strips out their file format extensions, replaces all underscores and hyphens with clean spaces, and displays the result as clean text descriptions on the gallery grid hover overlays and inside the fullscreen lightbox slideshow.

### 13. Lightbox State Decoupled from Audio Player
*   **Isolated Image-to-Image Navigation**: Introduced `prevActiveIsVideoRef` and `prevLightboxOpenRef` in [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) to capture state transitions between slides explicitly. Image-to-image slide navigation now updates the layout slideshow DOM without calling `.play()`, `.pause()`, or changing the background music track time. The track (Track 3: Carnival Horns) plays continuously and uninterrupted.
*   **Life-Cycle Video Coordination**:
    *   *Image &rarr; Video*: Pauses the background track and caches the playback timestamp, allowing the native video audio stream to play.
    *   *Video &rarr; Image / Closed*: Stops the video timeline playback and un-mutes/resumes the background audio track precisely from its cached timestamp position without restarting the track from the beginning.
    *   *Video &rarr; Video*: Destroys the unmounted video element, automatically terminating its audio feed, and mounts the next video element to initialize playback without invoking background audio triggers.

### 14. Gallery Grid Re-Ingestion & Web Optimization
*   **Roster Re-Ingestion & Cache Purge**: Flushed the local `public/assets/gallery/permanent` directory and synced the 22 new permanent files from the Google Drive `Gallery` folder. Formats include high-resolution images, `.mp4` and `.mov` movie clips, and a `.heic` file which was converted natively to `.jpg` via `sips`.
*   **Masterful Web Size Compression**:
    *   *Images*: Resized all images to a maximum height/width of `1000px` on the longest edge, compressing them to standard `.jpg` format. This reduced files like `Conga Line at Yarini.jpg` and `Tropical Crowd.jpg` from **22-23 MB** down to **~150-200 KB** (over a 99% size reduction).
    *   *Videos*: Scaled movie clips to a maximum height of `720px` (maintaining native aspect ratio) and encoded them into `.mp4` format using `ffmpeg` with compression parameter `-crf 28` and `-preset faster`. This compressed the `Super Jam Colombian style...` clip from **77.89 MB** down to a highly optimized **2.34 MB**.
    *   *Roster Size Reduction*: Squeezed the entire folder from **230 MB+** down to under **17 MB** total, ensuring lightning-fast load times.
*   **Advanced Title-Case Capitalization**: Enhanced the dynamic `formatCaption` helper in [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) to apply proper Title Case formatting. Words are capitalized except for minor articles, conjunctions, and prepositions (unless they are the first word), while developer abbreviations (like `FAC`, `GF`) are kept fully uppercase.

### 15. Branding Update & Typography Sync
*   **Font Discovery (Carla Sans)**: Extracted and copied the brand's proprietary font family files (**Carla Sans** in Light, Regular, Semibold, and Bold) from Google Drive to `public/fonts/`.
*   **Universal Heading Typography Override**: Configured `@font-face` rules in [globals.css](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/globals.css) and appended a universal CSS rule applying `'Carla Sans'` (with `serif` fallback) to all headings, tags `h1`-`h6`, hero main texts, timeline year titles, and title classes, forcing them to uppercase with `0.05em` letter spacing.
*   **Navigation Logo Replacement**: Swapped the top-left navigation square logo with the designer's pre-made transparent horizontal logo (`logo_transparent.png`), cropped from `PNG HORIZONTAL 1.png` in Google Drive. Re-scaled the wrapper element responsibly (`w-32 h-9 md:w-40 md:h-11`) to prevent squishing.
*   **Navbar Redundancy Cleanup**: Removed the redundant "hosted by Hidden Rhythms" text link block next to the brand logo, keeping the header clean and balanced since the new horizontal logo already includes the brand name.

### 16. Audio UX Refactor & Omnipresent Mute Widget
*   **3.5-Second Linear Fade-In**: Integrated a linear autoplay volume ramp-up script in [AudioContext.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/contexts/AudioContext.tsx) for the initial playback of Track 1 ("Juicy Fruit"). The volume starts at `0.0` and increases to the ambient target `0.45` over 3.5 seconds.
*   **Conflict Prevention & State Safety**: Added interval clearance safety logic. Any event that alters the volume state during the 3.5-second fade-in window (such as muting, pausing, or crossfading to another track) immediately clears the active interval.
*   **Omnipresent Minimized Pill**: Upgraded the minimized layout in [GlobalAudioPlayer.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/GlobalAudioPlayer.tsx) from a basic music icon to an horizontal floating pill widget.
*   **1-Click Mute Control**: Placed a direct, responsive mute/unmute toggle button (`Volume2`/`VolumeX` icons) on the left side of the minimized pill, enabling instant audio control in a single tap from any viewport.
*   **Track Status & Visual Equalizer**: Configured the pill to display current track metadata ("Muted" when silent, song title and artist when playing) next to a compact animated equalizer graphic, keeping playback status completely visible.
*   **Layering Overrides**: Set the player widget container to `z-[99999]` to guarantee it remains sticky and floats cleanly on top of all page layers and interactive sections.

### 17. Opt-In Expanded Controller Matrix & User-Directed Playback
*   **Deletion of Automated Section Triggers**: Completely removed the `IntersectionObserver` scroll triggers in [VipProgram.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/VipProgram.tsx) and [page.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/gallery/page.tsx) that automatically forced background track overrides.
*   **Navbar & Navigation Link Cleanup**: Removed the `forceVIPTrack` and `forceGalleryTrack` click handlers from all links and mobile menu triggers in [Navbar.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/Navbar.tsx). Navigating the site now has zero impact on active audio playback states.
*   **Track Completion Hard Stop & Auto-Expand**: Updated the HTML5 audio `ended` event hook in [AudioContext.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/contexts/AudioContext.tsx) to stop playback entirely (no loop, no autoplay next) and instantly expand the player widget from its minimized pill layout.
*   **Global Minimize State**: Migrated the player's minimized/maximized layout state to the global `useAudio` context so it can be controlled programmatically from event hooks.
*   **Polished Controller Controls Layout**: Redesigned the maximized card inside [GlobalAudioPlayer.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/GlobalAudioPlayer.tsx) to display three prominent, labeled, and styled user options:
    *   **[REPLAY]**: Restarts the active track from `0:00`, unmutes the engine, sets volume to ambient `0.45`, and calls `.play()`.
    *   **[NEXT TRACK]**: Cycles manually through the background portfolio songs.
    *   **[MINIMIZE / CLOSE]**: An explicit button at the bottom of the card to fold the widget back into the compact music pill layout.
*   **Successful Verification**: Compiled the site locally using `npm run build` with Google Fonts network fetches verified. Pushed all codebase files cleanly.

### 18. Featured Artist Video Scroll-Play & Controls Refactor
*   **Viewport Tracker Observer for Mobile**: Implemented a mobile-specific (`max-width: 768px`) `IntersectionObserver` on the featured artist cards in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx). This automatically starts video playback (`.play()`) at a 50% screen visibility threshold, and pauses playback (`.pause()`) when the card rolls off-screen, conserving device processing power and battery.
*   **Auto-Loop & Playsinline Mobile Fixes**: Standardized autoplay settings (`autoPlay`, `loop`, `muted={isLocalMuted}`, and `playsInline`) on both front and back face video elements to prevent iOS Safari/Android browser overrides.
*   **Card Overhaul & Verbatim Labels**:
    - Removed the desktop-specific `"Hover to listen"` visual overlay text from the card DOM.
    - Added an interactive button labeled exactly **`"Click for artist profile"`** to trigger the card flip animation.
    - Added an interactive button labeled exactly **`"Mute media"`** with dynamic volume indicators (`VolumeX`/`Volume2`) that toggles local video audio play states and coordinates automatically with the global audio engine state.
*   **Decoupled Card Flip & Audio Controls**: Separated card flip navigation from audio play states. Clicking the flip button now reveals the bio text without unmuting or altering video playback.
*   **Successful Staging Deploy**: Verified the project build compilation via `npm run build` and promoted the changes to staging/production on Vercel.

### 19. Exit-Intent Zoho Campaigns Popup Trigger
*   **Client-Side Event Wrapper**: Wrapped the Zoho Campaigns initialization script (`loadZCPopup`) inside a custom event handler in [layout.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/layout.tsx).
*   **Desktop Exit-Intent Trigger**: Listens for the mouse cursor exiting the upper boundary of the viewport (`mouseleave` event, with `clientY < 50` check), indicating intent to switch tabs or close the browser.
*   **Mobile Visibility Trigger**: Listens for the tab or browser being backgrounded (`visibilitychange` event, checking `visibilityState === 'hidden'`), identifying exit intent on touch screen devices.
*   **Event Cleanup**: Automatically removes active event listeners once the script is loaded to optimize frontend resources.

### 20. Advanced Vercel Toolbar Blocker
*   **Global CSS Hiding Rule**: Injected an absolute CSS rule in [layout.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/layout.tsx) that targets the Vercel Toolbar custom elements (`vercel-live-feedback`, `vercel-preview-feedback-iframe`, `[id*="vercel-preview-feedback"]`, `iframe[src*="vercel.com"]`) and hides them instantly (`display: none !important; visibility: hidden !important; width: 0 !important; height: 0 !important; pointer-events: none !important;`). This guarantees that even if loaded at the Edge proxy level or by browser extensions, the toolbar can never be rendered or interacted with.
*   **Proactive JavaScript Purge**: Added a startup parser that immediately searches for and removes any `script[src*="vercel"]` tags or toolbar custom elements during DOM parsing and loading stages.
*   **Persistent Cleanup Loop**: Deployed a passive intervals timer (`setInterval(purge, 500)`) that regularly sweeps and removes any delayed toolbar DOM injections.

### 21. Hover/Scroll Audio Crossfader & Card Overhaul
*   **Purged Loop Overlay**: Completely removed the "Loop" indicator from the top corner of the artist video layouts in [ArtistLineUp.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/ArtistLineUp.tsx).
*   **Master-Slave Crossfader APIs**: Implemented `fadeGlobalOut` and `fadeGlobalIn` in [AudioContext.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/contexts/AudioContext.tsx) to fade background tracks to 0 volume and pause, or resume and fade them back up to standard `0.45` volume over 300ms.
*   **Desktop Hover Crossfader**: Handled `onMouseEnter` / `onMouseLeave` on desktop viewports to fade global audio and smoothly fade-in/fade-out the local card video's audio to a crisp `0.60` volume limit.
*   **Mobile Scroll-To-Listen Observer**: Deployed an `IntersectionObserver` targeting a 60% center-screen viewport threshold (`rootMargin: "-20% 0px -20% 0px"`) on mobile breakpoints (< 768px). This automatically silences the global background music and plays/unmutes the video's audio when scrolled into view, reverting on scroll-out.
*   **Mute Override Button Layer (Opt-Out)**: Integrated a floating "Mute / Unmute" button layer directly over each video frame. Clicking it sets a local `artist_audio_opt_out = true` state that blocks any further scroll/hover audio triggers, force-mutes the video, and immediately restores the background music.
*   **Session-Wide Persistence & Syncing**: Connected the `artistAudioOptOut` state to `AudioContext` and backed it up using `sessionStorage.setItem("artist_audio_opt_out")`. This ensures that when a user clicks the mute override button on any individual video card, all other cards on the page instantly recognize the preference change and prevent subsequent hover or scroll unmuting triggers.

### 22. Site-Wide Password Protection Gate
*   **Access Credentials Security**: Configured the global unlock code to exactly `Kingston2027`.
*   **Persistent Auth Token (GF_AUTHORIZED)**: Stores a secure 7-day browser cookie and local storage flag (`gf_authorized = true`) upon successful entry to remember user access.
*   **Branded Lock Screen Overlay**: Created a premium full-screen lock layer inside [PasswordGate.tsx](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/components/PasswordGate.tsx) with a solid brand green background (`bg-brand-green`), a centered circular brand logo showcase container, a clean input field with placeholder "Enter Access Code...", and an unlock validation button.
*   **Subtle Error Notifications**: Displays an elegant warning (*"Invalid code. Please try again."*) below the input field on wrong entries.
*   **Autoplay Silence Enforcement**: Wraps layout children (including `InteractionUnlocker` and `GlobalAudioPlayer`) inside the auth check, preventing any background audio or interaction trackers from activating until the user successfully authenticates.
*   **Mobile Viewport Height Adaptive Scaling**: Integrated CSS height media queries (`@media (max-height: 700px)` and `@media (max-height: 500px)`) in [globals.css](file:///Users/adamlinderman/.gemini/antigravity/playground/fractal-kilonova/src/app/globals.css) to automatically scale down the brand logo when the soft keyboard is visible, preventing layout elements from getting pushed off-screen.
