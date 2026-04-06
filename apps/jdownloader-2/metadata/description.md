# JDOWNLOADER 2

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/jlesage/docker-jdownloader-2) [<img src="https://img.shields.io/github/issues/jlesage/docker-jdownloader-2?color=7842f5">](https://github.com/jlesage/docker-jdownloader-2/issues)

Self-hosted JDownloader 2 desktop in your browser.

---

## 📖 SYNOPSIS

JDownloader 2 is a powerful download manager for file hosts, link containers, archives, and Click'n'Load workflows. This container packages the full desktop application behind a browser-based remote desktop, making it easy to manage downloads from Runtipi without installing a local client.

---

## ✨ MAIN FEATURES

- Full JDownloader 2 desktop accessible from a web browser
- MyJDownloader account integration for remote control and mobile apps
- Automatic archive extraction, captcha handling, and download queue management
- Optional web file manager, terminal, audio, and HTTPS features from the GUI base image
- Persistent configuration and download storage across restarts and upgrades

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [jlesage/docker-jdownloader-2](https://github.com/jlesage/docker-jdownloader-2)**
- Uses `ghcr.io/jlesage/jdownloader-2:v26.03.1`
- Browser access is served on port `5800`
- Port `3129` is published for optional MyJDownloader direct connection mode

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data/config` | `/config` | Stores JDownloader settings, state, logs, certificates, and persistent metadata |
| `${APP_DATA_DIR}/data/output` | `/output` | Stores downloaded files and extracted archives |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `JDOWNLOADER_2_MYJDOWNLOADER_EMAIL` | No | Email address for your MyJDownloader account |
| `JDOWNLOADER_2_MYJDOWNLOADER_PASSWORD` | No | Password for your MyJDownloader account |
| `JDOWNLOADER_2_MYJDOWNLOADER_DEVICE_NAME` | No | Optional device name shown in MyJDownloader |
| `JDOWNLOADER_2_MAX_MEM` | No | Optional Java memory limit such as `2G` or `1024M` |
| `JDOWNLOADER_2_DISPLAY_WIDTH` | No | Width of the browser-based desktop session |
| `JDOWNLOADER_2_DISPLAY_HEIGHT` | No | Height of the browser-based desktop session |
| `JDOWNLOADER_2_DARK_MODE` | No | Enables dark mode for the browser wrapper |
| `JDOWNLOADER_2_WEB_AUDIO` | No | Enables browser audio streaming |
| `JDOWNLOADER_2_WEB_FILE_MANAGER` | No | Enables the browser file manager |
| `JDOWNLOADER_2_WEB_FILE_MANAGER_ALLOWED_PATHS` | No | Allowed paths for the web file manager, `AUTO` by default |
| `JDOWNLOADER_2_WEB_TERMINAL` | No | Enables the browser terminal |
| `JDOWNLOADER_2_SECURE_CONNECTION` | No | Enables HTTPS and encrypted GUI access |
| `JDOWNLOADER_2_WEB_AUTHENTICATION` | No | Enables a login page before loading the browser UI |
| `JDOWNLOADER_2_WEB_AUTHENTICATION_USERNAME` | No | Username for single-user web authentication |
| `JDOWNLOADER_2_WEB_AUTHENTICATION_PASSWORD` | No | Password for single-user web authentication |
| `JDOWNLOADER_2_USER_ID` | No | User ID used for files created in mounted volumes |
| `JDOWNLOADER_2_GROUP_ID` | No | Group ID used for files created in mounted volumes |
| `JDOWNLOADER_2_LANG` | No | Locale used by the container, such as `en_US.UTF-8` |
| `JDOWNLOADER_2_UMASK` | No | Umask for newly created files and folders |
| `JDOWNLOADER_2_SUP_GROUP_IDS` | No | Extra group IDs for shared storage access |
| `JDOWNLOADER_2_KEEP_APP_RUNNING` | No | Restarts the desktop application if it exits unexpectedly |
| `JDOWNLOADER_2_ENABLE_CJK_FONT` | No | Installs broader CJK font support |

---

## ⚙️ CONFIGURATION

After the container starts, open the web UI and complete JDownloader's first-run setup. If you want remote control from the MyJDownloader service, either fill in the MyJDownloader fields in Runtipi or configure the account directly from the JDownloader interface.

To use MyJDownloader direct connection mode, keep port `3129` published, then follow the upstream instructions to set custom device IPs and enable manual port forwarding in JDownloader advanced settings.

---

## ⚠️ IMPORTANT

- This container is an unofficial packaging of JDownloader 2 and is not maintained by the core JDownloader project
- Web authentication should be paired with `JDOWNLOADER_2_SECURE_CONNECTION=true` to avoid exposing credentials over plain HTTP
- The app keeps the browser desktop enabled on port `5800`; headless mode and custom web listening ports are intentionally not exposed through this Runtipi package
- If JDownloader fails to start after an upstream app update, the upstream recovery flow uses a `.fix_jd_install` file inside `/config`

---

## 💾 SOURCE

* [jlesage/docker-jdownloader-2](https://github.com/jlesage/docker-jdownloader-2)
* [JDownloader official website](https://jdownloader.org)
* [MyJDownloader](https://my.jdownloader.org)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
