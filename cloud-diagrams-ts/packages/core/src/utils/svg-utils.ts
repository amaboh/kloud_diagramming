/**
 * Utility functions for SVG manipulation
 */

export function svgToBlob(svgString: string): Blob {
  return new Blob([svgString], { type: 'image/svg+xml' });
}

export function svgToPng(svgString: string, width: number = 800, height: number = 600): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to convert canvas to blob'));
        }
      }, 'image/png');
    };
    
    img.onerror = () => reject(new Error('Failed to load SVG image'));
    
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    img.src = URL.createObjectURL(svgBlob);
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 