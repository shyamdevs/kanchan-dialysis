import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

const TABS = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'news', label: 'News & Updates' },
  { id: 'patients', label: 'Patient Posts' },
  { id: 'trustees', label: 'Trustees' },
];
const GALLERY_CATEGORIES = ['Centre Facility', 'Dialysis Care', 'Equipment', 'Community Event', 'Health Camp', 'Awareness Programme', 'Centre Celebration'];
const NEWS_CATEGORIES = ['Centre News', 'Health Camp', 'Awareness Programme', 'Community Event', 'Facility Update', 'Video Update'];
const BLANK_FORM = { title: '', excerpt: '', body: '', description: '', category: '', imageUrl: '', imagePublicId: '', mediaUrl: '', mediaType: 'image', videoUrl: '', author: '', date: '', published: false, patientConsent: false };
const inputClass = 'mt-2 min-h-11 w-full rounded-xl border border-border-subtle bg-white px-3.5 py-2.5 text-sm text-primary-navy outline-none transition placeholder:text-text-secondary focus:border-primary-teal focus:ring-4 focus:ring-surface-teal';
const fieldClass = 'block text-sm font-bold text-text-secondary';

function errorMessage(error) { return error instanceof Error ? error.message : 'Something went wrong.'; }
function prettyDate(value) {
  if (!value) return 'Not dated';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not dated' : date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function Admin() {
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [tab, setTab] = useState('gallery');
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(BLANK_FORM);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadAdmin = useCallback(async () => {
    try {
      const result = await apiRequest('/auth/me');
      setAdmin(result.admin);
    } catch { setAdmin(null); }
    finally { setChecking(false); }
  }, []);

  const loadItems = useCallback(async () => {
    if (!admin) return;
    setBusy(true); setError('');
    try {
      const result = await apiRequest(`/admin/content/${tab}`);
      setItems(Array.isArray(result.items) ? result.items : []);
    } catch (loadError) { setError(errorMessage(loadError)); setItems([]); }
    finally { setBusy(false); }
  }, [admin, tab]);

  useEffect(() => { loadAdmin(); }, [loadAdmin]);
  useEffect(() => { if (admin) loadItems(); }, [admin, loadItems]);

  async function handleLogin(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const result = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(login) });
      setAdmin(result.admin); setNotice('Signed in successfully.');
    } catch (loginError) { setError(errorMessage(loginError)); }
    finally { setBusy(false); }
  }

  async function handleLogout() {
    try { await apiRequest('/auth/logout', { method: 'POST' }); }
    catch (logoutError) { setError(errorMessage(logoutError)); }
    finally { setAdmin(null); setItems([]); setForm(BLANK_FORM); setEditingId(null); setNotice(''); }
  }

  function resetForm() { setForm(BLANK_FORM); setEditingId(null); setError(''); setNotice(''); }

  function startEdit(item) {
    setEditingId(item._id);
    setForm({ ...BLANK_FORM, ...item, date: item.date ? new Date(item.date).toISOString().slice(0, 10) : '', patientConsent: Boolean(item.patientConsent), published: Boolean(item.published) });
    setError(''); setNotice('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  async function uploadMedia(event) {
    const file = event.target.files?.[0]; event.target.value = '';
    if (!file) return;
    setUploading(true); setError(''); setNotice('');
    try {
      const body = new FormData(); body.append('file', file);
      const result = await apiRequest('/admin/upload', { method: 'POST', body });
      setForm((current) => ({ ...current, imageUrl: result.mediaType === 'image' ? result.url : current.imageUrl, mediaUrl: result.url, imagePublicId: result.publicId, mediaType: result.mediaType }));
      setNotice(`${result.mediaType === 'image' ? 'Image' : 'Video'} uploaded. Remember to save the content item.`);
    } catch (uploadError) { setError(errorMessage(uploadError)); }
    finally { setUploading(false); }
  }

  async function saveContent(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const path = `/admin/content/${tab}${editingId ? `/${encodeURIComponent(editingId)}` : ''}`;
      await apiRequest(path, { method: editingId ? 'PUT' : 'POST', body: JSON.stringify(form) });
      setNotice(form.published ? 'Content published successfully.' : 'Draft saved successfully.');
      setForm(BLANK_FORM); setEditingId(null); await loadItems();
    } catch (saveError) { setError(errorMessage(saveError)); }
    finally { setBusy(false); }
  }

  async function deleteContent(item) {
    if (!window.confirm(`Delete “${item.title}”? This action cannot be undone.`)) return;
    setBusy(true); setError(''); setNotice('');
    try {
      await apiRequest(`/admin/content/${tab}/${encodeURIComponent(item._id)}`, { method: 'DELETE' });
      setNotice('Content deleted.'); if (editingId === item._id) resetForm(); await loadItems();
    } catch (deleteError) { setError(errorMessage(deleteError)); }
    finally { setBusy(false); }
  }

  if (checking) return <main className="flex min-h-screen items-center justify-center bg-neutral-background p-6"><div className="rounded-2xl border border-border-subtle bg-white px-8 py-10 text-center shadow-sm"><span className="mx-auto flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-background-blue text-xl font-bold text-primary-navy">✚</span><p role="status" className="mt-4 font-semibold text-text-secondary">Checking administrator session…</p></div></main>;

  if (!admin) return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-background via-neutral-background to-background-blue px-4 py-10"><div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-surface-teal/40 blur-3xl"/><div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-surface-teal/40 blur-3xl"/><section className="relative w-full max-w-md rounded-3xl border border-white/80 bg-white/95 p-6 shadow-2xl shadow-primary-navy/10 backdrop-blur sm:p-9"><a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary-navy hover:text-primary-navy">← Back to website</a><div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-teal-dark text-2xl font-bold text-white shadow-lg shadow-primary-navy/20">✚</div><p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-primary-teal">Shri Kanchan Dialysis Centre</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-primary-navy">Admin sign in</h1><p className="mt-3 leading-7 text-text-secondary">Manage published gallery images, news and videos, patient posts, and trustee profiles.</p>{error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-sm font-medium text-red-800" role="alert">{error}</div>}{notice && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-800" role="status">{notice}</div>}<form onSubmit={handleLogin} className="mt-6 space-y-5"><label className={fieldClass}>Email address<input type="email" name="email" autoComplete="username" required maxLength="254" value={login.email} onChange={(event) => setLogin((current) => ({ ...current, email: event.target.value }))} className={inputClass} placeholder="admin@example.com"/></label><label className={fieldClass}>Password<input type="password" name="password" autoComplete="current-password" required maxLength="300" value={login.password} onChange={(event) => setLogin((current) => ({ ...current, password: event.target.value }))} className={inputClass} placeholder="Your admin password"/></label><button type="submit" disabled={busy} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3.5 font-extrabold text-white shadow-lg shadow-primary-navy/15 transition hover:bg-primary-navy disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in securely'} <span>→</span></button></form><p className="mt-5 text-xs leading-5 text-text-secondary">Administrator accounts are created from server environment settings. Public registration is disabled.</p></section></main>;

  const activeTab = TABS.find((entry) => entry.id === tab);
  const categoryOptions = tab === 'gallery' ? GALLERY_CATEGORIES : tab === 'news' ? NEWS_CATEGORIES : [];

  return <main className="min-h-screen bg-neutral-background text-text-secondary">
    <header className="border-b border-border-subtle bg-white"><div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary-navy hover:text-primary-navy">← View website</a><p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-primary-teal">Content management</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight text-primary-navy sm:text-3xl">Kanchan Dialysis Admin</h1><p className="mt-2 text-sm text-text-secondary">Signed in as {admin.email}</p></div><button type="button" onClick={handleLogout} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border-subtle bg-white px-5 py-3 text-sm font-extrabold text-text-secondary transition hover:bg-neutral-background">Sign out</button></div></header>
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <nav aria-label="Content types" className="flex gap-2 overflow-x-auto rounded-2xl border border-border-subtle bg-white p-2 shadow-sm">{TABS.map((entry) => <button type="button" key={entry.id} onClick={() => { setTab(entry.id); resetForm(); }} className={`shrink-0 rounded-xl px-4 py-3 text-sm font-extrabold transition ${tab === entry.id ? 'bg-primary-teal-dark text-white shadow-md' : 'text-text-secondary hover:bg-neutral-background hover:text-primary-navy'}`}>{entry.label}</button>)}</nav>
      {error && <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800" role="alert">{error}</div>}{notice && <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800" role="status">{notice}</div>}
      <section className="mt-6 grid items-start gap-6 xl:grid-cols-[minmax(360px,0.85fr)_minmax(0,1.15fr)]">
        <div className="rounded-2xl border border-border-subtle bg-white shadow-sm"><div className="border-b border-border-subtle p-5 sm:p-6"><p className="text-xs font-extrabold uppercase tracking-[0.17em] text-primary-teal">{editingId ? 'Edit item' : 'Create item'}</p><h2 className="mt-2 text-xl font-extrabold text-primary-navy">{editingId ? 'Update content' : `Add ${activeTab.label.toLowerCase()}`}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">Content is private until you tick “Publish” and save.</p></div>
          <form onSubmit={saveContent} className="space-y-5 p-5 sm:p-6">
            <label className={fieldClass}>Title *<input name="title" required maxLength="180" value={form.title} onChange={updateField} className={inputClass} placeholder={tab === 'trustees' ? 'Verified trustee name' : 'Enter a clear title'}/></label>
            {tab !== 'trustees' && <label className={fieldClass}>Short summary<textarea name="excerpt" rows="2" maxLength="600" value={form.excerpt || ''} onChange={updateField} className={inputClass} placeholder="A short summary shown on the public page"/></label>}
            {tab === 'gallery' && <label className={fieldClass}>Gallery category *<select name="category" required value={form.category || ''} onChange={updateField} className={inputClass}><option value="">Choose a hospital/event category</option>{GALLERY_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select><span className="mt-1 block text-xs font-normal leading-5 text-text-secondary">Only these categories appear on the public Gallery page.</span></label>}
            {tab === 'news' && <label className={fieldClass}>News category<select name="category" value={form.category || ''} onChange={updateField} className={inputClass}><option value="">Choose a category</option>{NEWS_CATEGORIES.map((category) => <option key={category}>{category}</option>)}</select></label>}
            {tab === 'trustees' && <label className={fieldClass}>Role / designation<input name="category" maxLength="80" value={form.category || ''} onChange={updateField} className={inputClass} placeholder="e.g. Trustee / Chairperson"/></label>}
            {tab === 'patients' && <label className={fieldClass}>Post type<select name="category" value={form.category || ''} onChange={updateField} className={inputClass}><option value="">Choose a post type</option><option>Patient story</option><option>Patient awareness</option><option>Community support</option></select></label>}
            {(tab === 'news' || tab === 'patients') && <label className={fieldClass}>Full content<textarea name="body" rows="5" maxLength="20000" value={form.body || ''} onChange={updateField} className={inputClass} placeholder="Write the update or details. Avoid sharing confidential medical information."/></label>}
            {tab === 'trustees' && <label className={fieldClass}>Short profile<textarea name="excerpt" rows="3" maxLength="600" value={form.excerpt || ''} onChange={updateField} className={inputClass} placeholder="Verified biography or a short introduction"/></label>}
            <div className="grid gap-4 sm:grid-cols-2"><label className={fieldClass}>Display date<input type="date" name="date" value={form.date || ''} onChange={updateField} className={inputClass}/></label>{tab === 'news' && <label className={fieldClass}>Author / source<input name="author" maxLength="100" value={form.author || ''} onChange={updateField} className={inputClass} placeholder="Optional"/></label>}</div>
            <label className={fieldClass}>Image URL<input type="url" name="imageUrl" maxLength="2000" value={form.imageUrl || ''} onChange={updateField} className={inputClass} placeholder="https://… or upload a file below"/><span className="mt-1 block text-xs font-normal leading-5 text-text-secondary">Use clear images that the organisation is authorised to share.</span></label>
            <label className={fieldClass}>Upload image{tab === 'news' ? ' or MP4 video' : ''}<input type="file" accept={tab === 'news' ? 'image/jpeg,image/png,image/webp,image/avif,video/mp4' : 'image/jpeg,image/png,image/webp,image/avif'} onChange={uploadMedia} disabled={uploading} className="mt-2 block w-full rounded-xl border border-border-subtle bg-white p-3 text-sm text-text-secondary file:mr-4 file:rounded-lg file:border-0 file:bg-neutral-background file:px-3 file:py-2 file:font-bold file:text-primary-navy hover:file:bg-background-blue"/><span className="mt-1 block text-xs font-normal leading-5 text-text-secondary">Uploads need Cloudinary credentials on the server. Alternatively, paste an existing HTTPS media URL above or below.</span>{uploading && <span role="status" className="mt-2 block text-sm font-bold text-primary-navy">Uploading media…</span>}</label>
            {tab === 'news' && <><label className={fieldClass}>Video URL (optional)<input type="url" name="mediaUrl" maxLength="2000" value={form.mediaUrl || ''} onChange={updateField} className={inputClass} placeholder="https://… video file URL"/></label><label className={fieldClass}>Related link / video URL<input type="url" name="videoUrl" maxLength="2000" value={form.videoUrl || ''} onChange={updateField} className={inputClass} placeholder="https://… optional"/></label><label className={fieldClass}>Media type<select name="mediaType" value={form.mediaType || 'image'} onChange={updateField} className={inputClass}><option value="image">Image</option><option value="video">MP4 video</option><option value="youtube">External video link</option><option value="none">Text only</option></select></label></>}
            {tab === 'patients' && <label className="flex items-start gap-3 rounded-xl border border-surface-teal bg-background-blue p-4 text-sm leading-6 text-primary-navy"><input type="checkbox" name="patientConsent" checked={Boolean(form.patientConsent)} onChange={updateField} className="mt-1 h-4 w-4 accent-primary-teal"/><span><strong className="block">Documented consent confirmed</strong>I confirm the centre has documented permission to publish this patient photo/story. This is required before publishing.</span></label>}
            <label className="flex items-start gap-3 rounded-xl border border-border-subtle bg-neutral-background p-4"><input type="checkbox" name="published" checked={Boolean(form.published)} onChange={updateField} className="mt-1 h-4 w-4 accent-primary-teal"/><span><strong className="block text-sm font-extrabold text-primary-navy">Publish this content</strong><small className="mt-1 block leading-5 text-text-secondary">{form.published ? 'Visible publicly after saving.' : 'Private draft; visitors cannot see it.'}</small></span></label>
            <div className="flex flex-wrap gap-3"><button type="submit" disabled={busy || uploading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary-teal-dark px-5 py-3 text-sm font-extrabold text-white transition hover:bg-primary-navy disabled:cursor-not-allowed disabled:opacity-60">{busy ? 'Saving…' : editingId ? 'Save changes' : 'Save content'}</button><button type="button" onClick={resetForm} disabled={busy} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border-subtle px-5 py-3 text-sm font-extrabold text-text-secondary transition hover:bg-neutral-background disabled:opacity-60">Clear form</button></div>
          </form>
        </div>
        <div className="rounded-2xl border border-border-subtle bg-white shadow-sm"><div className="flex items-center justify-between gap-4 border-b border-border-subtle p-5 sm:p-6"><div><p className="text-xs font-extrabold uppercase tracking-[0.17em] text-primary-teal">Content library</p><h2 className="mt-2 text-xl font-extrabold text-primary-navy">{activeTab.label}</h2><p className="mt-1 text-sm text-text-secondary">{items.length} item{items.length === 1 ? '' : 's'} · published and draft</p></div><button type="button" onClick={loadItems} disabled={busy} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-subtle text-xl font-bold text-primary-navy hover:bg-neutral-background disabled:opacity-60" aria-label="Refresh content">↻</button></div>
          {busy && items.length === 0 ? <p role="status" className="p-8 text-center text-text-secondary">Loading content…</p> : items.length === 0 ? <div className="p-8 text-center sm:p-12"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-background text-2xl text-text-secondary">▤</span><h3 className="mt-4 text-lg font-extrabold text-primary-navy">No content added</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-text-secondary">Create an item on the left. Only content you publish appears on the public website.</p></div> : <div className="divide-y divide-border-subtle">{items.map((item) => <article key={item._id} className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5"><div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-background sm:w-28">{item.imageUrl ? <img src={item.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-2xl text-text-secondary">▧</div>}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider ${item.published ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-background text-text-secondary'}`}>{item.published ? 'Published' : 'Draft'}</span><time className="text-xs text-text-secondary">{prettyDate(item.updatedAt || item.date)}</time>{item.category && <span className="rounded-full bg-neutral-background px-2.5 py-1 text-[11px] font-bold text-primary-navy">{item.category}</span>}</div><h3 className="mt-2 break-words text-base font-extrabold text-primary-navy">{item.title}</h3>{item.excerpt && <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-secondary">{item.excerpt}</p>}<div className="mt-3 flex gap-4"><button type="button" onClick={() => startEdit(item)} className="text-sm font-extrabold text-primary-navy hover:underline">Edit</button><button type="button" onClick={() => deleteContent(item)} className="text-sm font-extrabold text-red-700 hover:underline">Delete</button></div></div></article>)}</div>}
        </div>
      </section>
      <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-text-secondary">Patient images and stories must not be published without documented consent. Gallery photos must be limited to facility, dialysis care, equipment, or community events. Drafts remain private.</p>
    </div>
  </main>;
}
