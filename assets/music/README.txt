HOW TO ADD WEDDING MUSIC
========================

1. Place your .mp3 or .ogg file inside this folder: /assets/music/

2. Open index.html and find the <audio> tag (around line 55).
   Change the src attribute:
     <source src="assets/music/YOUR_SONG_NAME.mp3" type="audio/mpeg" />

3. Multiple songs (playlist):
   Add more <source> tags inside the <audio> element.
   The browser will use the first supported format.

Supported formats: .mp3 (recommended), .ogg, .wav

RECOMMENDED FREE SOURCES:
- https://pixabay.com (search "Indian classical wedding")
- https://freemusicarchive.org
- https://soundcloud.com (royalty-free)
