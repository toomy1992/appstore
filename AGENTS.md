# 🚀 Add a new application to tipi-store

Add the **{{APPLICATION_NAME}}** application (link to documentation/official site) based on complete analysis and verification.

## 🚀 Quick Start Commands and Workflows

### Most Common Tasks
- **Update app version** (60% of commits): Update Docker image version
- **Add new application** (20% of commits): Create complete app configuration
- **Fix configuration issues** (20% of commits): Resolve validation errors

### Workflow Commands (Fastest! ⚡)
- `/update-and-commit` ⚡ Update + validate + commit in one command (most common)
- `/add-app-complete` 🎯 Create + validate + commit workflow (new apps)

### Basic Commands (Step-by-step)
- `/update-version` - Update Docker image version only
- `/add-app` - Create new application only
- `/validate` - Comprehensive validation before committing
- `/fix-app` - Auto-fix common configuration issues
- `/commit-app` - Commit with proper messages

### Utility Commands
- `/check-updates` - Check for available app updates
- `/compare-apps` - Compare apps to learn patterns

### Documentation Hierarchy
**Level 1: Quick Commands** (Use These First!)
- Workflow commands for fastest results
- Basic commands for step-by-step control

**Level 2: Quick Reference**
- Core rules and validation checklist
- Common mistakes and troubleshooting

**Level 3: Detailed Guides** (When You Need Deep Dive)
- Complete app addition guide (new-app.prompt.md)
- Git workflow and commit standards (commit-app.prompt.md)

## �️ Tool Usage Guidelines

### Use Task Tool When:
- Exploring codebase structure (multiple files)
- Complex searches requiring context
- Multi-step research operations
- Searching for patterns across many files
- Need to understand how something works globally

**Example:** "How does authentication work in this repo?"

### Use Read Tool Directly When:
- Reading specific known file path
- Looking at example apps to learn patterns
- Checking existing configurations
- Viewing documentation files

**Example:** Reading `apps/beszel/config.json` for reference

### Use Grep Tool Directly When:
- Simple keyword search in known location
- Finding specific pattern
- Searching for variable usage

**Example:** Finding where `PAPERLESS_API_KEY` is used

### Use Bash Tool Directly When:
- Validating JSON: `cat apps/[app]/config.json | jq .`
- Verifying Docker tags: `docker manifest inspect [image:tag]`
- Git operations: `git status`, `git diff`
- Getting timestamps: `date +%s%3N`

**Example:** Verifying a Docker tag exists before using it

## �📋 Required specifications

### 🏗️ Mandatory structure
- `apps/[app-name]/config.json` - Tipi configuration with detailed form_fields
- `apps/[app-name]/docker-compose.json` - Optimized Docker configuration
- `apps/[app-name]/metadata/description.md` - Standardized documentation
- `apps/[app-name]/metadata/logo.jpg` - Official logo downloaded

