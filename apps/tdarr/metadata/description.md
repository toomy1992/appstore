# TDARR

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/HaveAGitGat/Tdarr) [<img src="https://img.shields.io/github/issues/HaveAGitGat/Tdarr?color=7842f5">](https://github.com/HaveAGitGat/Tdarr/issues)

Distributed transcoding and health checks for your media library.

---

## 📖 SYNOPSIS
Tdarr watches the same media folders as the rest of an *arr stack, then remuxes or transcodes files to the codecs, containers, and audio layouts you choose. The server stores libraries, plugins, and job history. A node inside the same container does the work, and extra nodes can join from other machines.

---

## ✨ MAIN FEATURES
- Library rules for codec, container, audio, and subtitle cleanup
- Health checks that flag corrupt files before you stream them
- FFmpeg and HandBrake plugin stacks, including community plugins
- An internal node so one container is enough, plus a published server port for extra nodes
- The same `/media/data` library path used by Jellyfin and Lingarr in this store

---

## 📋 PREREQUISITES
- Media files under `/runtipi/media/data`, the same root Jellyfin and Lingarr mount
- Enough disk space in the transcode cache for the largest file you process
- A GPU only if you later raise the GPU worker counts and pass the device into the container

---

## 🐳 DOCKER IMAGE DETAILS
- Based on [HaveAGitGat/Tdarr](https://github.com/HaveAGitGat/Tdarr)
- Official image `ghcr.io/haveagitgat/tdarr:3.04.00` (amd64 and arm64)
- The server image already includes one node. `internalNode` turns that node on
- PUID and PGID are `1000`, matching the other *arr apps in this store

---

## 📁 VOLUMES
| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `/runtipi/app-data/tdarr/data/server` | `/app/server` | Database, plugins, samples, and backups |
| `/runtipi/app-data/tdarr/data/configs` | `/app/configs` | Server and node JSON config. Environment variables override these files |
| `/runtipi/app-data/tdarr/data/logs` | `/app/logs` | Tdarr logs |
| `/runtipi/app-data/tdarr/data/temp` | `/temp` | Transcode cache. Must stay on fast storage with free space |
| `/runtipi/media/data` | `/media/data` | Library root shared with Jellyfin and Lingarr |

---

## 📝 ENVIRONMENT
| Variable | Required | Description |
| --- | --- | --- |
| `TDARR_AUTH` | No | Enable the sign-in page. Default `true` |
| `TDARR_API_KEY` | Yes | Hex secret. Tdarr uses `tapi_` plus this value as the seeded API key and the first admin password |
| `TDARR_INTERNAL_NODE` | No | Run a node in the server container. Default `true` |
| `TDARR_NODE_NAME` | No | Name of the internal node. Default `InternalNode` |
| `TDARR_FFMPEG_VERSION` | No | FFmpeg major version to download on startup. `7` or `6`. Default `7` |
| `TDARR_TRANSCODE_CPU_WORKERS` | No | CPU transcode workers. Default `2` |
| `TDARR_TRANSCODE_GPU_WORKERS` | No | GPU transcode workers. Default `0` |
| `TDARR_HEALTHCHECK_CPU_WORKERS` | No | CPU health-check workers. Default `1` |
| `TDARR_HEALTHCHECK_GPU_WORKERS` | No | GPU health-check workers. Default `0` |
| `TDARR_POLL_INTERVAL` | No | Milliseconds between job polls. Default `2000` |
| `TDARR_NODE_PRIORITY` | No | Node priority. `-1` means none. Default `-1` |
| `TDARR_START_PAUSED` | No | Start the internal node paused. Default `false` |
| `TDARR_MAX_LOG_SIZE_MB` | No | Tdarr log rotation size in MB. Default `10` |
| `TDARR_CRON_PLUGIN_UPDATE` | No | Cron schedule for plugin updates. Empty skips automatic updates |

---

## ⚙️ CONFIGURATION
1. Install Tdarr and open the web UI.
2. Sign in as `admin`. The password is `tapi_` followed by the API key secret from the app settings.
3. Create a library whose source folder is inside `/media/data`, for example `/media/data/movies` or `/media/data/tv`.
4. Add a plugin stack. A common first stack transcodes non-HEVC video to HEVC and keeps the audio you already want.
5. On the Tdarr tab, confirm the node named `InternalNode` is connected before you scan the library.

---

## 🎯 USAGE EXAMPLES
- Library source for movies: `/media/data/movies`
- Library source for series: `/media/data/tv`
- Extra node on another machine: image `ghcr.io/haveagitgat/tdarr_node:3.04.00`, server URL `http://<this-host>:8266`, the same `tapi_` API key, and the same `/media/data` and `/temp` paths
- Sonarr or Radarr can keep using their own folders under `/media/data`. Point Tdarr at those folders. No webhook is required

---

## ⚠️ IMPORTANT
- New Tdarr 3 installs start locked. The seeded key creates the `admin` user only when no users exist yet. Changing the secret later does not reset that password.
- Host port `8266` is the node server port. The web UI is the Runtipi app port (`8265` inside the container). Nodes do not use the web UI port.
- GPU workers stay at 0 because this package does not pass `/dev/dri` or an NVIDIA device. Add the device and raise the GPU worker count together, or those workers will sit idle.
- The first start downloads the selected FFmpeg build, so the container can take a few minutes before the web UI answers.
- Keep the image tag pinned. Tdarr's own Docker updater is left off so Runtipi stays in charge of the version.
- Extra nodes must see the same files at the same container paths. This install uses a mapped node, so `/media/data` on every node has to be the same library.

---

## 💾 SOURCE
* [HaveAGitGat/Tdarr](https://github.com/HaveAGitGat/Tdarr)
* [Tdarr](https://tdarr.io/)
* [Documentation](https://docs.tdarr.io/)
* [Docker run and compose](https://docs.tdarr.io/docs/installation/docker/run-compose)
* [Authentication](https://docs.tdarr.io/docs/other/authentication)

---

## ❤️ PROVIDED WITH LOVE
This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
