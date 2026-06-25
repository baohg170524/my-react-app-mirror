'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MailCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import type { AxiosError } from 'axios';
import { authApi } from '@/services/api';
import type { ApiError } from '@/services/api';

type Status = 'idle' | 'loading' | 'success' | 'error';

function VerifyEmailContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async () => {
    if (!token) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await authApi.verifyEmail(token);
      setStatus('success');
      // Give the user a beat to read the success state, then send them to login.
      setTimeout(() => router.replace('/auth'), 1800);
    } catch (e) {
      const message = (e as AxiosError<ApiError>)?.response?.data?.message;
      setStatus('error');
      setErrorMsg(message || 'Xác nhận email thất bại. Liên kết có thể đã hết hạn.');
    }
  };

  // ── Pick the visual state ───────────────────────────────────────────────────
  const noToken = !token;

  const view = noToken
    ? {
        icon: <AlertCircle size={28} className="text-error" aria-hidden="true" />,
        accent: 'bg-error/10',
        title: 'Liên kết không hợp lệ',
        message: 'Liên kết xác nhận không hợp lệ hoặc đã hết hạn. Vui lòng đăng ký lại.',
      }
    : status === 'success'
      ? {
          icon: <CheckCircle2 size={28} className="text-primary" aria-hidden="true" />,
          accent: 'bg-primary/10',
          title: 'Xác nhận thành công!',
          message: 'Email của bạn đã được xác nhận. Đang chuyển đến trang đăng nhập…',
        }
      : status === 'error'
        ? {
            icon: <AlertCircle size={28} className="text-error" aria-hidden="true" />,
            accent: 'bg-error/10',
            title: 'Xác nhận thất bại',
            message: errorMsg,
          }
        : {
            icon: <MailCheck size={28} className="text-primary" aria-hidden="true" />,
            accent: 'bg-primary/10',
            title: 'Xác nhận email',
            message: 'Nhấn nút bên dưới để xác nhận đây là email của bạn.',
          };

  return (
    <main className="min-h-dvh bg-surface-soft flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-canvas border border-hairline rounded-sm p-8 md:p-10">
        {/* brand corner squares */}
        <span className="absolute top-0 left-0 w-3 h-3 bg-primary" aria-hidden="true" />
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary" aria-hidden="true" />

        <div className="flex flex-col items-center text-center gap-5">
          <span className={`w-14 h-14 rounded-full flex items-center justify-center ${view.accent}`}>
            {view.icon}
          </span>

          <div>
            <p className="t-caption-xs text-primary font-bold uppercase tracking-wide m-0 mb-2">
              SWP SE1907
            </p>
            <h1 className="t-heading-lg text-ink m-0">{view.title}</h1>
            <p className="t-body-sm text-mute mt-2 mb-0">{view.message}</p>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3 pt-1">
            {noToken ? (
              <Link href="/auth" className="btn btn-primary w-full justify-center">
                Về đăng nhập
              </Link>
            ) : status === 'success' ? (
              <Link href="/auth" className="btn btn-primary w-full justify-center">
                Đến đăng nhập
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={status === 'loading'}
                  className="btn btn-primary w-full justify-center"
                >
                  {status === 'loading'
                    ? 'Đang xác nhận…'
                    : status === 'error'
                      ? 'Thử lại'
                      : 'Chính là tôi'}
                </button>
                <Link
                  href="/auth"
                  className="t-body-sm text-mute hover:text-ink transition-colors duration-150"
                >
                  Về đăng nhập
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh bg-surface-soft flex items-center justify-center">
          <p className="t-body-md text-mute">Đang tải…</p>
        </main>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
