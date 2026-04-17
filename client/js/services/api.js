/**
 * Voxly Pro — thin fetch wrapper around the backend API.
 * All endpoints require an authenticated session (cookie), which is set
 * after login in auth.js.
 */

window.API = (() => {
  const BASE = '/api';

  const request = async (path, { method = 'GET', params, body } = {}) => {
    let url = BASE + path;
    if (params) {
      const qs = new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
        )
      ).toString();
      if (qs) url += '?' + qs;
    }
    const res = await fetch(url, {
      method,
      credentials: 'include',
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || `Request failed (${res.status})`);
      err.status = res.status;
      err.details = data.details;
      throw err;
    }
    return data;
  };

  return {
    health: () => request('/health'),

    brands: {
      list:  ()        => request('/brands'),
      get:   (slug)    => request(`/brands/${slug}`),
    },

    dashboard: {
      stats:     (slug, params) => request(`/dashboard/${slug}/stats`,     { params }),
      posts:     (slug, params) => request(`/dashboard/${slug}/posts`,     { params }),
      activity:  (slug, params) => request(`/dashboard/${slug}/activity`,  { params }),
      platforms: (slug, params) => request(`/dashboard/${slug}/platforms`, { params }),
    },

    analytics: {
      overview:  (slug, params) => request(`/analytics/${slug}/overview`,  { params }),
      keywords:  (slug, params) => request(`/analytics/${slug}/keywords`,  { params }),
      platforms: (slug, params) => request(`/analytics/${slug}/platforms`, { params }),
      sentiment: (slug, params) => request(`/analytics/${slug}/sentiment`, { params }),
      swot:      (slug)         => request(`/analytics/${slug}/swot`),
    },

    realtime: {
      feed:  (slug, params) => request(`/realtime/${slug}/feed`,  { params }),
      pulse: (slug)         => request(`/realtime/${slug}/pulse`),
    },

    competitors: {
      list:    (slug, params) => request(`/competitors/${slug}`,         { params }),
      compare: (slug, params) => request(`/competitors/${slug}/compare`, { params }),
    },

    influencers: {
      list:   (params)    => request('/influencers', { params }),
      get:    (id)        => request(`/influencers/${id}`),
      pinned: ()          => request('/influencers/pinned'),
      pin:    (id)        => request(`/influencers/${id}/pin`, { method: 'POST' }),
      unpin:  (id)        => request(`/influencers/${id}/pin`, { method: 'DELETE' }),
    },

    journey: {
      get: (slug) => request(`/journey/${slug}`),
    },

    reports: {
      list:        ()      => request('/reports'),
      get:         (id)    => request(`/reports/${id}`),
      create:      (body)  => request('/reports', { method: 'POST', body }),
      remove:      (id)    => request(`/reports/${id}`, { method: 'DELETE' }),
      downloadUrl: (id)    => `${BASE}/reports/${id}/download`,
    },

    settings: {
      get:    ()      => request('/settings'),
      update: (body)  => request('/settings', { method: 'PATCH', body }),
    },

    trends: {
      list:     (params) => request('/trends', { params }),
      hashtags: (params) => request('/trends/hashtags', { params }),
      topics:   (params) => request('/trends/topics', { params }),
      rising:   (params) => request('/trends/rising', { params }),
    },
  };
})();
