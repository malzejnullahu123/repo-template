# Repo Template

This directory represents the application side of the system: a deployable app repo that opts into the VPS deployment flow and blue/green rollout model.

## Included Files

- `deploy-config.json`: app metadata such as `appName`, default port, and target VPS names
- `.github/workflows/ci-cd.yml`: example pipeline that notifies the manager about a built image, deploys the next release, and optionally shifts traffic
- `server.js`, `public/`, and `package.json`: a minimal deployable Node starter app

## Expected Usage

Use this template as the starting point for a real application repository. Replace placeholders before use:

- Runtime values in `.env` and `.env.example`
- Deployment metadata in `deploy-config.json`

`deploy-config.json` is the single source of truth for deployment settings such as:
- `appName`
- `domain`
- `containerPort`
- `vpsTargets`
- `sslCertificate`
- `sslCertificateKey`
- `desiredInstances`
- `deployMode`
- `greenPercentage`

The workflow derives the Docker image repository as `${DOCKERHUB_USERNAME}/{appName}`, so the pushed image name follows the configured app name automatically.

The workflow assumes the target app already has a valid `Dockerfile` at its repository root. A typical release flow is:

1. Deploy the next release image with `instances` set explicitly or omitted to reuse the previous count.
2. If `DEPLOY_MODE=canary`, verify the green containers externally and then increase `greenPercentage` through the manager rollout endpoint.
3. If `DEPLOY_MODE=immediate`, the build deploys straight to `100%` without a separate rollout step.
