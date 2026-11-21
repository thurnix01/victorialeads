# Victoria Leads intake: n8n + Cloudflare + Oracle (no Make / Supabase)

Site forms POST to your self-hosted n8n on Oracle (Cloudflare: `n8n.cbhrcom.com`).

```
victorialeads.ca form
  → HTTPS POST → n8n.cbhrcom.com/webhook/...
    → Google Sheets row
    → Gmail to info@victorialeads.ca
```

Spreadsheet: [Victoria Leads Intake](https://docs.google.com/spreadsheets/d/1WERuFEVj_5mseGQBiqkCh557ayLKREALWWiDz3-TPZc/edit)  
Sheet ID: `1WERuFEVj_5mseGQBiqkCh557ayLKREALWWiDz3-TPZc`

---

## Import + connect (do this once)

### A) Import the two workflows

1. Open https://n8n.cbhrcom.com and sign in.
2. Left menu → **Workflows**.
3. Top-right **⋯** (or **Add workflow** menu) → **Import from File…**
4. Pick this file (Finder already opened on the `n8n` folder):
   - `victoria-leads-demo.workflow.json`
5. Repeat Import for:
   - `victoria-leads-campaign-brief.workflow.json`
6. You should see two inactive workflows named:
   - **Victoria Leads — Demo Lead Intake**
   - **Victoria Leads — Campaign Brief Intake**

### B) Connect Google Sheets (once, reuse on both)

Do this on the **Demo** workflow first:

1. Open **Victoria Leads — Demo Lead Intake**.
2. Click the **Append to Google Sheets** node.
3. Under **Credential**, click the dropdown → **Create new credential**.
4. Choose **Google Sheets OAuth2 API**.
5. Click **Sign in with Google** → pick the Google account that owns the spreadsheet → Allow.
6. Save the credential (name it e.g. `Victoria Leads Google`).
7. Confirm:
   - Document ID is already set (`1WERuFEVj_…`)
   - Sheet name = **Demo Leads**
8. Click **Save** on the workflow (top right).

On the **Campaign Brief** workflow:

1. Open **Append to Google Sheets**.
2. Select the **same** Google credential you just created.
3. Confirm sheet name = **Campaign Briefs**.
4. Save.

### C) Connect Gmail (once, reuse on both)

1. In the Demo workflow, click **Email Internal Notification**.
2. Credential → **Create new** → **Gmail OAuth2**.
3. Sign in with Google (same account that can send as / to `info@victorialeads.ca`).
4. Allow Gmail send scopes → Save credential (e.g. `Victoria Leads Gmail`).
5. Confirm **To** = `info@victorialeads.ca`.
6. On the Campaign Brief workflow, select that same Gmail credential → Save.

> If Google blocks the OAuth app (“This app isn’t verified”), click **Advanced → Go to … (unsafe)** for your own Cloud project, or use the existing Google Cloud OAuth client you already use for other n8n workflows (Client ID / Secret from Google Cloud Console → Credentials).

### D) Activate

1. Open each workflow.
2. Toggle **Inactive → Active** (top right).
3. Production URLs should be:
   - `https://n8n.cbhrcom.com/webhook/victoria-leads-demo`
   - `https://n8n.cbhrcom.com/webhook/victoria-leads-campaign-brief`

### E) Turn off Make

In Make.com, disable **My - New Lead Intake Form**.

### F) Test

1. Submit a demo on https://victorialeads.ca/#demo  
2. n8n → **Executions** → success  
3. New row on **Demo Leads** + email in inbox  

Same for `/start-your-campaign/`.

---

## Site env (optional)

Defaults already point at `n8n.cbhrcom.com`. Override only if paths differ:

```bash
NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL=https://n8n.cbhrcom.com/webhook/victoria-leads-demo
NEXT_PUBLIC_N8N_BRIEF_WEBHOOK_URL=https://n8n.cbhrcom.com/webhook/victoria-leads-campaign-brief
```
