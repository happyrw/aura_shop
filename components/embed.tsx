"use client"
import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    if (isIframeHtml(input)) {
      setVideoUrl('');
      setEmbedUrl(extractSrcFromIframe(input));
    } else {
      setVideoUrl(input);
      setEmbedUrl(getEmbedUrl(input));
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedContent = e.clipboardData.getData('text');
    setVideoUrl(pastedContent);
    if (isIframeHtml(pastedContent)) {
      setEmbedUrl(extractSrcFromIframe(pastedContent));
      console.log("top", embedUrl)
    } else {
      setEmbedUrl(getEmbedUrl(pastedContent));
      console.log("bottom")
    }
  };

  const isIframeHtml = (input: string): boolean => {
    return input.startsWith('<iframe') && input.endsWith('</iframe>');
  };

  const extractSrcFromIframe = (html: string): string => {
    const regex = /src="([^"]+)"/;
    const match = html.match(regex);
    return match ? match[1] : '';
  };

  const getEmbedUrl = (url: string): string => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = extractYouTubeVideoID(url);
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } else if (url.includes('vimeo.com')) {
      const videoId = extractVimeoVideoID(url);
      return videoId ? `https://player.vimeo.com/video/${videoId}` : '';
    } else if (url.includes('dailymotion.com')) {
      const videoId = extractDailymotionVideoID(url);
      return videoId ? `https://www.dailymotion.com/embed/video/${videoId}` : '';
    } else if (url.includes('xnxx.com/embedframe/')) {
      return url;  // Directly use the embed URL for xnxx.com
    } else {
      return '';
    }
  };

  const extractYouTubeVideoID = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractVimeoVideoID = (url: string) => {
    const regex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const extractDailymotionVideoID = (url: string) => {
    const regex = /dailymotion.com\/video\/([^_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div>
      <h1>Embed Video using URL or iframe HTML</h1>
      <input
        type="text"
        placeholder="Enter video URL or iframe HTML"
        value={videoUrl}
        onChange={handleInputChange}
        onPaste={handlePaste}  // Handle pasted content
      />
      {embedUrl && (
        <div style={{ marginTop: '20px' }}>
          <iframe
            width="560"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
