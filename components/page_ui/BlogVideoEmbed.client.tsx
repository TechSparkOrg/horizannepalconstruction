"use client";

function getEmbedUrl(url: string): string | null {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  if (url.includes("facebook.com") || url.includes("fb.com"))
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`;

  return null;
}

interface Props {
  url: string;
}

export default function BlogVideoEmbed({ url }: Props) {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
          <iframe
            src={embedUrl}
            title="Embedded video"
            className="absolute inset-0 size-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
