'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { storageApi } from '@/services/api';
import type { RegistrationFormValues } from '../types';

interface Props {
  defaults: { fullName: string; email: string };
  onSubmit: (values: RegistrationFormValues) => void;
}

export function RegistrationForm({ defaults, onSubmit }: Props) {
  const [fullName, setFullName] = useState(defaults.fullName);
  const [email, setEmail] = useState(defaults.email);
  const [schoolChoice, setSchoolChoice] = useState<'FPT' | 'OTHER'>('FPT');
  const [schoolName, setSchoolName] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [note, setNote] = useState('');
  const [card, setCard] = useState<{ preview: string; file: File } | null>(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const needsCard = schoolChoice === 'OTHER';

  function selectCard(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Vui lòng chọn một file ảnh hợp lệ.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Ảnh thẻ không được vượt quá 5MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setError(''); setCard({ preview: reader.result as string, file }); };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    if (!studentCode.trim()) { setError('Vui lòng nhập mã số sinh viên.'); return; }
    if (needsCard && !schoolName.trim()) { setError('Vui lòng nhập tên trường của bạn.'); return; }
    if (needsCard && !card) { setError('Vui lòng tải ảnh thẻ sinh viên.'); return; }

    let photoStudentCardUrl: string | null = null;
    if (card) {
      try {
        setUploading(true);
        photoStudentCardUrl = await storageApi.upload(card.file);
      } catch {
        setUploading(false);
        setError('Không tải được ảnh thẻ. Vui lòng thử lại.');
        return;
      }
      setUploading(false);
    }

    onSubmit({
      fullName: fullName.trim(),
      email: email.trim(),
      schoolChoice,
      schoolName: needsCard ? schoolName.trim() : null,
      studentCode: studentCode.trim(),
      photoStudentCardUrl,
      note: note.trim() || null,
    });
  }

  const labelStyle = { fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--color-mute)' };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 max-w-[36rem]">
      {error && <p className="t-caption-sm" style={{ color: 'var(--color-error)', margin: 0 }}>{error}</p>}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Họ và tên</span>
        <input className="text-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Email</span>
        <input className="text-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Trường</span>
        <select
          className="text-input"
          value={schoolChoice}
          onChange={(e) => setSchoolChoice(e.target.value as 'FPT' | 'OTHER')}
        >
          <option value="FPT">FPT</option>
          <option value="OTHER">Khác</option>
        </select>
      </label>

      {needsCard && (
        <label className="flex flex-col gap-1.5">
          <span style={labelStyle}>Tên trường</span>
          <input className="text-input" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} placeholder="VD: Đại học Bách Khoa" />
        </label>
      )}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Mã số sinh viên</span>
        <input className="text-input" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} placeholder="VD: SE123456" />
      </label>

      {needsCard && (
        <div className="flex flex-col gap-1.5">
          <span style={labelStyle}>Ảnh thẻ sinh viên</span>
          {card ? (
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.preview} alt="Ảnh thẻ sinh viên" className="w-24 h-16 object-cover rounded-sm border border-hairline" />
              <button type="button" className="t-caption-sm font-bold" style={{ color: 'var(--color-error)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setCard(null)}>Xóa</button>
            </div>
          ) : (
            <button type="button" className="btn btn-secondary btn-sm w-fit" onClick={() => fileRef.current?.click()}>Tải ảnh thẻ</button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={selectCard} style={{ display: 'none' }} />
        </div>
      )}

      <label className="flex flex-col gap-1.5">
        <span style={labelStyle}>Ghi chú (tùy chọn)</span>
        <textarea className="text-input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
      </label>

      <button type="submit" className="btn btn-primary w-fit" disabled={uploading}>
        {uploading ? 'Đang tải ảnh…' : 'Gửi đăng ký'}
      </button>
    </form>
  );
}
