# Navidrome

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/navidrome/navidrome) [<img src="https://img.shields.io/github/issues/navidrome/navidrome?color=7842f5">](https://github.com/navidrome/navidrome/issues)

A modern, lightweight music server and streamer with compatibility for all Subsonic clients.

---

## 📖 SYNOPSIS

Navidrome is an open source web-based music collection server and streamer. It gives you freedom to listen to your music collection from any browser or mobile device. It's like your personal Spotify! With a beautiful, responsive web interface and compatibility with popular Subsonic clients, Navidrome makes it easy to access and share your music library.

---

## ✨ MAIN FEATURES

- Handles very large music collections efficiently
- Streams virtually any audio format available
- Reads and uses all your beautifully curated metadata
- Great support for compilations and box sets (multi-disc albums)
- Multi-user support with individual play counts, playlists, and favorites
- Very low resource usage
- Multi-platform Docker images (supports amd64, arm64, and more)
- Automatically monitors your library for changes
- Themeable, modern and responsive Web interface
- Compatible with all Subsonic/Madsonic/Airsonic clients
- On-the-fly transcoding with Opus encoding support
- Metadata agents (Last.fm, Spotify, Deezer) for artist images and information
- ReplayGain support for volume normalization
- Playlist management and smart playlists
- Sharing and public links for music
- Scrobbling support (Last.fm, ListenBrainz)

---

## 📋 PREREQUISITES

- Music files in a supported format (MP3, FLAC, OGG, M4A, WMA, etc.)
- Mounted music library volume in Docker
- FFmpeg (optional, for on-the-fly transcoding)

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [navidrome/navidrome](https://github.com/navidrome/navidrome)**
- Official Docker image: `deluan/navidrome:0.59.0`
- Supports: linux/amd64, linux/arm64, linux/arm/v7, linux/arm/v6
- Includes Alpine-based lightweight base image

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| --- | --- | --- |
| `/data` | `/data` | Database, cache, and application data |
| `/music` | `/music` | Your music library (mounted read-only for safety) |

---

## 📝 ENVIRONMENT VARIABLES

| Variable | Type | Default | Description |
| --- | --- | --- | --- |
| `ND_LOGLEVEL` | text | `info` | Application log level (error, warn, info, debug, trace) |
| `ND_ENABLEARTWORKPRECACHE` | boolean | `true` | Enable automatic image pre-caching for new music |
| `ND_ENABLEUSEREDITING` | boolean | `true` | Allow users to edit their profile and change passwords |
| `ND_ENABLEDOWNLOADS` | boolean | `true` | Enable music download functionality |
| `ND_ENABLESHARING` | boolean | `false` | Enable sharing/public links for music |
| `ND_ENABLETRANSCODINGCONFIG` | boolean | `false` | Enable transcoding configuration in UI |
| `ND_SESSIONTIMEOUT` | text | `48h` | Idle session timeout (e.g., 48h, 24h) |
| `ND_BASEURL` | text | `` | Base URL for reverse proxy setup |
| `ND_ENABLEFAVOURITES` | boolean | `true` | Enable favorite/heart functionality |
| `ND_ENABLENOWPLAYING` | boolean | `true` | Track currently playing songs |
| `ND_ENABLESCROBBLEHISTORY` | boolean | `true` | Enable scrobble history |
| `ND_ENABLESTARRATING` | boolean | `true` | Enable 5-star ratings |
| `ND_ENABLEINSIGHTSCOLLECTOR` | boolean | `true` | Enable anonymous data collection |
| `ND_LASTFM_ENABLED` | boolean | `true` | Enable Last.fm integration |
| `ND_SPOTIFY_ENABLED` | boolean | `false` | Enable Spotify integration |
| `ND_SPOTIFY_ID` | text | `` | Spotify API Client ID |
| `ND_SPOTIFY_SECRET` | password | `` | Spotify API Client Secret |
| `ND_DEEZER_ENABLED` | boolean | `true` | Enable Deezer integration |
| `ND_LISTENBRAINZ_ENABLED` | boolean | `true` | Enable ListenBrainz scrobbling |
| `ND_ENABLEREPLAYGAIN` | boolean | `true` | Enable ReplayGain for volume normalization |
| `ND_TRANSCODINGCACHESIZE` | text | `100MB` | Size of transcoding cache |
| `ND_IMAGECACHESIZE` | text | `100MB` | Size of image/artwork cache |

---

## ⚙️ CONFIGURATION

### Basic Setup

1. **Music Library Setup**: Mount your music folder to `/music` in the container (read-only)
2. **Data Persistence**: Ensure `/data` volume is mapped to store the database
3. **First Login**: Use default credentials (if not already configured)

### Advanced Features

- **Spotify Integration**: Configure with Spotify API credentials for artist images
- **Last.fm Scrobbling**: Connect your Last.fm account for track scrobbling
- **ListenBrainz**: Enable for open-source scrobbling
- **Reverse Proxy**: Set `ND_BASEURL` when running behind a proxy
- **Transcoding**: Enable `ND_ENABLETRANSCODINGCONFIG` to configure on-the-fly transcoding

### Multi-Library Setup

For multi-library support, additional music volumes can be mounted by modifying the Docker configuration.

---

## 🎯 USAGE EXAMPLES

### Adding Music

Simply place your music files in the mounted `/music` directory. Navidrome will automatically scan and import them.

### Accessing Navidrome

1. Open your browser and navigate to `http://your-server:4533`
2. Create an admin account on first login
3. Create additional user accounts as needed
4. Add your music library in settings

### Mobile Clients

Use any Subsonic-compatible client such as:
- Sublime Music
- Ultrasonic (Android)
- Stockfisch (iOS)
- Subsonic (Android)
- And many more at https://www.navidrome.org/docs/overview/#apps

---

## ⚠️ IMPORTANT

- **PUID/PGID**: The container runs as user 1000:1000 by default. Ensure your music library is readable by this user.
- **Music Folder**: Mount as read-only (`:ro`) to prevent accidental modifications.
- **Database Backup**: Regularly back up the `/data` volume to prevent data loss.
- **Large Libraries**: On first run, large music libraries may take time to scan. This is normal.
- **Transcoding**: Requires FFmpeg to be installed in the container for on-the-fly transcoding.

---

## 💾 SOURCE

* [navidrome/navidrome](https://github.com/navidrome/navidrome)
* [Official Website](https://www.navidrome.org)
* [Documentation](https://www.navidrome.org/docs)
* [Demo](https://www.navidrome.org/demo/)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository at https://github.com/navidrome/navidrome/issues or visit the community at https://www.reddit.com/r/navidrome/.
