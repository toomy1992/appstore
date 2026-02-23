# Planka

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/plankanban/planka) [<img src="https://img.shields.io/github/issues/plankanban/planka?color=7842f5">](https://github.com/plankanban/planka/issues)

Open-source kanban project management tool with real-time collaboration.

---

## 📖 SYNOPSIS

Planka is a self-hosted kanban board application that allows teams to manage projects and tasks with real-time updates, customizable boards, and user management.

---

## ✨ MAIN FEATURES

- Kanban boards with customizable columns and cards
- Real-time collaboration
- User management and permissions
- File attachments and comments
- Project templates
- API access
- OpenID Connect authentication support

---

## 📋 PREREQUISITES

- PostgreSQL database (included in setup)

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [plankanban/planka](https://github.com/plankanban/planka)**
- Uses GitHub Container Registry: ghcr.io/plankanban/planka

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `/data` | `/app/data` | Planka application data |
| `/data/db` | `/var/lib/postgresql/data` | PostgreSQL database data |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `PLANKADB_ADMIN_EMAIL` | Yes | Admin user email |
| `PLANKADB_ADMIN_PASSWORD` | Yes | Admin user password |
| `PLANKADB_DB_PASSWORD` | Yes | PostgreSQL database password |
| `PLANKADB_SECRET_KEY` | Yes | Application secret key |
| `PLANKADB_BASE_URL` | Yes | Full application URL |
| `PLANKADB_OIDC_ISSUER` | No | OpenID Connect issuer URL |
| `PLANKADB_OIDC_CLIENT_ID` | No | OpenID Connect client ID |
| `PLANKADB_OIDC_CLIENT_SECRET` | No | OpenID Connect client secret |

---

## ⚙️ CONFIGURATION

Configure the application through the web interface after initial setup. The admin user is created automatically with the provided credentials.

---

## 🎯 USAGE EXAMPLES

Access the application at the configured BASE_URL and log in with the admin credentials to start creating boards and managing projects.

---

## ⚠️ IMPORTANT

- The database service must be healthy before Planka starts
- Use strong passwords for admin and database
- Configure OIDC if using external authentication

---

## 💾 SOURCE

* [plankanban/planka](https://github.com/plankanban/planka)
* [Documentation](https://docs.planka.cloud)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.