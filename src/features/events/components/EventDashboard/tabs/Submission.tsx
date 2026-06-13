'use client';

import React, { useState } from 'react';
import { useTeamSubmissions, useSubmitWork } from '@/features/events/hooks/useEvents';
import { zipValidation, urlValidation } from '@/features/events/utils/validationUtils';
import { Card } from '../Card';
import { Button } from '../Button';
import { Badge } from '../Badge';
import { FormSkeleton } from '../SkeletonLoaders';
import { Upload, Link as LinkIcon, AlertCircle } from 'lucide-react';

interface SubmissionTabProps {
  teamId: string;
  eventId: string;
}

export function SubmissionTab({ teamId, eventId }: SubmissionTabProps) {
  const { data: submissions, isLoading, error } = useTeamSubmissions(teamId);
  const submitMutation = useSubmitWork(teamId, eventId);

  const [submissionType] = useState<'zip' | 'url'>('zip');
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleZipSelect = (file: File | null) => {
    if (file) {
      const result = zipValidation.validate(file);
      if (result.isValid) {
        setZipFile(file);
        setValidationErrors({});
      } else {
        setValidationErrors(result.errors);
        setZipFile(null);
      }
    }
  };

  const handleZipDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) handleZipSelect(files[0]);
  };

  const handleUrlChange = (value: string) => {
    setUrlInput(value);
    if (value.trim()) {
      const result = urlValidation.validate(value);
      setValidationErrors(result.errors);
    } else {
      setValidationErrors({});
    }
  };

  const handleSubmit = async () => {
    if (submissionType === 'zip') {
      if (!zipFile) {
        setValidationErrors({ file: 'Please select a ZIP file' });
        return;
      }
      const formData = new FormData();
      formData.append('file', zipFile);
      await submitMutation.mutateAsync({ type: 'ZIP', content: formData });
    } else {
      const result = urlValidation.validate(urlInput);
      if (!result.isValid) {
        setValidationErrors(result.errors);
        return;
      }
      await submitMutation.mutateAsync({ type: 'URL', content: urlInput });
    }

    setZipFile(null);
    setUrlInput('');
    setValidationErrors({});
  };

  const getStatusBadge = (status: string) => {
    type BadgeVariant = 'primary' | 'warning' | 'error' | 'success' | 'default';
    const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
      submitted: { variant: 'primary', label: 'Submitted' },
      'pending-review': { variant: 'warning', label: 'Pending Review' },
      rejected: { variant: 'error', label: 'Rejected' },
      graded: { variant: 'success', label: 'Graded' },
    };
    const config = statusMap[status] || { variant: 'default', label: 'Unknown' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (error) {
    return (
      <div className="bg-error/10 border border-error rounded-sm p-6">
        <p className="t-body-md text-error font-bold">Failed to load submissions</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <FormSkeleton />
        <FormSkeleton />
      </div>
    );
  }

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
      <Card title="Submit for Event">
        <div className="space-y-4">
          {submissionType === 'zip' ? (
            <div
              onDrop={handleZipDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`border-2 border-dashed rounded-sm p-4 md:p-8 text-center cursor-pointer transition-colors duration-150 ${
                validationErrors.file
                  ? 'border-error bg-error/5'
                  : 'border-hairline bg-surface-soft hover:border-primary'
              }`}
            >
              <Upload size={24} className={`mx-auto mb-2 ${validationErrors.file ? 'text-error' : 'text-mute'}`} />
              <label className="block">
                <input
                  type="file"
                  accept=".zip"
                  onChange={(e) => handleZipSelect(e.target.files?.[0] || null)}
                  className="sr-only"
                  aria-label="Upload ZIP file"
                />
                <span className="t-body-md text-ink cursor-pointer">Drag ZIP file here or click to browse</span>
              </label>
              <p className="t-caption-sm text-mute mt-2">Max 50MB</p>
              {zipFile && <p className="t-body-sm text-primary mt-2 font-bold">✓ {zipFile.name}</p>}
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="urlInput" className="t-body-strong text-ink block text-sm md:text-base">
                Submission Link
              </label>
              <div className="relative">
                <input
                  id="urlInput"
                  type="url"
                  placeholder="https://github.com/... or https://drive.google.com/..."
                  value={urlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-sm text-body-md focus:outline-none transition-colors duration-150 ${
                    validationErrors.url ? 'border-error focus:border-error' : 'border-hairline focus:border-primary'
                  }`}
                  aria-invalid={!!validationErrors.url}
                  aria-describedby={validationErrors.url ? 'url-error' : undefined}
                />
                <LinkIcon size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-mute" />
              </div>
              <p className="t-caption-sm text-mute">Paste GitHub, Drive, or similar link</p>
            </div>
          )}

          {validationErrors.file && (
            <div className="flex gap-2 bg-error/10 border border-error rounded-sm p-3">
              <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
              <p id="file-error" className="t-body-sm text-error">{validationErrors.file}</p>
            </div>
          )}

          {validationErrors.url && (
            <div className="flex gap-2 bg-error/10 border border-error rounded-sm p-3">
              <AlertCircle size={16} className="text-error flex-shrink-0 mt-0.5" />
              <p id="url-error" className="t-body-sm text-error">{validationErrors.url}</p>
            </div>
          )}

          <Button
            onClick={handleSubmit}
            isLoading={submitMutation.isPending}
            disabled={!zipFile && !urlInput}
            className="w-full"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </Card>

      <Card title="Submission History">
        <div className="space-y-3">
          {!isLoading && submissions && submissions.length === 0 ? (
            <div className="text-center py-8">
              <Upload size={32} className="text-mute mx-auto mb-2 opacity-50" />
              <p className="t-body-md text-mute">No submissions yet</p>
            </div>
          ) : (
            submissions?.map((sub) => (
              <div key={sub.id} className="pb-3 border-b border-hairline last:border-b-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="t-caption-sm text-mute">{formatDate(sub.submitDate)}</p>
                  {getStatusBadge(sub.status)}
                </div>
                <p className="t-body-sm text-ink font-bold">{sub.type} Submission</p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
