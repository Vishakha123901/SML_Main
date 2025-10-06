import React from 'react';
import { ExternalLink, Play } from 'lucide-react';

// Minimal type to render feed cards
export type InstagramMedia = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string; // image URL or video URL
  thumbnail_url?: string; // present for videos
  permalink: string;
  caption?: string;
  timestamp?: string;
};

const CARD_COUNT = 5;

export default function InstagramFeed() {
  const [items, setItems] = React.useState<InstagramMedia[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  // API URL: defaults to /api/instagram but can be overridden via env
  const apiUrl = (import.meta as any).env?.VITE_INSTAGRAM_API_URL || '/api/instagram';

  React.useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(apiUrl, { headers: { 'accept': 'application/json' } });
        if (!res.ok) throw new Error(`Feed request failed: ${res.status}`);
        const data = await res.json();
        // Expecting an array of media items
        const list: InstagramMedia[] = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
        if (active) setItems(list.slice(0, CARD_COUNT));
      } catch (e: any) {
        if (active) setError(e?.message || 'Failed to load Instagram feed');
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <div key={i} className="animate-pulse h-64 rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">
          Unable to load Instagram posts. {error}
        </p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {items.map((m) => (
        <a
          key={m.id}
          href={m.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block rounded-lg overflow-hidden bg-muted hover:shadow-brand-lg transition-shadow"
          aria-label={m.caption || 'Instagram post'}
        >
          <div className="aspect-square w-full overflow-hidden">
            <img
              src={m.media_type === 'VIDEO' ? (m.thumbnail_url || m.media_url) : m.media_url}
              alt={m.caption || 'Instagram media'}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          {m.media_type === 'VIDEO' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 rounded-full p-3">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          )}
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            View <ExternalLink className="w-3 h-3" />
          </div>
        </a>
      ))}
    </div>
  );
}
