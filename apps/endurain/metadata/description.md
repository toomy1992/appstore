# Endurain

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/endurain-project/endurain) [<img src="https://img.shields.io/github/issues/endurain-project/endurain?color=7842f5">](https://github.com/endurain-project/endurain/issues)

Self-hosted fitness tracking service designed for athletes who want full control over their fitness data. Similar to Strava but focused on privacy, customization, and self-hosting.

---

## 📖 SYNOPSIS

Endurain is a privacy-focused, self-hosted fitness tracking platform that puts you in control of your training data. Track activities from multiple sources (Strava, Garmin, manual uploads), manage your gear, log health metrics, and build a private fitness community. Built with Vue.js frontend and Python FastAPI backend, Endurain offers features comparable to commercial platforms without compromising privacy.

---

## ✨ MAIN FEATURES

- **Activity Tracking**: Multi-format support for .gpx, .tcx, and .fit files with detailed metrics and statistics
- **Cloud Integrations**: Automatic syncing with Strava and Garmin Connect platforms
- **Gear Management**: Track bicycles, shoes, wetsuits, racquets, skis, and snowboards with component-level tracking
- **Health Metrics**: Weight tracking, sleep logging, step counting, and personal fitness goals
- **Multi-User Support**: Role-based access control with admin and user interfaces
- **Advanced Authentication**: SSO/OIDC support, Multi-Factor Authentication (TOTP), and email-based password reset
- **Internationalization**: Multi-language support with customizable measurement units (metric/imperial)
- **Social Features**: User profiles, follower functionality, activity feeds, and community statistics
- **Privacy First**: Self-hosted architecture means 100% data control and complete privacy

---

## 📋 PREREQUISITES

- PostgreSQL 13+ (automatically provisioned as part of this Tipi installation)
- Docker with sufficient disk space for activity files and database
- Reverse proxy support for HTTPS (recommended for production use)

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on**: [endurain-project/endurain](https://github.com/endurain-project/endurain)
- **Image**: `ghcr.io/endurain-project/endurain:v0.17.6`
- **Registry**: GitHub Container Registry (official source)
- **Architecture Support**: amd64 (Intel/AMD), arm64 (ARM processors)
- **License**: AGPL-3.0

---

## 📁 VOLUMES

| Host Folder | Container Folder | Purpose |
|-------------|------------------|---------|
| `${APP_DATA_DIR}/data` | `/app/backend/data` | Activity files (.gpx, .tcx, .fit) and user data storage |
| `${APP_DATA_DIR}/logs` | `/app/backend/logs` | Application logs for debugging and monitoring |
| `${APP_DATA_DIR}/db` | `/var/lib/postgresql/data` | PostgreSQL database files (persistent storage) |

---

## 📝 ENVIRONMENT VARIABLES

### Required Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENDURAIN_HOST` | ✅ Yes | - | Base URL for API and OAuth callbacks (e.g., `http://192.168.1.100:8080` or `https://endurain.yourdomain.com`) |
| `ENDURAIN_SECRET_KEY` | ✅ Yes | - | JWT authentication secret key (minimum 32 characters, auto-generated if not specified) |
| `ENDURAIN_FERNET_KEY` | ✅ Yes | - | Encryption key for storing OAuth tokens and sensitive data (auto-generated if not specified) |
| `ENDURAIN_DB_PASSWORD` | ✅ Yes | - | PostgreSQL database password for secure access |
| `ENDURAIN_ADMIN_EMAIL` | ✅ Yes | - | Email address for the default admin user account |

### Database Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENDURAIN_DB_HOST` | No | `postgres` | PostgreSQL hostname (use `postgres` if using the bundled database service) |
| `ENDURAIN_DB_PORT` | No | `5432` | PostgreSQL port |
| `ENDURAIN_DB_NAME` | No | `endurain` | Database name to use |

### Authentication & Session Management

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENDURAIN_SESSION_IDLE_TIMEOUT_ENABLED` | No | `false` | Enable automatic logout after idle period |
| `ENDURAIN_SESSION_IDLE_TIMEOUT_HOURS` | No | `1` | Hours of inactivity before logout (if enabled) |
| `ENDURAIN_SESSION_ABSOLUTE_TIMEOUT_HOURS` | No | `24` | Maximum session lifetime in hours |
| `ENDURAIN_ACCESS_TOKEN_EXPIRE_MINUTES` | No | `15` | JWT access token lifetime |
| `ENDURAIN_REFRESH_TOKEN_EXPIRE_DAYS` | No | `7` | Refresh token lifetime |

### Location & Localization

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENDURAIN_TZ` | No | `UTC` | IANA timezone identifier (affects activity timestamps without GPS) |
| `ENDURAIN_REVERSE_GEO_PROVIDER` | No | `nominatim` | Geolocation provider: `nominatim` (free), `photon` (free), or `geocode` (requires API key) |
| `ENDURAIN_REVERSE_GEO_RATE_LIMIT` | No | `1` | Maximum requests per second for reverse geocoding |
| `ENDURAIN_GEOCODES_MAPS_API` | No | - | API key for Geocode Maps provider (only if using geocode provider) |

### System Configuration

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `ENDURAIN_UID` | No | `1000` | Container user ID for file permissions |
| `ENDURAIN_GID` | No | `1000` | Container group ID for file permissions |
| `ENDURAIN_ENVIRONMENT` | No | `production` | Environment type: `production`, `demo` (daily reset), or `development` |
| `ENDURAIN_LOG_LEVEL` | No | `info` | Logging verbosity level |
| `ENDURAIN_BEHIND_PROXY` | No | `false` | Set to `true` if behind a reverse proxy for correct IP detection |
| `ENDURAIN_FRONTEND_PROTOCOL` | No | `http` | Frontend protocol: `http` or `https` (when behind HTTPS proxy) |

---

## ⚙️ CONFIGURATION

### Initial Setup

1. **Set ENDURAIN_HOST correctly**: This must be the URL where Endurain is accessible from the internet for Strava/Garmin OAuth integration to work
   - Local network: `http://192.168.1.100:8080` (IP of your server)
   - Public domain: `https://endurain.yourdomain.com` (with HTTPS reverse proxy)

2. **Auto-Generated Credentials**: Leave `ENDURAIN_SECRET_KEY` and `ENDURAIN_FERNET_KEY` blank to auto-generate secure values

3. **Database**: The PostgreSQL database is automatically provisioned - just provide a strong password via `ENDURAIN_DB_PASSWORD`

4. **Admin User**: Login with the email specified in `ENDURAIN_ADMIN_EMAIL` - you'll set the password on first login

### Post-Installation Integration

After Endurain is running, configure integrations from the web interface:

1. **Strava Integration**:
   - Navigate to Settings → Integrations → Strava
   - Enter your Strava API credentials
   - Activities will auto-sync periodically

2. **Garmin Connect Integration**:
   - Navigate to Settings → Integrations → Garmin
   - Enter your Garmin Connect email and password
   - Activities will auto-sync when Endurain processes them

3. **Manual Activity Import**:
   - Upload .gpx, .tcx, or .fit files directly from the Activities page
   - Bulk import is supported

### Reverse Geolocation Configuration

Choose from three providers (configured during installation):

- **Nominatim** (Free, default): OpenStreetMap's reverse geocoding service
  - Perfect for privacy-conscious self-hosted deployments
  - Rate limited to 1 request/second by default

- **Photon** (Free): Komoot's reverse geocoding service
  - Slightly faster alternative to Nominatim
  - No API key required

- **Geocode Maps** (Paid): Commercial provider with higher rate limits
  - Fastest option
  - Requires API key (free plan: 1 req/second)
  - Professional option for demanding deployments

---

## 🎯 USAGE EXAMPLES

### Recording an Activity

1. Open Endurain → Activities page
2. Click "New Activity" or import from file
3. Set sport type, distance, date, time
4. Optional: Add notes, upload GPX track data
5. Activity appears in timeline and statistics

### Tracking Gear

1. Go to Settings → Gear Management
2. Add bikes, shoes, or other equipment
3. Link gear to activities to track wear
4. View maintenance history and component replacements

### Viewing Statistics

1. Dashboard shows recent activities and progress
2. Monthly statistics page displays totals and trends
3. User page (if public) shares your achievements
4. Gear summary shows usage and maintenance due

---

## ⚠️ IMPORTANT NOTES

1. **ENDURAIN_HOST is Critical**: Must be reachable from Strava/Garmin servers for OAuth integration. If using Strava/Garmin sync, test that the URL works from the internet.

2. **Timezone Impact**: Activities without GPS coordinates use the configured timezone. Ensure this matches your location for accurate timestamps.

3. **Database Backups**: The PostgreSQL database contains all your activity data. Consider regular backups:
   ```bash
   docker exec endurain-db pg_dump -U endurain endurain > backup.sql
   ```

4. **Storage Requirements**: High-volume activity tracking can consume significant disk space:
   - GPX/TCX files: ~0.5-5 MB per activity
   - Database: Grows with number of activities (typically 50-500 MB for accounts with 1000+ activities)
   - Logs: Rotate regularly to manage disk space

5. **SSL/TLS for Production**: Always use HTTPS in production. Configure a reverse proxy (nginx, Traefik) with a valid SSL certificate.

6. **Initial Login**: The first admin user is created using the `ENDURAIN_ADMIN_EMAIL` address. Change the password immediately after first login.

---

## 💾 SOURCE

* [Endurain GitHub](https://github.com/endurain-project/endurain)
* [Endurain Documentation](https://docs.endurain.com/)
* [Endurain Demo](https://demo.endurain.com/)
* [Community & Discussions](https://github.com/endurain-project/endurain/discussions)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by the Endurain project team. Endurain is open-source software licensed under AGPL-3.0.

---

For questions, issues, or feature requests, visit the [Endurain GitHub repository](https://github.com/endurain-project/endurain/issues).
