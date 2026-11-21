# Victoria Leads intake: n8n + Cloudflare + Oracle (no Make / Supabase)

Site forms POST to your self-hosted n8n on Oracle (Cloudflare: `n8n.cbhrcom.com`).

**Two separate workflows** (one webhook each):

| File | Workflow | Webhook path | Sheet tab |
|---|---|---|---|
| `victoria-leads-demo.workflow.json` | Demo Lead Intake | `/webhook/victoria-leads-demo` | Demo Leads |
| `victoria-leads-campaign-brief.workflow.json` | Campaign Brief Intake | `/webhook/victoria-leads-campaign-brief` | Campaign Briefs |

```
victorialeads.ca form
  → HTTPS POST → n8n.cbhrcom.com/webhook/...
    → Google Sheets row
    → Outlook to info@victorialeads.ca (internal)
    → Outlook to the lead’s email (client confirmation)
```

Spreadsheet: [Victoria Leads Intake](https://docs.google.com/spreadsheets/d/1WERuFEVj_5mseGQBiqkCh557ayLKREALWWiDz3-TPZc/edit)  
Sheet ID: `1WERuFEVj_5mseGQBiqkCh557ayLKREALWWiDz3-TPZc`

---

## Status

Intake is live on n8n (Oracle + Cloudflare): Sheets + Outlook internal alert + client confirmation. Site forms post to `n8n.cbhrcom.com` webhooks (no Make / Supabase on submit).

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

### C) Connect Microsoft Outlook (once, reuse on both)

Mail goes through **Microsoft Outlook** (not Gmail), into your Microsoft 365 inbox (`info@victorialeads.ca`).

1. In the Demo workflow, click **Email Internal Notification** (Microsoft Outlook node).
2. Credential → **Create new** → **Microsoft Outlook OAuth2**.
3. Sign in with the Microsoft account that owns / can send as `info@victorialeads.ca`.
4. Allow Mail.Send (and related) scopes → Save (e.g. `Victoria Leads Outlook`).
5. Confirm **To** = `info@victorialeads.ca`.
6. On the Campaign Brief workflow, select that same Outlook credential → Save.

> First-time Microsoft OAuth needs an Azure app registration (Client ID + Secret) with redirect URI from n8n’s credential screen, and API permissions: `Mail.Send`, `Mail.ReadWrite`, `offline_access`, `openid`, `User.Read`. If you already have Outlook connected in n8n for another workflow, reuse that credential.

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
