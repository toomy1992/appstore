# Keycloak

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](https://github.com/keycloak/keycloak) [<img src="https://img.shields.io/github/issues/keycloak/keycloak?color=7842f5">](https://github.com/keycloak/keycloak/issues)

Open source Identity and Access Management solution for modern applications and services.

---

## 📖 SYNOPSIS

Keycloak is an open-source authentication server that provides user federation, strong authentication, user management, fine-grained authorization, and more. It allows you to add authentication and authorization to applications and secure services with minimum effort. No need to deal with storing users or authenticating users.

---

## ✨ MAIN FEATURES

- User Federation - Sync users from LDAP and Active Directory servers
- Strong Authentication - Supports two-factor authentication and passwordless authentication
- User Management - Create and manage users, roles, and permissions
- Fine-grained Authorization - Control access at a granular level
- Social Login - Integrate with social networks (Google, Facebook, GitHub, etc.)
- OpenID Connect and SAML Support - Standard protocols for authentication
- Custom Themes and Extensions - Customize the look and feel
- High Availability - Built-in support for clustering and high availability

---

## 📋 PREREQUISITES

- PostgreSQL database for production use (embedded H2 database is used by default in development mode)
- Minimum 1GB RAM for development, 2GB+ for production
- Java 17 or later (included in container image)

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [keycloak/keycloak](https://github.com/keycloak/keycloak)**
- Container image: `quay.io/keycloak/keycloak:26.5.1`
- Includes Java runtime and Keycloak server
- Supports PostgreSQL, MySQL, MariaDB, and Oracle databases
- Multi-architecture support: amd64, arm64

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data` | `/opt/keycloak/data` | Keycloak data and themes |
| `${APP_DATA_DIR}/data/postgres` | `/var/lib/postgresql/data` | PostgreSQL database storage |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `KEYCLOAK_ADMIN_USERNAME` | Yes | Initial admin username for management console |
| `KEYCLOAK_ADMIN_PASSWORD` | Yes | Initial admin password (change after first login) |
| `KEYCLOAK_DB_HOST` | Yes | PostgreSQL database hostname |
| `KEYCLOAK_DB_PORT` | Yes | PostgreSQL database port (default: 5432) |
| `KEYCLOAK_DB_NAME` | Yes | PostgreSQL database name |
| `KEYCLOAK_DB_USERNAME` | Yes | PostgreSQL database user |
| `KEYCLOAK_DB_PASSWORD` | Yes | PostgreSQL database password |
| `KEYCLOAK_HOSTNAME` | Yes | Full URL for Keycloak (e.g., https://keycloak.yourdomain.com) - required for production |
| `KEYCLOAK_HTTP_ENABLED` | Yes | Enable HTTP (default: true). Required when using edge TLS termination at reverse proxy |
| `KEYCLOAK_PROXY_HEADERS` | Yes | Proxy header parsing mode: 'forwarded' (RFC 7239) or 'xforwarded' (X-Forwarded-*) - default: xforwarded |
| `TZ` | No | Container timezone (default: UTC) |

---

## ⚙️ CONFIGURATION

### Initial Setup

1. After installation, access the Keycloak Admin Console at `http://your-domain:8080/admin`
2. Log in with the credentials you configured during setup
3. Create a new realm for your applications
4. Register your applications as clients in Keycloak
5. Create users and assign roles as needed

### Database Configuration

This installation uses PostgreSQL as the database backend. The database is automatically initialized on first start.

### Reverse Proxy and HTTPS Configuration

Keycloak is configured to work behind a reverse proxy with edge TLS termination (proxy handles HTTPS):

**Default Configuration:**
- `KC_HTTP_ENABLED=true` - Keycloak listens on HTTP (port 8080)
- `KC_PROXY_HEADERS=xforwarded` - Parses X-Forwarded-* headers from reverse proxy
- Reverse proxy should set these headers:
  - `X-Forwarded-Proto: https` - Indicates HTTPS at proxy
  - `X-Forwarded-Host: keycloak.yourdomain.com` - Frontend hostname
  - `X-Forwarded-Port: 443` - Frontend port

**Important:** Always use a reverse proxy (nginx, Traefik, HAProxy) in front of Keycloak for production!

### Custom Hostname Configuration

To override the frontend URL, set `KEYCLOAK_HOSTNAME` with full URL:
```
KEYCLOAK_HOSTNAME=https://keycloak.yourdomain.com
```

For different proxy header modes:
- `KEYCLOAK_PROXY_HEADERS=forwarded` - Use RFC 7239 Forwarded header
- `KEYCLOAK_PROXY_HEADERS=xforwarded` - Use non-standard X-Forwarded-* headers (default)

### Production Considerations

- Change the admin password immediately after first login
- Configure SSL/TLS certificates at reverse proxy level (not in Keycloak container)
- Use strong, unique database password
- Set up regular database backups
- Consider enabling two-factor authentication for admin accounts
- Configure appropriate SMTP settings for email notifications
- Use a dedicated reverse proxy/gateway for HTTPS termination

---

## 🎯 USAGE EXAMPLES

### Accessing the Admin Console

```
http://your-domain:8080/admin
```

### Accessing the Account Console

```
http://your-domain:8080/realms/master/account
```

### NGINX Reverse Proxy Configuration Example

```nginx
server {
    listen 443 ssl http2;
    server_name keycloak.yourdomain.com;

    # SSL configuration
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://keycloak:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port 443;
    }
}
```

### Creating a Realm

1. Open Admin Console
2. Click "Create Realm" in the top left
3. Enter realm name and click Create

### Registering an Application Client

1. Select your realm
2. Go to Clients section
3. Click "Create client"
4. Choose OpenID Connect or SAML 2.0
5. Configure redirect URIs and web origins
6. Save the client

---

## ⚠️ IMPORTANT

- **Security Warning**: The default admin password should be changed immediately in production
- **Database**: Ensure PostgreSQL is running and accessible before starting Keycloak
- **Memory**: Keycloak requires sufficient memory. Increase JVM heap if experiencing out-of-memory errors
- **Timezone**: Ensure the container timezone matches your requirements for audit logs
- **Reverse Proxy Required**: Always run Keycloak behind a reverse proxy for production use
- **Hostname Configuration**: Set the `KEYCLOAK_HOSTNAME` variable with full HTTPS URL for proper token issuance
- **HTTPS at Proxy**: TLS/SSL termination MUST be at reverse proxy level, not in Keycloak container
- **Proxy Headers**: Ensure reverse proxy correctly sets X-Forwarded-* headers (or Forwarded header if using RFC 7239)
- **DO NOT disable proxy mode**: `KC_PROXY=edge` is required for proper hostname and origin handling

---

## 💾 SOURCE

* [keycloak/keycloak](https://github.com/keycloak/keycloak)
* [Keycloak Documentation](https://www.keycloak.org/documentation.html)
* [Keycloak Getting Started Guide](https://www.keycloak.org/getting-started/getting-started-docker)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
