# Example App Store Template

This repository serves as a template for creating your own custom app store for the Runtipi platform. Use this as a starting point to create and share your own collection of applications.

## Repository Structure

- **apps/**: Contains individual app directories

  - Each app has its own folder (e.g., `whoami/`) with the following structure:
    - `config.json`: App configuration file
    - `docker-compose.json`: Docker setup for the app
    - `metadata/`: Contains app visuals and descriptions
      - `description.md`: Markdown description of the app
      - `logo.jpg`: App logo image

- **tests/**: Contains test files for the app store

  - `apps.test.ts`: Test suite for validating apps

## Getting Started

This repository is intended to serve as a template for creating your own app store. Follow these steps to get started:

1. Click the "Use this template" button to create a new repository based on this template
2. Customize the apps or add your own app folders in the `apps/` directory
3. Test your app store by using it with Runtipi

## Documentation

For detailed instructions on creating your own app store, please refer to the official guide:
[Create Your Own App Store Guide](https://runtipi.io/docs/guides/create-your-own-app-store)

## Applications (21 Total)

### AI
- **Actual AI**: AI for Actual Budget.
- **Paperless-AI**: AI document analyzer for Paperless-ngx.
- **Supergateway**: MCP Gateway: stdio ↔ SSE/WS/HTTP bridge.

### Finance
- **OpenBB**: Open-source financial data platform for analysts, quants, and AI agents.
- **Wealthfolio**: Investment tracking app.
- **Wealthfolio MCP**: Portfolio MCP server.

### Security
- **Keycloak**: Open source identity and access management solution.
- **SphereSSL**: SSL certificate manager dashboard.

### Data
- **Nextcloud**: Self-hosted cloud storage solution for files, contacts, calendars and more.

### Media
- **Autobrr**: Torrent download automation.
- **Configarr**: TRaSH Guides sync for *arr apps.
- **Decypharr**: Debrid QBittorrent API.
- **Huntarr**: Automated *arr media hunter.
- **Navidrome**: A modern, lightweight music server and streamer with compatibility for all Subsonic-compatible clients.
- **Profilarr**: Configuration management for Radarr/Sonarr.
- **Prowlarr**: Indexers manager & proxy.
- **Releasarr**: Music release monitoring tool.
- **Spottarr**: Spotnet indexer for *arr.
- **Ygégé**: YGG Torrent indexer.

### Utilities
- **Transmission (VPN)**: BitTorrent client with VPN support.
- **WiseMapping**: Free, open-source web-based mind mapping tool for creating, managing, and collaborating on mind maps in real-time.

---

## Built With

<p align="left">
  <a href="https://runtipi.io/"><img src="https://img.shields.io/badge/%E2%9B%BA%20runtipi.io-2C2C32?style=for-the-badge" alt="Runtipi" height="28"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" height="28"/></a>
  <a href="https://github.com/features/actions"><img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" height="28"/></a>
  <a href="https://learn.microsoft.com/powershell/"><img src="https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white" alt="PowerShell" height="28"/></a>
  <a href="https://www.json.org/"><img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON" height="28"/></a>
  <a href="https://daringfireball.net/projects/markdown/"><img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown" height="28"/></a>
  <a href="https://github.com/renovatebot/renovate"><img src="https://img.shields.io/badge/Renovate-1A1F6C?style=for-the-badge&logo=renovatebot&logoColor=white" alt="Renovate" height="28"/></a>
</p>

---