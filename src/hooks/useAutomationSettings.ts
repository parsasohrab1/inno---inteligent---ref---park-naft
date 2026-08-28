import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "automation-webhook-url";

export function getWebhookUrl(): string {
  return window.localStorage.getItem(STORAGE_KEY) ?? "";
}

export function useAutomationSettings() {
  const [webhookUrl, setWebhookUrlState] = useState<string>(() => getWebhookUrl());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, webhookUrl);
  }, [webhookUrl]);

  const setWebhookUrl = useCallback((url: string) => setWebhookUrlState(url), []);

  return { webhookUrl, setWebhookUrl };
}
