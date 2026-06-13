export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const zipValidation = {
  maxSize: 50 * 1024 * 1024, // 50MB

  validate: (file: File): ValidationResult => {
    const errors: Record<string, string> = {};

    if (!file) {
      errors.file = 'Please select a ZIP file';
      return { isValid: false, errors };
    }

    if (file.type !== 'application/zip' && !file.name.endsWith('.zip')) {
      errors.file = 'File must be a ZIP archive';
    }

    if (file.size > zipValidation.maxSize) {
      errors.file = `File size must be less than 50MB (current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};

export const urlValidation = {
  validate: (url: string): ValidationResult => {
    const errors: Record<string, string> = {};

    if (!url.trim()) {
      errors.url = 'Please enter a submission link';
      return { isValid: false, errors };
    }

    try {
      new URL(url);
    } catch {
      errors.url = 'Please enter a valid URL (starting with http:// or https://)';
      return { isValid: false, errors };
    }

    const validDomains = ['github.com', 'drive.google.com', 'gitlab.com', 'bitbucket.org'];
    const isValidDomain = validDomains.some((domain) => url.includes(domain));

    if (!isValidDomain) {
      errors.url = 'URL must be from GitHub, Google Drive, GitLab, or Bitbucket';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
