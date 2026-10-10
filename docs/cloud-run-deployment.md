# Cloud Run deployment

This service uses the same container and Cloud Build pattern as `celesnity-ldp`.
The deck app also has runtime access codes and optional AI credentials. Keep
those in Secret Manager and bind them to Cloud Run environment variables. The
Docker build needs none of these values.

## Target

| Setting | Initial value |
| --- | --- |
| GCP project | `cosmos3-mmad-research` (same baseline as `celesnity-ldp`) |
| Region | `asia-southeast1` |
| Artifact Registry repository | `cloud-run-source-deploy` |
| Cloud Run service | `celesnity-deck` |
| Runtime service account | `celesnity-deck@cosmos3-mmad-research.iam.gserviceaccount.com` |
| Container | port `8080`, 1 CPU, 1 GiB memory, concurrency 20, min 0, max 1 |

Use a separate project if customer access or data policies require it. Update
the `cloudbuild.yaml` substitutions and the commands below together.

The repository has three decks: `hoa-phat`, `nestle-vietnam`, and
`isuzu-vietnam`. All three need nonempty access codes before enabling public
Cloud Run access. A missing code makes that deck publicly accessible. The `/`
portal and image assets are public by the current application design; the
access code protects deck pages, APIs, PDFs, and other non-image assets.

## 1. Prepare Google Cloud

1. Enable Cloud Run, Cloud Build, Artifact Registry, Secret Manager, and the
   GitHub repository connection API used by your Cloud Build trigger. Confirm
   billing is enabled.
2. Create or confirm the Docker repository `cloud-run-source-deploy` in
   `asia-southeast1`.
3. Create a dedicated runtime service account named `celesnity-deck`.
4. Create these Secret Manager secrets, with a **nonempty** version for each:
   `celesnity-deck-access-code-hoa-phat`,
   `celesnity-deck-access-code-nestle-vietnam`, and
   `celesnity-deck-access-code-isuzu-vietnam`. Add secret values in the Google
   Cloud Console so they do not appear in shell history or build logs.
5. Grant the runtime service account Secret Manager Secret Accessor on those
   three secrets only. If enabling live AI, create
   `celesnity-deck-openai-api-key` and grant access to it as well.
6. Give the Cloud Build trigger identity permission to build, push to this
   Artifact Registry repository, update this Cloud Run service, act as the
   runtime service account, and write build logs. Keep build and runtime
   identities separate. The build identity does not need to read deck secrets.

## 2. Bootstrap the service once

The checked-in `cloudbuild.yaml` uses `gcloud run services update`, so the
service must exist before the GitHub trigger runs. Build one initial image
without the trigger (replace the project if needed):

```bash
gcloud builds submit \
  --project=cosmos3-mmad-research \
  --region=asia-southeast1 \
  --tag=asia-southeast1-docker.pkg.dev/cosmos3-mmad-research/cloud-run-source-deploy/celesnity-deck:bootstrap \
  .
```

Create the service with all three secret bindings in the same deployment:

```bash
gcloud run deploy celesnity-deck \
  --project=cosmos3-mmad-research \
  --region=asia-southeast1 \
  --image=asia-southeast1-docker.pkg.dev/cosmos3-mmad-research/cloud-run-source-deploy/celesnity-deck:bootstrap \
  --service-account=celesnity-deck@cosmos3-mmad-research.iam.gserviceaccount.com \
  --port=8080 --cpu=1 --memory=1Gi --concurrency=20 \
  --min-instances=0 --max-instances=1 \
  --set-secrets=ACCESS_CODE_HOA_PHAT=celesnity-deck-access-code-hoa-phat:latest,ACCESS_CODE_NESTLE_VIETNAM=celesnity-deck-access-code-nestle-vietnam:latest,ACCESS_CODE_ISUZU_VIETNAM=celesnity-deck-access-code-isuzu-vietnam:latest \
  --set-env-vars=CHAT_LOG=off \
  --allow-unauthenticated
```

If the public invocation policy is restricted, use the approved ingress and
authentication path for customer access. Do not leave any access-code secret
empty. Set `CHAT_LOG=off`: the current file logger would put customer questions
on an ephemeral container filesystem.

Live AI is optional. Without `OPENAI_API_KEY`, chat and M6 use their offline
responses. To enable it later, bind `OPENAI_API_KEY` to
`celesnity-deck-openai-api-key:latest` on the Cloud Run service (using the
Console or `gcloud run services update --update-secrets`). Set `OPENAI_BASE_URL`
and `CHAT_MODEL` as runtime variables if the defaults are unsuitable. Confirm
the selected endpoint is reachable from Cloud Run before enabling the key.

The current daily budget and hourly rate limit are kept in process memory.
`max-instances=1` reduces divergence, but restarts and overlapping revisions
reset or duplicate those counters. They are not a strict account-wide cost
limit; use an upstream quota or shared store if a hard cap is required.

## 3. Enable continuous deployment

Connect `celesnity/celesnity-deck` to Cloud Build. Create a trigger for the
approved production branch (`^main$` if following the LDP setup), using
**Cloud Build configuration file** at `/cloudbuild.yaml`. The trigger builds an
image tagged with `$COMMIT_SHA`, pushes it, and updates only the existing
service image. Its secret bindings, service identity, access policy, and
scaling configuration stay on the service. Promote changes through the
repository's normal PR flow; the trigger should run only after merge.

## 4. Verify and roll back

Before sharing the URL, check the Cloud Build result and source commit, then
confirm the new Cloud Run revision is Ready and receives traffic. Open the
direct `run.app` URL:

- `/` should load with CSS, images, and videos.
- Each `/<slug>` should redirect an unauthenticated browser to `/truy-cap`.
- Enter the correct code for each deck and confirm its page, PDF, chat, and M6
  work as configured. A code for one deck must not open another deck.
- Inspect Cloud Run logs for startup, secret-access, or request errors. If AI
  is enabled, verify one bounded request and the intended upstream route.

Read-only service inspection:

```bash
gcloud run services describe celesnity-deck \
  --project=cosmos3-mmad-research \
  --region=asia-southeast1
```

To roll back, route 100% of traffic to a known-good revision in **Cloud Run →
celesnity-deck → Revisions → Manage traffic**. A successful local build or
Cloud Build result alone does not prove the running service behaves correctly.
