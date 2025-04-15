export interface VSCodeStatus {
  isActive: boolean;
  currentProject: string;
  currentFile: string;
  currentLine: number;
  lastActive: string;
}

export const getVSCodeStatus = (): VSCodeStatus => {
  if (typeof window === 'undefined') {
    return {
      isActive: false,
      currentProject: 'nextjstry',
      currentFile: '',
      currentLine: 0,
      lastActive: new Date().toISOString()
    };
  }

  const stored = localStorage.getItem('vscode-status');
  if (!stored) return {
    isActive: false,
    currentProject: 'nextjstry',
    currentFile: '',
    currentLine: 0,
    lastActive: new Date().toISOString()
  };

  return JSON.parse(stored);
};

export const updateVSCodeStatus = (status: Partial<VSCodeStatus>) => {
  const current = getVSCodeStatus();
  const updated = {
    ...current,
    ...status,
    lastActive: new Date().toISOString()
  };
  localStorage.setItem('vscode-status', JSON.stringify(updated));
  return updated;
};
