/**
 * Post form payloads to self-hosted n8n (Oracle + Cloudflare Tunnel → n8n.cbhrcom.com).
 *
 * Uses text/plain so browsers treat the request as "simple" (avoids CORS preflight).
 * n8n webhook Allowed Origins should include https://victorialeads.ca
 */

const DEFAULT_BASE = "https://n8n.cbhrcom.com/webhook";

export function demoWebhookUrl() {
  return (
    (process.env.NEXT_PUBLIC_N8N_DEMO_WEBHOOK_URL || "").trim() ||
    `${DEFAULT_BASE}/victoria-leads-demo`
  );
}

export function briefWebhookUrl() {
  return (
    (process.env.NEXT_PUBLIC_N8N_BRIEF_WEBHOOK_URL || "").trim() ||
    `${DEFAULT_BASE}/victoria-leads-campaign-brief`
  );
}

/**
 * @param {string} webhookUrl
 * @param {Record<string, unknown>} payload
 */
export async function submitToN8n(webhookUrl, payload) {
  if (!webhookUrl) {
    throw new Error("n8n webhook URL is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      detail
        ? `n8n webhook failed (${response.status}): ${detail}`
        : `n8n webhook failed with status ${response.status}`,
    );
  }

  return response;
}
