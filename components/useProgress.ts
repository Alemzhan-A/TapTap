import { useState, useCallback } from 'react';

export const useProgress = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  const updateProgress = useCallback((newProgress: number, newStatus: string) => {
    console.log('Updating progress:', newProgress, newStatus);
    setProgress(newProgress);
    setStatus(newStatus);
  }, []);

  return { progress, status, updateProgress };
};