### 🔧 Technical validations
- **Docker Image**: Verify official image, correct tags - **KEEP original prefixes if they exist** (e.g., use `v1.1.3` if that's the real tag, not `1.1.3`)
- **Image preference**: Prefer GitHub Container Registry (ghcr.io) over Docker Hub when available
- **Version consistency**: Ensure EXACT version match between config.json and docker-compose.json
- **Tag format**: Use clean version tags without build numbers (e.g., `31.0.6` not `31.0.6-ls382`)
- **Tag verification**: **ALWAYS verify tag exists on registry before using** with `docker manifest inspect`
- **Environment variables**: Check PUID/PGID support via official documentation AND docker-compose.yml
- **Variable syntax**: Use `"${VARIABLE}"` format in docker-compose.json (NOT `"{{VARIABLE}}"`)
- **Runtipi built-in vars**: Leverage `${TZ}`, `${APP_PROTOCOL}`, `${APP_DOMAIN}` for auto-detection
- **Service architecture**: Mark main service with `"isMain": true` and use `"internalPort"`
- **tipi_version**: Always 1 for a new application, increment by +1 before each commit to GitHub
- **Timestamps**: Use https://currentmillis.com for `created_at` and `updated_at` (current date)
- **uid/gid**: Add to config.json ONLY if PUID/PGID supported by image
- **Schema compliance**: Follow official Runtipi schemas (app-info.json, dynamic-compose.json)
- **Volume structure**: Use `${APP_DATA_DIR}/data` for single volume, `${APP_DATA_DIR}/data/<folder>` for multiple volumes
- **Documentation verification**: Always check wiki/documentation for missing features (webhooks, API keys, etc.)

### 📝 config.json configuration

**CRITICAL: Property order must follow schema v2 specification:**
```json
{
  "$schema": "https://schemas.runtipi.io/v2/app-info.json",
  "id": "app-name",
  "available": true,
  "port": 8080,
  "name": "AppName",
  "description": "Detailed description...",
  "version": "x.y.z",
  "tipi_version": 1,
  "short_desc": "Concise app description (max 4-5 words)",
  "author": "OriginalAuthor",
  "source": "https://github.com/...",
  "website": "https://...",
  "categories": ["category1", "category2"],
  "form_fields": [
    {
      "type": "text|password|email|number|boolean|fqdn|ip|url|random",
      "label": "Descriptive label",
      "hint": "Helpful explanation (ALWAYS add hints)",
      "required": true,
      "env_variable": "APPNAME_VARIABLE_NAME",
      "default": "value",
      "min": 1,
      "max": 100,
      "placeholder": "Example value for better UX",
      "options": [{"label": "Display", "value": "internal"}]
    }
  ],
  "exposable": true,
  "no_gui": false,
  "supported_architectures": ["amd64", "arm64"],
  "uid": 1000,
  "gid": 1000,
  "dynamic_config": true,
  "min_tipi_version": "4.6.5",
  "created_at": 1724160000000,
  "updated_at": 1724160000000
}
```

**Schema v2 property order (MANDATORY):**
1. `$schema`
2. `id`
3. `available`
4. `port`
5. `name`
6. `description`
7. `version`
8. `tipi_version`
9. `short_desc`
10. `author`
11. `source`
12. `website`
13. `categories`
14. `url_suffix` (optional)
15. `form_fields`
16. `exposable`
17. `no_gui` (optional)
18. `supported_architectures`
19. `uid` (optional, only if PUID/PGID supported)
20. `gid` (optional, only if PUID/PGID supported)
21. `dynamic_config`
22. `min_tipi_version`
23. `created_at`
24. `updated_at`
25. `deprecated` (optional)

**CRITICAL Form field requirements:**
- **Variable naming**: **ALWAYS prefix with APPNAME_** (e.g., DECYPHARR_API_USERNAME, not API_USERNAME)
- **Hints mandatory**: Every field MUST have a `"hint"` for user guidance
- **Random passwords**: Use `"type": "random"` with `"encoding": "hex"` for secure auto-generated passwords
- **Placeholder examples**: Add `"placeholder"` fields for better UX (e.g., `"admin"`, `"https://auth.yourdomain.com"`)
- **Website field**: Always add `"website"` field when available for better discoverability
- **Short descriptions**: Keep short_desc concise and impactful (STRICT 4-5 words maximum, focus on core function)
  - ✅ Perfect: "Self-hosted cloud platform", "AI document analyzer", "Media streaming server", "Personal finance tracker", "Debrid QBittorrent API"
  - ✅ Good: "Document management system", "Password manager app", "Network monitoring tool"
  - ❌ Too long: "Secure self-hosted file sync and collaboration platform" (11 words)
  - ❌ Too vague: "Great application for users" (generic, not descriptive)
  - ❌ Too technical: "RESTful API gateway with microservices orchestration" (complex jargon)
  - **Rule**: Core function + context (if space allows). Avoid marketing language.
- **Native data types**: Use `true`/`false` for booleans, `8` for numbers, not strings
- **Validation**: Include `min`/`max` validation for number fields
- **Group labeling**: Use consistent labeling (e.g., "DNS Settings >", "Security >")
- **uid/gid placement**: Add ONLY if PUID/PGID supported, place after form_fields

### 🐳 docker-compose.json configuration
- **Service structure**: Use array format with `"isMain": true` for primary service
- **Port configuration**: Use `"internalPort"` instead of `"addPorts"` for main service
- **Variable syntax**: Use `"${VARIABLE}"` format (NOT `"{{VARIABLE}}"`)
- **Auto-detection patterns**: Use `"${VAR:-${DEFAULT}}"` for fallback values
- **Built-in variables**: Leverage `${TZ}`, `${APP_PROTOCOL}`, `${APP_DOMAIN}`, `${APP_DATA_DIR}`
- Environment variables aligned with form_fields
- Appropriate volumes according to application
- Verified official image
- **Version consistency**: Use EXACT same version as config.json (e.g., `v1.1.3` matching config.json version `1.1.3`)
- **Clean tags**: Avoid build numbers, use clean version tags only
- Health checks when applicable
- **Multi-service apps**: Use `"dependsOn": ["service-name"]` for service dependencies
- **Read-only security**: Add `"readOnly": true` when supported by image
- Use native data types (boolean, number) not strings
- Follow volume pattern: single=`${APP_DATA_DIR}/data`, multiple=`${APP_DATA_DIR}/data/<folder>`
- **PUID/PGID values**: Use hardcoded `"1000"` strings, NOT variables if uid/gid are in config.json

#### 🔒 Advanced Docker Compose Properties (ServiceBuilder Support)
**Runtipi supports 40+ Docker Compose properties via ServiceBuilder. Use when needed:**

**Basic Properties:**
- `"restart": "unless-stopped"` - Restart policy
- `"dependsOn": ["service-name"]` - Service dependencies
- `"environment": {"VAR": "value"}` - Environment variables
- `"volumes": [{"hostPath": "/host", "containerPath": "/container"}]` - Volume mounts
- `"ports": [{"internal": 8080, "external": 8080}]` - Port mappings

**Security & Capabilities:**
- `"capAdd": ["SYS_ADMIN", "NET_ADMIN"]` - Linux capabilities to add
- `"capDrop": ["ALL"]` - Linux capabilities to drop for security
- `"securityOpt": ["apparmor:unconfined", "no-new-privileges:true"]` - Security options
- `"privileged": true` - Privileged mode (avoid when possible, use specific capabilities)
- `"devices": ["/dev/fuse:/dev/fuse"]` - Device mappings for hardware access
- `"readOnly": true` - Read-only filesystem

**Network & Communication:**
- `"networkMode": "host|bridge|none|service:name"` - Network mode override
- `"extraHosts": ["host.docker.internal:host-gateway"]` - Additional hosts mapping
- `"dns": ["1.1.1.1", "8.8.8.8"]` - Custom DNS servers
- `"hostname": "custom-hostname"` - Container hostname

**System Resources:**
- `"ulimits": {"nofile": {"soft": 1024, "hard": 2048}}` - Process limits
- `"sysctls": {"net.core.somaxconn": "1024"}` - Kernel parameters
- `"shmSize": "2gb"` - Shared memory size
- `"tmpfs": ["/tmp", "/var/tmp"]` - Temporary filesystems

**Process Control:**
- `"user": "1000:1000"` - User/group ID override
- `"workingDir": "/app"` - Working directory
- `"entrypoint": ["/custom-entrypoint.sh"]` - Custom entrypoint
- `"command": ["--config", "/etc/app.conf"]` - Command override
- `"pid": "host"` - PID namespace mode

**Container Behavior:**
- `"tty": true` - Allocate pseudo-TTY
- `"stdinOpen": true` - Keep STDIN open
- `"stopSignal": "SIGTERM"` - Stop signal override
- `"stopGracePeriod": "30s"` - Graceful stop timeout

**Monitoring & Logging:**
- `"logging": {"driver": "json-file", "options": {"max-size": "10m"}}` - Logging configuration
- `"labels": {"traefik.enable": "true"}` - Container labels
- `"healthCheck": {"test": "curl -f http://localhost:8080/health"}` - Health check configuration

**Docker-compose.json structure example:**
```json
{
  "services": [
    {
      "name": "app-name",
      "image": "vendor/image:version",
      "isMain": true,
      "internalPort": "8080",
      "readOnly": true,
      "environment": {
        "APP_URL": "${APPNAME_APP_URL:-${APP_PROTOCOL}://${APP_DOMAIN}}",
        "TZ": "${TZ}",
        "PUID": "1000",
        "PGID": "1000",
        "VARIABLE": "${APPNAME_VARIABLE}"
      },
      "volumes": [
        {
          "hostPath": "${APP_DATA_DIR}/data",
          "containerPath": "/app/data"
        }
      ],
      "healthCheck": {
        "test": "curl -f http://localhost:8080/health",
        "interval": "30s",
        "timeout": "10s",
        "retries": 3
      }
    }
  ]
}
```

**Example with advanced security (FUSE/filesystem apps):**
```json
{
  "services": [
    {
      "name": "secure-app",
      "image": "vendor/image:version",
      "isMain": true,
      "internalPort": "8080",
      "capAdd": ["SYS_ADMIN"],
      "securityOpt": ["apparmor:unconfined"],
      "devices": ["/dev/fuse:/dev/fuse"],
      "environment": {
        "APP_URL": "${APPNAME_APP_URL:-${APP_PROTOCOL}://${APP_DOMAIN}}",
        "TZ": "${TZ}"
      },
      "volumes": [
        {
          "hostPath": "${APP_DATA_DIR}/data",
          "containerPath": "/app/data"
        }
      ]
    }
  ]
}
```

**Example with network customization:**
```json
{
  "services": [
    {
      "name": "network-app",
      "image": "vendor/image:version",
      "isMain": true,
      "internalPort": "8080",
      "networkMode": "host",
      "extraHosts": ["host.docker.internal:host-gateway"],
      "dns": ["1.1.1.1", "8.8.8.8"],
      "ulimits": {
        "nofile": {
          "soft": 1024,
          "hard": 2048
        }
      },
      "environment": {
        "TZ": "${TZ}"
      }
    }
  ]
}
```
```

## 🔧 Multi-Service Apps Pattern

For applications requiring databases or additional services, use this pattern:

### Main Service Configuration
```json
{
  "name": "app-name",
  "image": "vendor/app:version",
  "isMain": true,
  "internalPort": 8080,
  "dependsOn": ["app-db"],
  "environment": [
    {"key": "DATABASE_HOST", "value": "app-db"},
    {"key": "DATABASE_PASSWORD", "value": "${APPNAME_DB_PASSWORD}"}
  ],
  "volumes": [
    {
      "hostPath": "${APP_DATA_DIR}/data",
      "containerPath": "/app/data"
    }
  ]
}
```

### Dependent Service Configuration
```json
{
  "name": "app-db",
  "image": "postgres:16",
  "environment": [
    {"key": "POSTGRES_PASSWORD", "value": "${APPNAME_DB_PASSWORD}"},
    {"key": "POSTGRES_DB", "value": "appdb"}
  ],
  "volumes": [
    {
      "hostPath": "${APP_DATA_DIR}/db",
      "containerPath": "/var/lib/postgresql/data"
    }
  ]
}
```

**Key Points:**
- Use `"dependsOn": ["service-name"]` for service dependencies
- Configure service communication via environment variables
- Use separate volume paths for each service (`/data`, `/db`, etc.)
- Add database password as random type in form_fields

### 📖 description.md documentation
Standardized format with mandatory sections:
```markdown
# APP_NAME

[<img src="https://img.shields.io/badge/github-source-blue?logo=github&color=040308">](GITHUB_URL) [<img src="https://img.shields.io/github/issues/OWNER/REPO?color=7842f5">](GITHUB_ISSUES_URL)

Short description.

---

## 📖 SYNOPSIS
Brief overview of what the application does and its main purpose.

---

## ⚠️ EXPERIMENTAL (if applicable)
Warning about experimental status if the app is still in development.

---

## ✨ MAIN FEATURES
- Feature 1
- Feature 2
- Feature 3

---

## 📋 PREREQUISITES (if applicable)
- Requirement 1
- Requirement 2

---

## 🐳 DOCKER IMAGE DETAILS
- **Based on [owner/repo](https://github.com/...)**
- Additional image details

---

## 📁 VOLUMES (if applicable)
| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `/path/on/host` | `/path/in/container` | Description |

---

## 📝 ENVIRONMENT
| Variable | Required | Description |
| --- | --- | --- |
| `VAR_NAME` | Yes/No | Description |

---

## ⚙️ CONFIGURATION (if applicable)
Configuration instructions and examples.

---

## 🎯 USAGE EXAMPLES (if applicable)
Usage examples and commands.

---

## ⚠️ IMPORTANT
Important notes, warnings, or tips.

---

## 💾 SOURCE
* [owner/repo](https://github.com/...)
* Related links

---

## ❤️ PROVIDED WITH LOVE
This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitHub repository.
```

### 🎨 Official logo
**Priority order for logo sources:**
1. **First**: Check if logo exists in runtipi-appstore: `https://github.com/runtipi/runtipi-appstore/tree/master/apps/[app-name]/metadata/logo.jpg`
2. **If found**: Download from runtipi-appstore: `curl -L "https://raw.githubusercontent.com/runtipi/runtipi-appstore/master/apps/[app-name]/metadata/logo.jpg" -o "apps/[app-name]/metadata/logo.jpg"`
3. **If not found**: Check if a related app exists in this store and copy its logo (e.g., `lubelog-mcp` can use `lubelogger`'s logo)
4. **If not found**: Download from official site/GitHub repository
- Named `logo.jpg` (or `logo.png` if JPG not available)
- Reasonable size (< 100KB recommended)
- **Always verify logo exists before using**: Test URL accessibility

### 🎨 Logo verification and download process

**Step 1: Check runtipi-appstore first**
```bash
# Check if logo exists in official runtipi-appstore
curl -I "https://raw.githubusercontent.com/runtipi/runtipi-appstore/master/apps/[app-name]/metadata/logo.jpg"

# If HTTP 200 (exists), download it:
curl -L "https://raw.githubusercontent.com/runtipi/runtipi-appstore/master/apps/[app-name]/metadata/logo.jpg" -o "apps/[app-name]/metadata/logo.jpg"
```

**Step 2: If not found, use official sources**
```bash
# Download from official website or GitHub
curl -L "[official-logo-url]" -o "apps/[app-name]/metadata/logo.jpg"

# Verify file size (should be < 100KB)
ls -la apps/[app-name]/metadata/logo.jpg
```

**Logo verification checklist:**
- [ ] Logo exists in runtipi-appstore (check first)
- [ ] If not found, obtained from official source
- [ ] File named exactly `logo.jpg`
- [ ] File size < 100KB (recommended)
- [ ] Image quality appropriate for UI display
- [ ] Downloads successfully with curl command

## 🔍 Comprehensive Validation Checklist (15 Points)

### 1. File Structure Validation
- [ ] `apps/[app-name]/` directory exists
- [ ] `config.json` file present and properly named
- [ ] `docker-compose.json` file present and properly named
- [ ] `metadata/` subdirectory exists
- [ ] `metadata/description.md` file present
- [ ] `metadata/logo.jpg` file present (< 100KB)

### 2. JSON Syntax Validation
- [ ] `config.json` is valid JSON (no syntax errors)
- [ ] `docker-compose.json` is valid JSON (no syntax errors)
- [ ] All strings properly quoted
- [ ] All arrays and objects properly closed

### 3. Schema Compliance
- [ ] `config.json` validates against `https://schemas.runtipi.io/app-info.json`
- [ ] `docker-compose.json` validates against `https://schemas.runtipi.io/dynamic-compose.json`
- [ ] No schema validation errors in VS Code
- [ ] Property order follows schema v2 specification

### 4. Docker Image Verification
- [ ] Image exists on registry (`docker manifest inspect [image:tag]`)
- [ ] Version consistency between `config.json` and `docker-compose.json`
- [ ] Tag format preserved (keep "v" prefix if present)
- [ ] Preferred ghcr.io over Docker Hub when available
- [ ] Clean version tags (no build numbers like -ls382)

### 5. Environment Variable Validation
- [ ] All variables prefixed with `APP_NAME_` (e.g., `PAPERLESS_AI_*`)
- [ ] Correct syntax `"${VARIABLE}"` in docker-compose.json
- [ ] Built-in variables used: `${TZ}`, `${APP_PROTOCOL}`, `${APP_DOMAIN}`
- [ ] Auto-detection patterns: `"${VAR:-${DEFAULT}}"`
- [ ] PUID/PGID support verified in original docker-compose.yml

### 6. Volume Structure Validation
- [ ] Single volume uses `${APP_DATA_DIR}/data`
- [ ] Multiple volumes use `${APP_DATA_DIR}/data/<folder>`
- [ ] Correct container paths specified
- [ ] Read-only flag (`"readOnly": true`) added when supported

### 7. Form Field Validation
- [ ] All important parameters configurable
- [ ] Every field has `"hint"` for user guidance
- [ ] Appropriate types: `text`, `password`, `boolean`, `number`, `random`
- [ ] Random passwords use `"encoding": "hex"`
- [ ] Placeholders provide good examples
- [ ] Native data types used (boolean/number, not strings)

### 8. Port Configuration Validation
- [ ] Main service uses `"internalPort"`, not `"addPorts"`
- [ ] Main service marked with `"isMain": true`
- [ ] Additional services use `"addPorts"` for external access
- [ ] Port numbers are valid and available

### 9. Health Check Validation
- [ ] Health checks added when applicable
- [ ] Correct test commands (e.g., `curl -f http://localhost:8080/health`)
- [ ] Appropriate intervals, timeouts, and retries configured

### 10. Security Configuration Validation
- [ ] Specific capabilities used instead of `"privileged": true`
- [ ] Security options applied for specialized apps
- [ ] Device mappings configured when needed
- [ ] User permissions set appropriately

### 11. Logo Validation
- [ ] Logo downloaded from official source or runtipi-appstore
- [ ] File named exactly `logo.jpg`
- [ ] File size < 100KB
- [ ] Image quality suitable for UI display

### 12. README Update Validation
- [ ] Main `/README.md` counter incremented
- [ ] App added to alphabetical table in main README
- [ ] App added to appropriate category in `/apps/README.md`
- [ ] Total applications counter updated in apps README

### 13. Commit Message Validation
- [ ] Follows gitmoji standards (🎉 for new features, ✨ for improvements, etc.)
- [ ] Atomic commits (one logical change per commit)
- [ ] Clear and descriptive messages
- [ ] References issue numbers when applicable

### 14. Branch Naming Validation
- [ ] Feature branch follows `feat/add-[app-name]` pattern
- [ ] Branch name is descriptive and follows conventions
- [ ] No direct commits to main branch

### 15. Final Integration Test
- [ ] App installs successfully in Runtipi
- [ ] Configuration options work as expected
- [ ] No runtime errors in logs
- [ ] Web interface accessible and functional

## Available Slash Commands Reference

### Primary Workflows
- `/add-app` - Add new application (complete guided process)
- `/update-version` - Update Docker image version (most common task)
- `/validate` - Comprehensive validation before committing
- `/fix-app` - Detect and auto-fix common issues
- `/commit-app` - Commit changes with proper messages

### Orchestrated Workflows (Fastest!)
- `/add-app-complete` - Complete workflow: create → validate → commit
- `/update-and-commit` - Update version → validate → auto-commit (fastest!)

### Utility Commands
- `/check-updates` - Check for available updates (all apps or specific)
- `/compare-apps` - Compare two apps to learn patterns

**When to Use Each:**
- New app? → `/add-app`
- Update version? → `/update-version`
- Not sure if ready? → `/validate`
- Have errors? → `/fix-app`
- Ready to commit? → `/commit-app`

## � Common Troubleshooting

### Schema Validation Errors
- **Issue**: "Property 'X' is not allowed" or "Missing required property"
- **Solution**: Check property order in config.json (follows schema v2 specification), ensure all required fields present, validate against official schemas

### Docker Tag Issues
- **Issue**: "manifest unknown" when running `docker manifest inspect`
- **Solution**: Verify exact tag format from registry, check for typos, ensure tag exists on the specified registry (ghcr.io vs docker.io)

### Environment Variable Problems
- **Issue**: Variables not resolving or incorrect syntax
- **Solution**: Use `"${VARIABLE}"` format (not `{{VARIABLE}}`), ensure all variables prefixed with `APP_NAME_`, check for typos in variable names

### Port Configuration Errors
- **Issue**: "Port already in use" or service not accessible
- **Solution**: Verify main service uses `"internalPort"`, additional services use `"addPorts"`, ensure port numbers are available

### Volume Mount Issues
- **Issue**: Permission denied or data not persisting
- **Solution**: Check volume paths follow `${APP_DATA_DIR}/data` pattern, ensure correct container paths, verify file permissions

### Health Check Failures
- **Issue**: Container restarts repeatedly due to failed health checks
- **Solution**: Adjust health check command, increase timeout/interval, verify service is actually healthy at the endpoint

### PUID/PGID Configuration
- **Issue**: File permission issues with user/group IDs
- **Solution**: Only add `uid`/`gid` in config.json if PUID/PGID supported by image, verify in original docker-compose.yml, use hardcoded `"1000"` in docker-compose.json

### JSON Syntax Errors
- **Issue**: "Invalid JSON" or parsing errors
- **Solution**: Validate JSON syntax, check for missing commas, proper quotes, balanced brackets/braces

### Logo Download Issues
- **Issue**: Logo not displaying or download fails
- **Solution**: Check runtipi-appstore first, verify URL accessibility, ensure file size < 100KB, name exactly `logo.jpg`

### Form Field Validation
- **Issue**: Configuration options not working or missing hints
- **Solution**: Ensure every field has `"hint"`, use native data types, add placeholders, verify variable names match between form_fields and docker-compose

### Multi-Service Dependencies
- **Issue**: Services fail to start or communicate
- **Solution**: Use `"dependsOn": ["service-name"]`, configure environment variables for service communication, use separate volume paths

## �🛠️ Schema validation setup

Configure VS Code for automatic validation by ensuring `.vscode/settings.json` contains:

```json
{
  "json.schemas": [
    {
      "fileMatch": [
        "**/apps/*/config.json"
      ],
      "url": "https://schemas.runtipi.io/app-info.json"
    },
    {
      "fileMatch": [
        "**/apps/*/docker-compose.json"
      ],
      "url": "https://schemas.runtipi.io/dynamic-compose.json"
    }
  ]
}
```

This provides real-time validation and IntelliSense for both config.json and docker-compose.json files.

## 📋 Creation process

1. **Preliminary research**
   - Analyze official documentation and GitHub repository
   - **Check for GitHub Container Registry packages (ghcr.io) first, then Docker Hub**
   - **Check wiki/documentation for ALL features (webhooks, integrations, API endpoints)**
   - Identify official Docker image and verify tags
   - **Examine original docker-compose.yml AND .env.example files**
   - List environment variables and their types
   - Check PUID/PGID support in documentation AND docker files
   - Review health check possibilities
   - **Check for existing similar apps in tipi-store for pattern consistency**
   - **Verify Docker tag exists using `docker manifest inspect`**
   - **Document all configurable options and their default values**

2. **Schema validation setup**
   - Ensure VS Code has schema validation configured
   - Reference official Runtipi schemas for validation
   - Prepare data type mappings (string → boolean/number)

3. **Structure creation**
   - Create `apps/[app-name]` and `metadata/` folders
   - **Generate config.json with ALL variables prefixed with APP_NAME**
   - Generate config.json with complete form_fields using native types
   - **Add uid/gid ONLY if PUID/PGID supported (verify in original docker-compose.yml)**
   - Create optimized docker-compose.json with health checks
   - Follow volume naming conventions

4. **Documentation and assets**
   - Write description.md following standard format
   - **Logo download priority**: 
     1. Check runtipi-appstore first: `https://github.com/runtipi/runtipi-appstore/tree/master/apps/[app-name]/metadata/`
     2. If exists, download: `curl -L "https://raw.githubusercontent.com/runtipi/runtipi-appstore/master/apps/[app-name]/metadata/logo.jpg" -o "apps/[app-name]/metadata/logo.jpg"`
     3. If not found, download from official source (< 100KB recommended)
   - Update volume paths in documentation

5. **Integration and testing**
   - **CRITICAL: Update README files (often forgotten!)**
     - Update main `/README.md`: Increment counter (e.g., 27 → 28) and add app to table
     - Update `/apps/README.md`: Add app to appropriate category section
   - Add to main README (table + counter)
   - Add to apps README (`apps/README.md`) in appropriate category
   - Test JSON syntax validation
   - Verify schema compliance

6. **Final validation**
   - Run schema validation tools
   - Test environment variables consistency
   - **Verify ALL environment variables are prefixed with APP_NAME**
   - **Verify EXACT version match between config.json and docker-compose.json**
   - **Check Docker tag exists and uses clean format (no build numbers)**
   - **Validate short_desc is 4-5 words maximum and follows guidelines**
   - **Check description.md is updated with correct variable names**
   - Validate complete structure
   - Verify all native data types are used correctly

7. **Pre-commit preparation**
   - **Increment tipi_version by +1 before committing to GitHub**
   - Update `updated_at` timestamp with current millis
   - Final schema validation check
   - **Create feature branch for new app: `feat/add-[app-name]`**
   - Follow commit standards (see commit-app.prompt.md)
   - Push to repository and create Pull Request

## Workflow Examples

### Adding New App (~20% of tasks)
1. Use `/add-app` slash command (recommended)
2. Follow guided process with validation
3. Commit with `/commit-app`

Alternative: Manually follow `.github/prompts/new-app.prompt.md`

### Updating App Version (~60% of tasks)
1. Use `/update-version` slash command (recommended)
2. Provide app name and new version
3. Claude verifies Docker tag, updates files, increments tipi_version
4. Auto-generates commit message: `chore(deps): update [image] to [version]`
5. Commit and push

Alternative: Manual update + `/commit-app`

### Fixing App Issues (~20% of tasks)
1. Use `/validate` to detect issues
2. Use `/fix-app` to auto-correct common problems
3. Review changes with `git diff`
4. Commit with `/commit-app`

Alternative: Manual fixes + validation

### General Modification Workflow
1. Make changes
2. CRITICAL: Increment `tipi_version` (+1)
3. Update `updated_at` timestamp
4. Run `/validate` to check for errors
5. Use `/commit-app` for proper commit messages

### Commit Message Patterns
• New app: `🎉 Added: [app-name] application to tipi-store`
• Version update: `chore(deps): update [image] docker tag to [version]`
• Fix: `🔧 Fixed: [description] for [app-name]`
• Change: `🔄 Changed: [description] for [app-name]`
• Docs: `📚 Docs: [description] for [app-name]`

Always increment tipi_version when:
• Docker image tag changes
• Environment variables modified
• Config schema updates
• Health checks adjusted
• Volume mounts changed
• Port modifications
• ANY docker-compose.json changes
• ANY config.json form field updates

## 🔄 Git workflow for new applications

```bash
# New application workflow:
1. Create feature branch: git checkout -b feat/add-[app-name]
2. Make all changes for the new app
3. Test functionality locally
4. Before committing:
   - Increment tipi_version to 1 in config.json
   - Update updated_at timestamp
   - Run final validations
5. Follow commit message standards from commit-app.prompt.md
6. Push branch and create Pull Request for review

# Example workflow:
git checkout -b feat/add-paperless-ai
# ... make all changes ...
git add apps/paperless-ai/
git commit -m "🎉 Added: paperless-ai application to tipi-store"
git commit -m "✨ Added: comprehensive configuration options for paperless-ai"
git commit -m "📚 Docs: add complete paperless-ai documentation"
git push origin feat/add-paperless-ai
# Create Pull Request
```

### 📝 Commit message standards

Follow gitmoji standards for consistent and informative commit messages:

**Common gitmojis for app additions:**
- 🎉 `:tada:` - New features (new app addition)
- ✨ `:sparkles:` - New features (configuration options, improvements)
- 📚 `:books:` - Documentation
- 🔧 `:wrench:` - Configuration files
- 🐳 `:whale:` - Docker-related changes
- 📝 `:memo:` - Documentation updates
- 🐛 `:bug:` - Bug fixes
- ♻️ `:recycle:` - Refactoring
- ✅ `:white_check_mark:` - Tests or validation

**Commit message format:**
```
🎉 Added: [app-name] application to tipi-store

- Brief description of what was added
- Key features or changes
```

**Atomic commits:**
- One logical change per commit
- Separate commits for app files, documentation, and README updates
- Clear and descriptive messages

**Branch naming:**
- Feature branches: `feat/add-[app-name]`
- Bug fixes: `fix/[app-name]-[issue]`
- Documentation: `docs/[app-name]`

**Pull Request workflow:**
- Create PR from feature branch to main
- Include description of changes
- Reference any related issues
- Wait for review and approval

## 🔍 App Comparison Guidance

When adding a new application, compare it with existing similar apps in the store to learn patterns and ensure consistency:

- **Check existing apps in the same category** for configuration patterns
- **Review form_fields structure** in similar apps for completeness
- **Examine docker-compose.json** for advanced properties usage
- **Verify volume naming conventions** match existing patterns
- **Compare description.md format** with similar applications
- **Check for missing features** that competitors have implemented
- **Ensure consistent variable naming** across similar apps

**Example:** When adding a new media server, compare with existing ones like Plex, Jellyfin, or Emby to identify common patterns and missing configuration options.

## 🔄 Automated Update Checking Process

For maintaining apps, implement regular update checks:

- **GitHub API scanning**: Use GitHub API to check for new releases/tags
- **Container registry checks**: Verify latest tags on Docker Hub/ghcr.io
- **Version comparison**: Compare current versions with latest available
- **Automated PR creation**: Generate pull requests for version updates
- **Dependency validation**: Ensure compatibility with Runtipi versions

**Modes:**
- Single app: Check specific app for updates
- All apps: Batch check all apps in store
- Specific apps: Check selected subset

**Version comparison methods:**
- Semantic versioning parsing
- Release age analysis
- Changelog extraction
- Breaking change detection

**Smart features:**
- Auto-update strategy (patch only, minor, major)
- Rate limiting for API calls
- Caching for performance
- Notification system for updates

**Output formats:**
- Terminal: Real-time progress
- Report: JSON/HTML summary
- GitHub: Automated PRs

**Error handling:**
- Network timeouts and retries
- API rate limit management
- Registry authentication issues
- Version parsing failures

**Manual update workflow:**
1. Check GitHub releases for new versions
2. Verify Docker tag availability with `docker manifest inspect`
3. Update version in config.json and docker-compose.json
4. Test configuration changes
5. Update timestamps and tipi_version
6. Create update PR with gitmoji commit messages

## 🎯 Objective

"Perfect" configuration allowing:
- One-click installation
- Complete configuration via interface
- Compliance with tipi-store standards
- Clear and professional documentation
- Perfect integration in the ecosystem

## ⚠️ Important constraints

- **Docker image preference**: Always prefer GitHub Container Registry (ghcr.io) over Docker Hub when available
- **Version consistency**: Ensure EXACT version match between config.json and docker-compose.json
- **Clean tag format**: Use clean version tags without build numbers (e.g., `31.0.6` not `31.0.6-ls382`)
- **Tag verification**: Always verify tag exists on registry before configuration
- **Short descriptions**: Keep short_desc concise and impactful (STRICT 4-5 words maximum)
  - Focus on core function, avoid marketing language
  - Examples: "Self-hosted cloud platform", "AI document analyzer", "Personal finance tracker"
  - Forbidden: Long descriptions, generic terms, complex jargon
- **Environment variable prefixing**: ALWAYS prefix ALL env_variables with APP_NAME (e.g., PAPERLESS_AI_*)
- **PUID/PGID verification**: Check original docker-compose.yml, add uid/gid ONLY if supported
- **Documentation completeness**: Always verify wiki/docs for missing features (API keys, webhooks, etc.)
- **Advanced Docker properties**: Leverage ServiceBuilder's 40+ properties when needed for specialized apps
- **Security best practices**: Use specific capabilities instead of privileged mode when possible
- **Never uid/gid** in config.json if PUID/PGID not supported
- **tipi_version always 1** for new apps, **increment by +1** before each commit to GitHub
- **Current timestamps** via currentmillis.com
- **Verified Docker image** and correct tags
- **Standardized documentation** according to established format
- **Exhaustive form fields** for optimal configuration
- **Native data types**: Use `true`/`false` for booleans, numbers for numeric values
- **Volume conventions**: Single volume = `${APP_DATA_DIR}/data`, Multiple = `${APP_DATA_DIR}/data/<folder>`
- **Schema compliance**: All files must validate against official Runtipi schemas
- **Health checks**: Add when applicable for better monitoring
- **Port management**: Use `addPorts` for external service ports (not web UI)
- **Final documentation check**: Ensure description.md reflects ALL configuration options

## Top 10 Critical Mistakes to Avoid

1. ❌ Forgetting to update README files
2. ❌ Not prefixing variables with `APPNAME_`
3. ❌ Forgetting to increment `tipi_version` on modifications
4. ❌ Version mismatch between config.json and docker-compose.json
5. ❌ Using `{{VARIABLE}}` instead of `${VARIABLE}`
6. ❌ Adding uid/gid without verifying PUID/PGID support
7. ❌ `short_desc` too long (> 5 words)
8. ❌ Missing `hint` in form_fields
9. ❌ Using strings for boolean/number types
10. ❌ Not verifying Docker tag exists

## 🔧 Specialized Application Patterns

### 🔒 Filesystem/FUSE Applications
For apps requiring filesystem access (e.g., file managers, mount tools):
```json
{
  "capAdd": ["SYS_ADMIN"],
  "securityOpt": ["apparmor:unconfined"],
  "devices": ["/dev/fuse:/dev/fuse"]
}
```

### 🌐 Network/VPN Applications  
For network tools requiring host network access:
```json
{
  "networkMode": "host",
  "capAdd": ["NET_ADMIN", "NET_RAW"],
  "extraHosts": ["host.docker.internal:host-gateway"]
}
```

### 🖥️ System Monitoring Tools
For applications needing system access:
```json
{
  "pid": "host",
  "capAdd": ["SYS_PTRACE"],
  "volumes": [
    {
      "hostPath": "/proc",
      "containerPath": "/host/proc",
      "options": "ro"
    }
  ]
}
```

### 📊 Resource-Intensive Applications
For applications with high resource requirements:
```json
{
  "shmSize": "2gb",
  "ulimits": {
    "nofile": {"soft": 65536, "hard": 65536},
    "memlock": {"soft": -1, "hard": -1}
  },
  "sysctls": {
    "net.core.somaxconn": "1024"
  }
}
```

### 🔐 Security-Hardened Applications
For applications requiring enhanced security:
```json
{
  "readOnly": true,
  "capDrop": ["ALL"],
  "securityOpt": ["no-new-privileges:true"],
  "user": "65534:65534",
  "tmpfs": ["/tmp", "/var/tmp"]
}
```

#### 🔒 Advanced Docker Compose Properties (ServiceBuilder Support)
**Runtipi supports 40+ Docker Compose properties via ServiceBuilder. Use when needed:**

**Basic Properties:**
- `"restart": "unless-stopped"` - Restart policy
- `"dependsOn": ["service-name"]` - Service dependencies
- `"environment": {"VAR": "value"}` - Environment variables
- `"volumes": [{"hostPath": "/host", "containerPath": "/container"}]` - Volume mounts
- `"ports": [{"internal": 8080, "external": 8080}]` - Port mappings

**Security & Capabilities:**
- `"capAdd": ["SYS_ADMIN", "NET_ADMIN"]` - Linux capabilities to add
- `"capDrop": ["ALL"]` - Linux capabilities to drop for security
- `"securityOpt": ["apparmor:unconfined", "no-new-privileges:true"]` - Security options
- `"privileged": true` - Privileged mode (avoid when possible, use specific capabilities)
- `"devices": ["/dev/fuse:/dev/fuse"]` - Device mappings for hardware access
- `"readOnly": true` - Read-only filesystem

**Network & Communication:**
- `"networkMode": "host|bridge|none|service:name"` - Network mode override
- `"extraHosts": ["host.docker.internal:host-gateway"]` - Additional hosts mapping
- `"dns": ["1.1.1.1", "8.8.8.8"]` - Custom DNS servers
- `"hostname": "custom-hostname"` - Container hostname

**System Resources:**
- `"ulimits": {"nofile": {"soft": 1024, "hard": 2048}}` - Process limits
- `"sysctls": {"net.core.somaxconn": "1024"}` - Kernel parameters
- `"shmSize": "2gb"` - Shared memory size
- `"tmpfs": ["/tmp", "/var/tmp"]` - Temporary filesystems

**Process Control:**
- `"user": "1000:1000"` - User/group ID override
- `"workingDir": "/app"` - Working directory
- `"entrypoint": ["/custom-entrypoint.sh"]` - Custom entrypoint
- `"command": ["--config", "/etc/app.conf"]` - Command override
- `"pid": "host"` - PID namespace mode

**Container Behavior:**
- `"tty": true` - Allocate pseudo-TTY
- `"stdinOpen": true` - Keep STDIN open
- `"stopSignal": "SIGTERM"` - Stop signal override
- `"stopGracePeriod": "30s"` - Graceful stop timeout

**Monitoring & Logging:**
- `"logging": {"driver": "json-file", "options": {"max-size": "10m"}}` - Logging configuration
- `"labels": {"traefik.enable": "true"}` - Container labels
- `"healthCheck": {"test": "curl -f http://localhost:8080/health"}` - Health check configuration

## 📚 Valid categories

When choosing categories for your application, use only these valid values:
- `network` - Network tools, DNS, VPN, proxies
- `media` - Media servers, streaming, entertainment
- `development` - Development tools, IDEs, version control
- `automation` - Home automation, IoT, smart home
- `social` - Communication, chat, social networks
- `utilities` - General purpose tools, system utilities
- `photography` - Photo management, editing, galleries
- `security` - Security tools, monitoring, firewalls
- `featured` - Featured/recommended applications
- `books` - E-books, reading, libraries
- `data` - Databases, data management, analytics
- `music` - Music servers, players, management
- `finance` - Financial tools, budgeting, accounting
- `gaming` - Gaming servers, game management
- `ai` - AI tools, machine learning, automation

**Example combinations:**
- Plex: `["media", "featured"]`
- Sonarr: `["media", "automation"]`

## 🎯 Common patterns and examples

### MANDATORY verification checklist (based on real implementations)
1. **Check for GitHub Container Registry (ghcr.io) packages first**
2. **Examine original docker-compose.yml for PUID/PGID support AND missing variables**
3. **Check original .env.example for complete variable list**
4. **Review wiki/documentation for advanced features**
5. **Prefix ALL variables with APP_NAME**
6. **Verify EXACT version consistency between config.json and docker-compose.json**
7. **Use clean version tags without build numbers**
8. **Test Docker tag availability on registry**
9. **Use correct Runtipi docker-compose format (services array, not object)**
10. **Leverage built-in variables for auto-detection**

### Docker-compose syntax comparison
```json
// ❌ WRONG - Old Docker Compose format
{
  "version": "3.8",
  "services": {
    "app": {
      "ports": ["{{RUNTIPI_APP_PORT}}:8080"],
      "environment": {
        "VAR": "{{VARIABLE}}"
      }
    }
  }
}

// ✅ CORRECT - Runtipi format with advanced properties
{
  "services": [
    {
      "name": "app",
      "isMain": true,
      "internalPort": 8080,
      "capAdd": ["SYS_ADMIN"],
      "securityOpt": ["apparmor:unconfined"],
      "devices": ["/dev/fuse:/dev/fuse"],
      "ulimits": {
        "nofile": {"soft": 1024, "hard": 2048}
      },
      "environment": {
        "VAR": "${VARIABLE}"
      }
    }
  ]
}
```

### Auto-detection patterns
```json
// URL auto-detection
"APP_URL": "${APP_NAME_APP_URL:-${APP_PROTOCOL}://${APP_DOMAIN}}"

// Timezone inheritance
"TZ": "${TZ}"

// Custom variable with fallback
"LOG_LEVEL": "${APP_NAME_LOG_LEVEL:-info}"
```

### Form field optimizations
```json
// Random password with encoding
{
  "type": "random",
  "label": "Database Password",
  "encoding": "hex",
  "env_variable": "APP_NAME_DB_PASSWORD"
}

// URL with placeholder
{
  "type": "url",
  "label": "Application URL",
  "placeholder": "https://app.yourdomain.com",
  "required": false,
  "env_variable": "APP_NAME_APP_URL"
}

// Boolean with good default
{
  "type": "boolean",
  "label": "Trust Proxy",
  "default": true,
  "env_variable": "APP_NAME_TRUST_PROXY"
}
```

## Examples to Study

Simple apps (good baseline):
- `apps/beszel/` - Minimal configuration
- `apps/homebox/` - Standard app

Complex apps (advanced reference):
- `apps/paperless-ai/` - Many form_fields
- `apps/paperless-ngx/` - Very comprehensive (400 lines)

##  ServiceBuilder Property Reference

**Runtipi ServiceBuilder supports 40+ Docker Compose properties. Complete list:**
- **Basic**: `setImage`, `setName`, `setRestartPolicy`, `setNetwork`
- **Ports**: `setPort`, `setPorts`, `setInternalPort`
- **Storage**: `setVolume`, `setVolumes`
- **Environment**: `setEnvironment`, `setCommand`, `setEntrypoint`
- **Health**: `setHealthCheck`
- **Metadata**: `setLabels`
- **Dependencies**: `setDependsOn`
- **Network**: `setNetworkMode`, `setExtraHosts`, `setDNS`
- **Resources**: `setUlimits`, `setShmSize`, `setSysctls`
- **Security**: `setCapAdd`, `setCapDrop`, `setPrivileged`, `setSecurityOpt`, `setDevices`
- **Process**: `setHostname`, `setPid`, `setTty`, `setUser`, `setWorkingDir`
- **Container**: `setReadOnly`, `setStopSignal`, `setStopGracePeriod`, `setStdinOpen`
- **Logging**: `setLogging`
- **Deployment**: `setDeploy`

**Use these properties when your application requires specialized Docker configuration beyond basic web services.**

**🎯 Key Takeaway**: Runtipi's dynamic compose system supports the full Docker Compose specification through ServiceBuilder. Don't hesitate to use advanced properties when they improve security, performance, or functionality for specialized applications.