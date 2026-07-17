import React, { useState } from 'react';

const AVATAR_GRADIENTS = [
  'from-violet-500 to-fuchsia-500',
  'from-cyan-500 to-blue-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
];

const gradientFor = (seed) => {
  const code = String(seed || '').split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return AVATAR_GRADIENTS[code % AVATAR_GRADIENTS.length];
};

const Card = ({
  id,
  SapId,
  Name,
  message,
  fromSapId,
  likes,
  creation_date,
  liked,
  onLike,
  isLiking,
  appreciation_header,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 150;
  const shouldTruncate = (message || '').length > maxLength && !isExpanded;
  const displayMessage = shouldTruncate ? `${(message || '').substring(0, maxLength)}...` : (message || '');

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="group h-full">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden glass-panel hover:border-white/20 hover:-translate-y-1 transition-all duration-300">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 shrink-0 rounded-full bg-gradient-to-br ${gradientFor(Name)} flex items-center justify-center text-white font-bold shadow-lg`}>
              {(Name || '?').charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-white truncate">{Name || 'Unknown'}</h2>
              <p className="text-xs text-slate-400">SAP ID: {SapId || '-'}</p>
            </div>
          </div>
          {appreciation_header ? (
            <span className="chip mt-3 bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20">
              {appreciation_header}
            </span>
          ) : null}
        </div>

        {/* Message content */}
        <div className="p-5 flex-grow">
          <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
            {displayMessage}
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(true)}
                className="ml-1 text-cyan-400 hover:text-cyan-300 hover:underline focus:outline-none"
              >
                Read more
              </button>
            )}
            {isExpanded && (message || '').length > maxLength && (
              <button
                onClick={() => setIsExpanded(false)}
                className="ml-1 text-cyan-400 hover:text-cyan-300 hover:underline focus:outline-none"
              >
                Show less
              </button>
            )}
          </p>
        </div>

        {/* Footer with actions */}
        <div className="px-5 py-3 bg-white/[0.02] border-t border-white/10">
          <div className="flex justify-between items-center">
            <div className="text-xs text-slate-400">
              From <span className="font-medium text-violet-300">{fromSapId}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">{formatDate(creation_date)}</span>
              <button
                onClick={() => onLike(id, likes)}
                disabled={isLiking || liked}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1 ${
                  liked
                    ? 'text-rose-400 bg-rose-500/10'
                    : 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                } ${isLiking ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label={liked ? 'Unlike post' : 'Like post'}
              >
                {isLiking ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent"></div>
                ) : liked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
                <span className="text-sm">{likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
