# OpenBB

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/OpenBB-finance/OpenBB) [<img src="https://img.shields.io/github/issues/OpenBB-finance/OpenBB?color=7842f5">](https://github.com/OpenBB-finance/OpenBB/issues)

Open-source financial data platform for analysts, quants, and AI agents.

---

## 📖 SYNOPSIS
OpenBB provides a comprehensive platform for financial data analysis, integrating proprietary, licensed, and public data sources. It supports Python environments, OpenBB Workspace, and REST APIs for seamless data consumption.

---

## ✨ MAIN FEATURES
- Financial data integration
- AI agent support
- REST API for data access
- Python and Excel compatibility

---

## 📋 PREREQUISITES
- API Key from OpenBB

---

## 🐳 DOCKER IMAGE DETAILS
- **Based on [ghcr.io/openbb-finance/openbb-platform](https://github.com/OpenBB-finance/OpenBB)**
- Version: `1.5.6`

---

## 📁 VOLUMES
| Host folder          | Container folder | Comment          |
|----------------------|------------------|------------------|
| `${APP_DATA_DIR}/data` | `/app/data`      | Persistent data storage |

---

## 📝 ENVIRONMENT
| Variable         | Required | Description                     |
|------------------|----------|---------------------------------|
| `OPENBB_API_KEY` | Yes      | API key for authentication      |
| `TZ`             | No       | Timezone configuration          |
| `PUID`           | No       | User ID for permissions         |
| `PGID`           | No       | Group ID for permissions        |

---

## ⚙️ CONFIGURATION
1. Obtain an API key from OpenBB.
2. Configure the environment variables in the Tipi interface.

---

## 🎯 USAGE EXAMPLES
1. Start the OpenBB API server.
2. Access the API at `http://<your-domain>:6900`.

---

## 💾 SOURCE
* [GitHub Repository](https://github.com/OpenBB-finance/OpenBB)
* [Official Website](https://openbb.co/)

---

## ❤️ PROVIDED WITH LOVE
This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.