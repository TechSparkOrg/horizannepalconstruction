export async function ScriptInjector() {
  let head = "";
  let body = "";

  try {
    const { SettingsService } = await import("@/api/services/settings.service");
    const settings = await SettingsService.get();
    head = settings.scripts?.head ?? "";
    body = settings.scripts?.body ?? "";
  } catch {}

  return (
    <>
      {head && <div className="sr-only" dangerouslySetInnerHTML={{ __html: head }} />}
      {body && <div className="sr-only" dangerouslySetInnerHTML={{ __html: body }} />}
    </>
  );
}
