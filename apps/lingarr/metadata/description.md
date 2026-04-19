# LINGARR

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/lingarr-translate/lingarr) [<img src="https://img.shields.io/github/issues/lingarr-translate/lingarr?color=7842f5">](https://github.com/lingarr-translate/lingarr/issues)

Subtitle translation automation for Sonarr and Radarr libraries.

---

## 📖 SYNOPSIS
Lingarr automates subtitle translation for your Radarr and Sonarr libraries. It supports manual and automated workflows, integrates with webhooks, and can translate through free upstream-supported services or API-backed providers such as LibreTranslate, DeepL, OpenAI, Anthropic, Gemini, DeepSeek, and local OpenAI-compatible routers.

---

## ✨ MAIN FEATURES
- Automatic subtitle translation for movies and TV shows
- Multiple translation backends, from Google and LibreTranslate to AI providers
- Sonarr and Radarr integration with webhook-triggered processing
- Path mapping support for differing container paths across your media stack
- Built-in statistics, logs, version checks, and persistent SQLite state

---

## 📋 PREREQUISITES
- Sonarr and/or Radarr must be reachable from the Lingarr container
- Your media library should live under `/runtipi/media/data` or be accessible through the `/media/data` mount
- Provider credentials are required for API-backed services such as OpenAI, Anthropic, Gemini, DeepSeek, or DeepL

---

## 🐳 DOCKER IMAGE DETAILS
- Based on [lingarr-translate/lingarr](https://github.com/lingarr-translate/lingarr)
- Uses the official multi-architecture image `ghcr.io/lingarr-translate/lingarr:1.0.9`
- This package uses Lingarr's supported internal SQLite mode, so no external database service or DB credentials are stored in Runtipi

---

## 📁 VOLUMES
| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `/runtipi/app-data/lingarr/data/config` | `/app/config` | Lingarr configuration, SQLite database, Hangfire data, and encryption keys |
| `/runtipi/media/data` | `/media/data` | Media library root used for subtitle discovery and translation output |

---

## 📝 ENVIRONMENT
| Variable | Required | Description |
| --- | --- | --- |
| `LINGARR_RADARR_URL` | No | Radarr base URL for movie synchronization and image lookups |
| `LINGARR_RADARR_API_KEY` | No | Radarr API key |
| `LINGARR_SONARR_URL` | No | Sonarr base URL for show synchronization and image lookups |
| `LINGARR_SONARR_API_KEY` | No | Sonarr API key |
| `LINGARR_MAX_CONCURRENT_JOBS` | No | Maximum number of translation jobs Lingarr may process concurrently |
| `LINGARR_SERVICE_TYPE` | Yes | Translation backend to use by default |
| `LINGARR_SOURCE_LANGUAGES` | Yes | Minified JSON array of source languages, for example `[{"name":"English","code":"en"}]` |
| `LINGARR_TARGET_LANGUAGES` | Yes | Minified JSON array of target languages, for example `[{"name":"Dutch","code":"nl"}]` |
| `LINGARR_LIBRE_TRANSLATE_URL` | No | LibreTranslate base URL when the `libretranslate` service is selected |
| `LINGARR_LIBRE_TRANSLATE_API_KEY` | No | Optional LibreTranslate API key |
| `LINGARR_OPENAI_API_KEY` | No | OpenAI API key |
| `LINGARR_OPENAI_MODEL` | No | OpenAI model name |
| `LINGARR_ANTHROPIC_API_KEY` | No | Anthropic API key |
| `LINGARR_ANTHROPIC_MODEL` | No | Anthropic model name |
| `LINGARR_ANTHROPIC_VERSION` | No | Anthropic API version header |
| `LINGARR_LOCAL_AI_ENDPOINT` | No | OpenAI-compatible endpoint URL for local or self-hosted AI backends |
| `LINGARR_LOCAL_AI_API_KEY` | No | Optional API key for local or self-hosted AI backends |
| `LINGARR_LOCAL_AI_MODEL` | No | Model name exposed by your local or self-hosted backend |
| `LINGARR_GEMINI_API_KEY` | No | Gemini API key |
| `LINGARR_GEMINI_MODEL` | No | Gemini model name |
| `LINGARR_DEEPSEEK_API_KEY` | No | DeepSeek API key |
| `LINGARR_DEEPSEEK_MODEL` | No | DeepSeek model name |
| `LINGARR_DEEPL_API_KEY` | No | DeepL API key |
| `LINGARR_TELEMETRY_ENABLED` | No | Enables Lingarr's optional anonymous telemetry submission |

---

## ⚙️ CONFIGURATION
1. Open Lingarr and complete the onboarding flow to create the first user.
2. In `Settings > Integration`, verify that Radarr and Sonarr URLs and API keys are set correctly.
3. In `Settings > Mapping`, map your *arr container paths to Lingarr's mounted library paths, for example `/movies` to `/media/data/movies` and `/tv` to `/media/data/tv`.
4. In `Settings > Services`, choose the translation backend you want to use and fill the matching API credentials if the selected provider requires them.

---

## 🎯 USAGE EXAMPLES
- Radarr webhook URL: `https://your-lingarr-domain/api/webhook/radarr`
- Sonarr webhook URL: `https://your-lingarr-domain/api/webhook/sonarr`
- Default provider in this package is `google`, so you can open Lingarr immediately and switch to another backend later if needed

---

## ⚠️ IMPORTANT
- Upstream examples often mount `/movies` and `/tv`, but this Runtipi package mounts `/runtipi/media/data` to `/media/data`. Use Lingarr path mappings if your *arr containers expose different paths.
- Automation schedules, subtitle validation, request templates, and other advanced processing options remain configurable inside Lingarr's own web UI after the initial install.
- Lingarr exposes a public version endpoint at `/api/version`, which is useful when checking update status or troubleshooting startup.

---

## 💾 SOURCE
* [lingarr-translate/lingarr](https://github.com/lingarr-translate/lingarr)
* [Official Website](https://lingarr.com/)
* [API Documentation](https://lingarr.com/docs/api/)

---

## ❤️ PROVIDED WITH LOVE
This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.