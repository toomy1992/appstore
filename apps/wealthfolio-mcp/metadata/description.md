# Wealthfolio MCP

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/toomy1992/wealthfolio-mcp) [<img src="https://img.shields.io/github/issues/toomy1992/wealthfolio-mcp?color=7842f5">](https://github.com/toomy1992/wealthfolio-mcp/issues)

A Model Context Protocol (MCP) server that integrates with Wealthfolio to provide portfolio data, valuations, and analytics to OpenWebUI and other MCP-compatible applications.

---

## 📖 SYNOPSIS

Wealthfolio MCP is a FastAPI-based server that exposes your Wealthfolio portfolio data through OpenAPI/REST endpoints. It enables seamless integration with AI applications like OpenWebUI, n8n automation workflows, and other tools supporting the Model Context Protocol.

---

## ✨ MAIN FEATURES

- **Real-time Portfolio Data**: Fetch current portfolio valuations, holdings, and performance metrics
- **Account Management**: Access all your Wealthfolio accounts and their details
- **Asset Information**: Get comprehensive asset profiles and market data
- **Historical Valuations**: Retrieve portfolio performance history over time
- **OpenWebUI Integration**: Seamlessly integrate with OpenWebUI for enhanced AI interactions
- **n8n Workflow Support**: Ready for automation workflows with n8n
- **Interactive Documentation**: Built-in Swagger UI at `/docs` for API exploration

---

## 📋 PREREQUISITES

- Wealthfolio instance with API access
- Valid Wealthfolio API key
- Optional: OpenWebUI for AI integration
- Optional: n8n for workflow automation

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [Python 3.11-slim](https://github.com/toomy1992/wealthfolio-mcp)**
- **Image**: `ghcr.io/toomy1992/wealthfolio-mcp:latest`
- FastAPI-based MCP server with comprehensive REST API
- Built-in health checks for monitoring

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `WEALTHFOLIO_MCP_API_KEY` | Yes | Your Wealthfolio API key for authentication |
| `WEALTHFOLIO_MCP_API_BASE_URL` | No | Base URL for Wealthfolio API (default: `https://wealthfolio.labruntipi.io/api/v1`) |
| `WEALTHFOLIO_MCP_ASSET_FILTERS` | No | Comma-separated list of asset types to filter (default: `stocks,crypto`) |
| `TZ` | No | Timezone setting (inherited from Runtipi) |

---

## 🎯 API ENDPOINTS

### Portfolio Data Endpoints

- **`GET /portfolio`** - Get comprehensive portfolio data including accounts, valuations, assets, and historical performance
- **`GET /accounts`** - Get all accounts
- **`GET /valuations/latest`** - Get latest valuations for specified accounts
- **`GET /assets`** - Get all available assets
- **`GET /valuations/history`** - Get historical valuations for a specified account and time period
- **`GET /holdings/item`** - Get a specific holding item for an account and asset

### System Endpoints

- **`POST /sync`** - Trigger portfolio synchronization
- **`GET /docs`** - Interactive Swagger/OpenAPI documentation
- **`GET /openapi.json`** - OpenAPI schema in JSON format

---

## 🔌 INTEGRATION EXAMPLES

### OpenWebUI Integration

1. Install the MCP plugin in OpenWebUI
2. Configure the MCP server URL: `http://wealthfolio-mcp:8000`
3. Use queries like:
   - "What's my current portfolio value?"
   - "Show me my account performance over the last month"
   - "Which assets have the highest gains?"

### n8n Workflow

Create automated workflows:
1. HTTP Request Node → Connect to `http://wealthfolio-mcp:8000/portfolio`
2. Schedule Trigger → Set up daily/weekly portfolio reports
3. Data Transform → Process portfolio data
4. Email/Discord Integration → Send automated updates

---

## ⚙️ CONFIGURATION

### Getting Your API Key

1. Access your Wealthfolio instance
2. Navigate to Settings → API
3. Generate or copy your API key
4. Paste it in the `WEALTHFOLIO_MCP_API_KEY` field during setup

### Custom API Base URL

If your Wealthfolio instance is at a custom location, update the `WEALTHFOLIO_MCP_API_BASE_URL` environment variable to point to your instance's API endpoint.

---

## 📊 TESTING THE API

Visit the interactive documentation at `http://[your-domain]:8000/docs` to explore all available endpoints and test them directly.

Or test with curl:
```bash
# Get portfolio summary
curl -X GET "http://127.0.0.1:8000/portfolio" -H "accept: application/json"

# Get all accounts
curl -X GET "http://127.0.0.1:8000/accounts" -H "accept: application/json"

# Get assets
curl -X GET "http://127.0.0.1:8000/assets" -H "accept: application/json"

# Get valuation history (last 30 days)
curl -X GET "http://127.0.0.1:8000/valuations/history?account_id=TOTAL&days=30" -H "accept: application/json"
```

---

## ⚠️ IMPORTANT

- Your API key is sensitive - ensure it's kept secure
- The MCP server requires network access to your Wealthfolio instance
- For OpenWebUI integration, ensure the server is accessible from OpenWebUI container
- Health checks are enabled to monitor server availability

---

## 💾 SOURCE

* [toomy1992/wealthfolio-mcp](https://github.com/toomy1992/wealthfolio-mcp)
* [Wealthfolio](https://wealthfolio.app/)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the [GitHub repository](https://github.com/toomy1992/wealthfolio-mcp/issues).
