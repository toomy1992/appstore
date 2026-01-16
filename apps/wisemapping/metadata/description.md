# WiseMapping

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/wisemapping/wisemapping-open-source) [<img src="https://img.shields.io/github/issues/wisemapping/wisemapping-open-source?color=7842f5">](https://github.com/wisemapping/wisemapping-open-source/issues)

WiseMapping is a free, open-source, web-based mind mapping tool designed for individuals, teams, and educational institutions.

---

## 📖 SYNOPSIS

WiseMapping is a versatile mind mapping platform that enables users to create, share, and collaborate on mind maps in real-time. Built with modern open standards (SVG and React), it facilitates brainstorming sessions, project planning, and knowledge management with complete control over your data through self-hosted deployment.

---

## ✨ MAIN FEATURES

- 🎨 **Visual Mapping**: Create rich mind maps with icons, colors, fonts, and custom styling
- 👥 **Collaboration**: Share mind maps with team members and collaborate in real-time
- 📱 **Multi-platform**: Access your maps from any device with a modern web browser
- 📊 **Export & Import**: Import from Freeplane, XMind, and Mind Manager; export to PDF, SVG, and more
- 🔗 **Document Linking**: Integrate external documents and resources into your mind maps
- 📤 **Embed & Share**: Easily embed mind maps into web pages, blogs, and documentation
- 🔍 **Search & Navigation**: Quickly find content across all your mind maps
- 📝 **Rich Content**: Add detailed notes, links, and formatted text to nodes
- 🔒 **Self-hosted**: Complete control over your data with on-premise deployment
- 🌐 **Multi-language**: Available in English, Spanish, French, German, Italian, Russian, Chinese, and more
- 🔌 **REST API**: Full REST API for integration and automation
- 📈 **User Management**: Database authentication with support for Google OAuth, Facebook OAuth, and LDAP
- 💾 **Multiple Databases**: PostgreSQL (recommended), MySQL, or HSQLDB (testing only)

---

## 📋 PREREQUISITES

- Self-hosted Docker deployment recommended
- For production: PostgreSQL 15+ or MySQL 8+ database
- For testing: Built-in HSQLDB support

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [wisemapping/wisemapping](https://hub.docker.com/r/wisemapping/wisemapping)**
- Official Docker Hub image maintained by WiseMapping
- Runs as user `wisemapping` (UID 1001)
- Health check endpoint: `/health`

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data` | `/var/lib/wisemapping` | Database and application data storage |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `TZ` | No | Timezone (inherited from system) |
| `JAVA_OPTS` | No | JVM memory options (default: `-Xmx1024m -Xms512m`) |
| `WISEMAPPING_ADMIN_EMAIL` | Yes | Email for admin user account |
| `WISEMAPPING_ADMIN_PASSWORD` | Yes | Password for admin user account |
| `WISEMAPPING_DB_TYPE` | No | Database type: `hsqldb`, `postgresql`, or `mysql` (default: `hsqldb`) |
| `WISEMAPPING_DB_HOST` | No | Database hostname (for PostgreSQL/MySQL) |
| `WISEMAPPING_DB_PORT` | No | Database port (5432 for PostgreSQL, 3306 for MySQL) |
| `WISEMAPPING_DB_NAME` | No | Database name (default: `wisemapping`) |
| `WISEMAPPING_DB_USER` | No | Database username |
| `WISEMAPPING_DB_PASSWORD` | No | Database password |
| `WISEMAPPING_JAVA_OPTS` | No | Custom Java memory options |
| `WISEMAPPING_APP_URL` | No | Application base URL for redirects and embeds |
| `WISEMAPPING_ALLOW_REGISTRATION` | No | Enable user registration (default: `true`) |

---

## ⚙️ CONFIGURATION

### Default Access

After starting the application, you can access it at the configured URL:

- **Default Port**: Port 80 (HTTP)
- **Admin URL**: `http://your-host/c/login`
- **API Documentation**: `http://your-host/api`

### Default Test Credentials

- **Test User**: `test@wisemapping.org` / `password`
- **Admin User**: `admin@wisemapping.org` / `testAdmin123`

### Database Configuration

**HSQLDB (Default - Testing/Development Only):**
- Built-in, no external database required
- Data stored in `/var/lib/wisemapping/db/`
- Not recommended for production

**PostgreSQL (Recommended for Production):**
- Set `WISEMAPPING_DB_TYPE=postgresql`
- Requires external PostgreSQL 15+ instance
- Set connection parameters via environment variables

**MySQL (Production Supported):**
- Set `WISEMAPPING_DB_TYPE=mysql`
- Requires external MySQL 8+ instance
- Set connection parameters via environment variables

### Custom Configuration

Mount a custom `application.yml` file for advanced configuration:
- OAuth2 providers (Google, Facebook)
- LDAP authentication
- Mail settings
- Security options

---

## 🎯 USAGE EXAMPLES

### Basic Startup

Access the application via the configured domain and log in with admin credentials.

### Creating a Mind Map

1. Log in to the application
2. Click "New Map" or "Create New"
3. Add topics using the interface
4. Add colors, icons, and formatting
5. Save and share with team members

### Collaboration

1. Open a mind map
2. Click "Share" or "Collaboration"
3. Invite team members by email
4. Set permissions (view, edit, etc.)
5. Real-time updates appear for all collaborators

### Export

- Export to PDF for presentations
- Export to SVG for embedding
- Export to Freeplane for compatibility

---

## ⚠️ IMPORTANT

- **Production Deployments**: Use PostgreSQL or MySQL, NOT HSQLDB
- **Data Persistence**: Always mount the `/var/lib/wisemapping` volume to persist data
- **Memory Configuration**: Adjust `JAVA_OPTS` based on your deployment size and available resources
- **Default Credentials**: Change default admin password immediately after first login
- **HTTPS**: Use a reverse proxy (Traefik, Nginx) for SSL/HTTPS termination
- **Backups**: Regular backups of the database are recommended for production
- **Multi-language**: Set language preferences per user or globally via configuration

---

## 💾 SOURCE

* [wisemapping/wisemapping-open-source](https://github.com/wisemapping/wisemapping-open-source)
* [WiseMapping Official Website](https://www.wisemapping.com)
* [API Documentation](https://github.com/wisemapping/wisemapping-open-source/blob/develop/doc/api-documentation/README.md)
* [Docker Hub](https://hub.docker.com/r/wisemapping/wisemapping)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the [official GitHub repository](https://github.com/wisemapping/wisemapping-open-source).
