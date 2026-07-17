'use client';

import { useState } from 'react';

/**
 * Ảnh hero của sự kiện (tỉ lệ 2.35:1). Khi không có URL hoặc ảnh lỗi tải, hiển thị
 * placeholder căn giữa thay vì để chữ `alt` gốc dồn ở góc trên bên trái.
 */
export function EventPhoto({ url, alt }: { url?: string | null; alt: string }) {
  const [errored, setErrored] = useState(false);
  const ok = Boolean(url) && !errored;
  return (
    <div className="w-full aspect-[2.35/1] rounded-sm overflow-hidden relative bg-surface-soft flex items-center justify-center text-center">
      {ok ? (
        <img
          src={url as string}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="t-body-sm text-mute px-4">Chưa có ảnh sự kiện</span>
      )}
    </div>
  );
}
