# Repo Template

This directory represents the application side of the system: a deployable app repo that opts into the VPS deployment flow and blue/green rollout model.

## Included Files

- `deploy-config.json`: app metadata such as `appName`, default port, and target VPS names
- `.github/workflows/ci-cd.yml`: example pipeline that registers the app, deploys the next release with a chosen instance count, and then shifts traffic
- `server.js`, `public/`, and `package.json`: a minimal deployable Node starter app

## Expected Usage

Use this template as the starting point for a real application repository. Replace placeholders before use:

- Docker image name and registry path
- GitHub repository URL
- VPS IP or hostname
- App-specific deployment values such as `appName`
- The internal app `containerPort` that Docker should publish behind NGINX
- Runtime values in `.env` and `.env.example`

The workflow assumes the target app already has a valid `Dockerfile` at its repository root. A typical release flow is:

1. Deploy the next release image with `instances` set explicitly or omitted to reuse the previous count.
2. Verify the green containers externally.
3. Increase `greenPercentage` through the worker or manager rollout endpoint.
