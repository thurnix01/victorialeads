# Victoria Leads intake: n8n + Cloudflare + Oracle (no Make / Supabase)

Site forms now POST to your self-hosted n8n on Oracle (exposed via Cloudflare as `n8n.cbhrcom.com`).

## Flow

```
victorialeads.ca form
  → HTTPS POST → n8n.cbhrcom.com/webhook/...
  → Google Sheets row
  → Gmail to info@victorialeads.ca
```

## 1) Google Sheets

1. Create a spreadsheet **Victoria Leads Intake**.
2. Tab **Demo Leads** — paste headers from `google-sheet-headers-demo.csv`.
3. Tab **Campaign Briefs** — paste headers from `google-sheet-headers-brief.csv`.
4. Copy the Sheet ID from the URL.

## 2) Import workflows in n8n

1. Open https://n8n.cbhrcom.com (Oracle VM + Cloudflare Tunnel).
2. **Workflows → Import from File**:
   - `victoria-leads-demo.workflow.json`
   - `victoria-leads-campaign-brief.workflow.json`
3. In each workflow:
   - Connect **Google Sheets** OAuth → set document ID → confirm tab names.
   - Connect **Gmail** OAuth → confirm `info@victorialeads.ca` (or your inbox).
4. **Activate** both workflows.
5. Copy production webhook URLs (should look like):
   - `https://n8n.cbhrcom.com/webhook/victoria-leads-demo`
   - `https://n8n.cbhrcom.com/webhook/victoria-leads-campaign-brief`

Webhook **Allowed Origins** already include `https://victorialeads.ca`.

## 3) Site env (optional overrides)

Defaults already point at `n8n.cbhrcom.com`. Override only if paths differ:

```bash
NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL=https://n8n.cbhrcom.com/webhook/victoria-leads-demo
NEXT_PUBLIC_N8N_BRIEF_WEBHOOK_URL=https://n8n.cbhrcom.com/webhook/victoria-leads-campaign-brief
```

For GitHub Pages builds, add the same as repository **Variables** or **Secrets**.

## 4) Turn off Make

In Make.com, disable/delete **My - New Lead Intake Form** so it no longer watches Supabase.

## 5) Test

1. Submit a demo on https://victorialeads.ca/#demo  
2. Confirm n8n **Executions** → success  
3. Confirm Sheet row + email  

Same for `/start-your-campaign/`.
