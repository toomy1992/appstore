# TradeNote

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/Eleven-Trading/TradeNote) [<img src="https://img.shields.io/github/issues/Eleven-Trading/TradeNote?color=7842f5">](https://github.com/Eleven-Trading/TradeNote/issues)

Open source trading journal that helps traders store, discover and recollect all their trades so they can become and remain consistent and profitable traders.

---

## 📖 SYNOPSIS

TradeNote is a privacy-focused, self-hosted trading journal. Import executions from your broker, visualize performance on dashboards and calendars, keep a daily diary, annotate chart screenshots, and tag setups or mistakes. It is built with Vue.js and uses Parse Server with MongoDB as the backend.

---

## ✨ MAIN FEATURES

- Import trades from supported broker platforms
- Visualize performance on dashboards, daily views, and calendars
- Filter results by date, position, patterns, mistakes, and more
- Keep a daily diary to work on trader psychology
- Mark trades and days as good or bad against your rules
- Add and annotate chart screenshots of entries and setups
- Visualize price charts with entry and exit points
- Add MFE prices automatically for efficiency analysis
- Tag trades and group tags to identify patterns
- Clean imports with one click
- Responsive layout for mobile devices
- Optional TradeNote API for automated trade imports

---

## 📋 PREREQUISITES

- MongoDB 4.4.18 is bundled with this installation (last official image that runs without CPU AVX)
- After install, register a user at `/register` before logging in

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [Eleven-Trading/TradeNote](https://github.com/Eleven-Trading/TradeNote)**
- Application image: `docker.io/eleventrading/tradenote:19.0.0_stable`
- Database image: `docker.io/library/mongo:4.4.18`
- Multi-architecture support: amd64, arm64
- License: GPL-3.0

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data` | `/data/db` | MongoDB data (trades, users, diaries, screenshots metadata) |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `TRADENOTE_APP_ID` | Yes | Random application ID used by the frontend to talk to Parse Server |
| `TRADENOTE_MASTER_KEY` | Yes | Secret master key for root Parse Server connections |
| `TRADENOTE_MONGO_USER` | Yes | MongoDB root username (default: `tradenote`) |
| `TRADENOTE_MONGO_PASSWORD` | Yes | MongoDB root password (auto-generated) |
| `TRADENOTE_DATABASE` | Yes | MongoDB database name (default: `tradenote`) |

The following values are set automatically by this app:

| Variable | Value | Description |
| --- | --- | --- |
| `TRADENOTE_PORT` | `8080` | Port the TradeNote web server listens on inside the container |
| `MONGO_URI` | constructed | MongoDB connection string pointing at the bundled `tradenote-db` service |
| `ANALYTICS_OFF` | `true` | Disables PostHog telemetry for self-hosted privacy |

---

## ⚙️ CONFIGURATION

1. Install TradeNote from Runtipi. Application ID, master key, and MongoDB password are generated automatically.
2. Open the app and go to `/register`.
3. Register with any email address and a password, then choose your broker and account timezone.
4. Import trades using a broker export. See the [broker instructions](https://tradenote.co/brokers.html).
5. Optional: add Polygon or Databento API keys in Settings for price charts and automatic MFE prices.
6. Optional: create a TradeNote API key in Settings to POST executions to `/api/trades`.

Do not change Application ID, Master Key, MongoDB username, MongoDB password, or database name after the first successful start. Changing them will break access to existing data.

---

## 🎯 USAGE EXAMPLES

**Register the first user**

Visit `http://<your-runtipi-host>:8080/register` (or the exposed HTTPS URL) and create an account.

**Import trades**

Export executions from your broker as CSV (or the format documented for that broker), then import them from the TradeNote UI.

Supported brokers include TradeZero, Interactive Brokers, TD Ameritrade thinkorswim, TradeStation, Tradovate, MetaTrader 5, HeldenTrader Pro, Rithmic, FundTraders, NinjaTrader, and TopstepX. Other brokers can be adapted with the [CSV template](https://github.com/Eleven-Trading/TradeNote/blob/main/brokers/Template.csv).

**Automated imports**

```bash
curl -X POST "http://<your-host>/api/trades" \
  -H "Content-Type: application/json" \
  -H "api-key: <your-tradenote-api-key>" \
  -d '{"data":[],"selectedBroker":"template","uploadMfePrices":false}'
```

---

## ⚠️ IMPORTANT

- Always create your first user at `/register`. There is no default admin account.
- This package uses MongoDB 4.4.18 so it starts on QEMU/VMs, NAS boxes, and other CPUs without AVX. MongoDB 5.0+ would crash with `Illegal instruction` on those hosts. See [TradeNote troubleshooting](https://tradenote.co/troubleshooting.html).
- The MongoDB port is not exposed. Do not publish `27017` to the host.
- Application ID and Master Key are secrets. Treat them like passwords.
- PostHog analytics are disabled in this Runtipi package (`ANALYTICS_OFF=true`).
- Market data (Polygon / Databento) is optional and configured in the TradeNote settings UI, not as install-time environment variables.

---

## 💾 SOURCE

* [Eleven-Trading/TradeNote](https://github.com/Eleven-Trading/TradeNote)
* [Documentation](https://tradenote.co/project-overview.html)
* [Broker import guides](https://tradenote.co/brokers.html)
* [Discord](https://discord.gg/ZbHekKYb85)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
