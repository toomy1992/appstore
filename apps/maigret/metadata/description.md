# Maigret

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/soxoj/maigret) [<img src="https://img.shields.io/github/issues/soxoj/maigret?color=7842f5">](https://github.com/soxoj/maigret/issues)

Open-source OSINT tool collecting detailed dossiers from 3,000+ websites by username.

---

## 📖 SYNOPSIS

Maigret is a powerful open-source intelligence (OSINT) tool that collects detailed dossiers on individuals using only a username. It searches across 3,000+ websites and social networks, extracts profile information, performs recursive searches to discover linked accounts, and generates comprehensive reports in multiple formats including HTML, PDF, JSON, CSV, and interactive graphs.

---

## ✨ MAIN FEATURES

- **3,000+ site database** - Searches across thousands of websites, auto-updated daily from GitHub
- **Recursive search** - Discovers linked usernames and IDs from found profiles
- **Built-in web UI** - Interactive interface with D3 graph visualization and report downloads
- **Multiple export formats** - HTML, PDF, JSON, CSV, TXT, XMind, and interactive D3 graph
- **AI profiling** - Optional AI-powered investigation summaries via OpenAI-compatible API
- **Proxy support** - Works with Tor, I2P, and custom proxies for anonymous investigations
- **Tag-based filtering** - Filter sites by country, category, or other tags
- **No API keys required** - Works out of the box without external service credentials

---

## 📋 PREREQUISITES

- No external dependencies required (no database, no Redis)
- Optional: OpenAI API key for AI profiling feature
- Optional: FlareSolverr instance for Cloudflare bypass
- Optional: Proxy/Tor configuration for anonymous investigations

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [soxoj/maigret](https://hub.docker.com/r/soxoj/maigret)**
- Official Docker image with web UI variant (`soxoj/maigret:web`)
- Built on `python:3.11-slim` base image
- Supports both `amd64` and `arm64` architectures

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data/reports` | `/app/reports` | Generated investigation reports |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `MAIGRET_PORT` | No | Web UI port (default: 5000) |
| `MAIGRET_OPENAI_API_KEY` | No | OpenAI API key for AI-powered investigation summaries |
| `MAIGRET_FLARESOLVERR_URL` | No | URL to FlareSolverr instance for Cloudflare bypass (e.g., `http://flaresolverr:8191`) |

---

## ⚙️ CONFIGURATION

The web interface is accessible at `http://your-server:5000`. From the web UI you can:

1. Enter a username to investigate
2. View results as an interactive D3 graph showing discovered accounts
3. Download reports in various formats (HTML, PDF, JSON, CSV, etc.)

To enable AI profiling, provide an OpenAI API key in the configuration. The AI will generate a natural language summary of the investigation findings.

### Cloudflare Bypass with FlareSolverr

Some websites use Cloudflare protection that blocks automated requests. To bypass this:

1. Deploy [FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) as a separate container
2. Configure the FlareSolverr URL in Maigret's settings (e.g., `http://flaresolverr:8191`)
3. Maigret will automatically route Cloudflare-protected requests through FlareSolverr

---

## 🔧 TROUBLESHOOTING

### PDF Reports Not Working

PDF reports (`--pdf`) require the optional `pdf` extra package. This app automatically installs it on startup, but if you encounter errors:

```bash
pip install 'maigret[pdf]'
```

PDF generation requires system-level graphics libraries. On Linux/macOS, additional dependencies may be needed. See the [PDF reports section](https://maigret.readthedocs.io/en/latest/usage.html#pdf-reports) in the official documentation for per-OS installation steps.

### Build Errors

If you encounter build errors, see the [troubleshooting guide](https://github.com/soxoj/maigret#troubleshooting) in the official repository.

---

## ⚠️ IMPORTANT

- Maigret is designed for legitimate OSINT research and security auditing purposes only
- Always comply with applicable laws and website terms of service when conducting investigations
- The tool searches public information only and does not bypass authentication or access private data
- AI profiling requires an OpenAI API key or compatible endpoint (local AI, OpenRouter, etc.)

---

## 💾 SOURCE

* [soxoj/maigret](https://github.com/soxoj/maigret)
* [Documentation](https://maigret.readthedocs.io)
* [Docker Hub](https://hub.docker.com/r/soxoj/maigret)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
