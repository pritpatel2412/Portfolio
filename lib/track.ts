export type AnalyticsEvent =
  | { name: 'cta_contact_click'; properties: { location: string } }
  | { name: 'email_copied'; properties?: Record<string, never> }
  | { name: 'resume_open'; properties?: Record<string, never> }
  | { name: 'resume_download'; properties?: Record<string, never> }
  | { name: 'project_open'; properties: { slug: string; from: string } }
  | { name: 'pick_add'; properties: { slug: string } }
  | { name: 'picks_send'; properties: { count: number } }
  | { name: 'case_study_depth'; properties: { slug: string; depth: 25 | 50 | 75 | 100 } }
  | { name: 'palette_open'; properties?: Record<string, never> }
  | { name: 'palette_action'; properties: { id: string } }
  | { name: 'form_start'; properties?: Record<string, never> }
  | { name: 'form_submit'; properties: { ok: boolean } }
  | { name: 'theme_toggle'; properties?: Record<string, never> }
  | { name: 'outbound_click'; properties: { host: string } };

export function track<E extends AnalyticsEvent>(
  event: E['name'],
  properties?: E extends { properties: infer P } ? P : never
) {
  if (typeof window === 'undefined') return;
  // Honour Do Not Track
  if (navigator.doNotTrack === '1' || (window as unknown as { doNotTrack?: string }).doNotTrack === '1') {
    return;
  }
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, properties ?? {});
  }
}
