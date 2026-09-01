# openGym

[<img src="https://img.shields.io/badge/gitlab-source-blue?logo=gitlab&color=040308">](https://gitlab.com/DuarteSantos8/opengym) [<img src="https://img.shields.io/badge/license-AGPL--3.0-a3e635">](https://gitlab.com/DuarteSantos8/opengym/-/blob/main/LICENSE)

Self-hosted gym and body-weight tracker. Plan routines, log workouts, track progress, and sign in with passkeys. Your data stays on your server.

---

## 📖 SYNOPSIS

openGym is a privacy-first home-gym workout tracker. It runs as two containers (nginx frontend + Node API) with JSON files on disk — no Postgres. First start downloads ~140 MB of exercise images and GIFs once. Login is WebAuthn passkeys, so phones need HTTPS and a matching hostname.

---

## ✨ MAIN FEATURES

- Weekly plans over a library of 1,324 exercises with animated demos
- Guided workouts, supersets, cardio, timed holds, warm-up sets, and plate math
- Body-weight tracking, estimated 1RM, and progression rules (linear, Greyskull LP, double progression)
- Equipment filters and custom exercises
- Passkey login (no passwords), optional guest mode, optional invite-only signup
- Import from FitNotes, Strong, Hevy, and Apple Health body weight
- PWA / home-screen install

---

## 📋 PREREQUISITES

- Passkeys on a phone require exposing this app with a domain and HTTPS
- First start needs outbound GitHub access to clone the exercise media dataset (~140 MB)
- Back up `${APP_DATA_DIR}/data` — that folder is the entire user database

---

## 🐳 DOCKER IMAGE DETAILS

- **Based on [DuarteSantos8/opengym](https://gitlab.com/DuarteSantos8/opengym)**
- **Web**: `registry.gitlab.com/duartesantos8/opengym/web:1.2.14` (nginx + frontend, port 80)
- **API**: `registry.gitlab.com/duartesantos8/opengym/api:1.2.14` (Node, port 3000)
- **Media init**: `alpine/git` one-shot clone of [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)
- **Architectures**: amd64, arm64
- **License**: AGPL-3.0 (app code). Exercise images/GIFs are third-party content and are fetched at first run, not redistributed by this store.

---

## 📁 VOLUMES

| Host folder | Container folder | Comment |
| ----------- | ---------------- | ------- |
| `${APP_DATA_DIR}/data` | `/data` (api) | Profiles, passkeys, workouts, session secret — **must backup** |
| `${APP_DATA_DIR}/media/img` | `/usr/share/nginx/html/img` (web, read-only) | Exercise stills |
| `${APP_DATA_DIR}/media/gif` | `/usr/share/nginx/html/gif` (web, read-only) | Exercise animations |

---

## 📝 ENVIRONMENT

| Variable | Required | Description |
| --- | --- | --- |
| `OPENGYM_RP_ID` | Yes | Passkey hostname only (no scheme, no port). Default `localhost` |
| `OPENGYM_ORIGIN` | Yes | Full origin, no trailing slash. Default `http://localhost:8088` |
| `OPENGYM_RP_NAME` | No | Name shown in the passkey prompt. Default `openGym` |
| `OPENGYM_SESSION_DAYS` | No | Sign-in lifetime in days. Default `90` |
| `OPENGYM_ALLOW_GUEST` | No | Offer guest mode. Default `true` |
| `OPENGYM_INVITE_ONLY` | No | Require invite codes for new profiles. Default `false` |
| `OPENGYM_ADMIN_UIDS` | No | Comma-separated user ids for the admin dashboard |

These map into the API as `RP_ID`, `ORIGIN`, `RP_NAME`, `SESSION_DAYS`, `ALLOW_GUEST`, `INVITE_ONLY`, and `ADMIN_UIDS`. The web container always proxies `/api` to host `api` port 3000.

---

## ⚙️ CONFIGURATION

### Local test (Runtipi host browser only)

- RP ID: `localhost`
- Origin: `http://localhost:8088`
- Open the app from a browser **on the Runtipi host**

A phone on `http://LAN-IP:8088` **cannot** register passkeys. Guest mode still works.

### Home use from a phone (required for passkeys)

1. Enable **Expose app** in Runtipi and give it a hostname, e.g. `opengym.labruntipi.io`
2. Turn on HTTPS
3. Set **RP ID** to that hostname only: `opengym.labruntipi.io`
4. Set **Origin** to the exact origin: `https://opengym.labruntipi.io`
5. Recreate/start the app (restart does not re-read env)

Do **not** point RP ID at an IP address. Passkeys bind forever to RP ID.

### Admin dashboard

Create a profile first, then read `users[].id` from `${APP_DATA_DIR}/data/db.json` and put it in **Admin user IDs**.

---

## 🎯 USAGE EXAMPLES

Health check (through the web container, same origin as the UI):

```bash
curl http://localhost:8088/api/health
# {"ok":true,"users":0}
```

If the first-run media job did not run, check its logs in Runtipi or re-run the app so the `media` service can clone the dataset when `media/img` is empty.

---

## ⚠️ IMPORTANT

- Browsers allow passkeys on `http://localhost` only, or on **HTTPS** with a matching hostname
- After changing RP ID or Origin, **recreate** the containers
- Changing RP ID later invalidates existing passkeys
- Exercise images/GIFs are © Gym visual / disputed ownership — this app downloads them from upstream at first run. See upstream [NOTICE.md](https://gitlab.com/DuarteSantos8/opengym/-/blob/main/NOTICE.md)
- This is **not** the commercial product opengym.io

---

## 💾 SOURCE

* [DuarteSantos8/opengym](https://gitlab.com/DuarteSantos8/opengym)
* [Demo](https://opengym.duarte-santos.ch)
* [Self-hosting docs](https://gitlab.com/DuarteSantos8/opengym/-/blob/main/docs/SELF_HOSTING.md)

---

## ❤️ PROVIDED WITH LOVE

This app is provided with love by [toomy1992](https://github.com/toomy1992).

---

For any questions or issues, open an issue on the official GitLab repository.
