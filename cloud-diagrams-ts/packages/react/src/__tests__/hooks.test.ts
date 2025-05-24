import { renderHook, act } from '@testing-library/react';
import { Diagram } from '@cloud-diagrams/core';
import { EC2, S3 } from '@cloud-diagrams/aws';
import { useDiagram } from '../hooks/useDiagram';
import { useTheme } from '../hooks/useTheme';
import { useExport } from '../hooks/useExport';

describe('React Hooks', () => {
  describe('useDiagram', () => {
    test('initializes with provided diagram', () => {
      const initialDiagram = new Diagram('Test');
      const { result } = renderHook(() => useDiagram(initialDiagram));

      expect(result.current.diagram).toBe(initialDiagram);
      expect(result.current.isRendering).toBe(false);
      expect(result.current.isExporting).toBe(false);
    });

    test('can add and remove nodes', () => {
      const { result } = renderHook(() => useDiagram(new Diagram('Test')));
      const ec2 = new EC2('web-server');

      act(() => {
        result.current.addNode(ec2);
      });

      expect(result.current.diagram?.nodes).toContain(ec2);

      act(() => {
        result.current.removeNode(ec2.id);
      });

      expect(result.current.diagram?.nodes).not.toContain(ec2);
    });

    test('handles rendering', async () => {
      const diagram = new Diagram('Test');
      diagram.addNode(new EC2('web-server'));

      const { result } = renderHook(() => useDiagram(diagram));

      let renderPromise: Promise<string>;
      act(() => {
        renderPromise = result.current.render();
      });

      expect(result.current.isRendering).toBe(true);

      await act(async () => {
        await renderPromise;
      });

      expect(result.current.isRendering).toBe(false);
    });
  });

  describe('useTheme', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });

    test('initializes with default theme', () => {
      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe('default');
      expect(result.current.availableThemes).toContain('default');
      expect(result.current.availableThemes).toContain('dark');
      expect(result.current.availableThemes).toContain('light');
    });

    test('can set theme', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);
    });

    test('toggles theme correctly', () => {
      const { result } = renderHook(() => useTheme('light'));

      expect(result.current.isDark).toBe(false);

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('dark');
      expect(result.current.isDark).toBe(true);

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.isDark).toBe(false);
    });

    test('persists theme in localStorage', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      expect(localStorage.getItem('cloud-diagrams-theme')).toBe('"dark"');
    });
  });

  describe('useExport', () => {
    test('initializes correctly', () => {
      const { result } = renderHook(() => useExport());

      expect(result.current.isExporting).toBe(false);
      expect(result.current.exportError).toBe(null);
      expect(typeof result.current.exportDiagram).toBe('function');
      expect(typeof result.current.downloadDiagram).toBe('function');
    });

    test('handles SVG export', async () => {
      const diagram = new Diagram('Test');
      diagram.addNode(new EC2('web-server'));

      const { result } = renderHook(() => useExport());

      let exportPromise: Promise<string | Blob>;
      act(() => {
        exportPromise = result.current.exportDiagram(diagram, 'svg');
      });

      expect(result.current.isExporting).toBe(true);

      const exportResult = await act(async () => {
        return await exportPromise;
      });

      expect(result.current.isExporting).toBe(false);
      expect(typeof exportResult).toBe('string');
    });

    test('handles export errors', async () => {
      const invalidDiagram = null as any;
      const { result } = renderHook(() => useExport());

      await act(async () => {
        try {
          await result.current.exportDiagram(invalidDiagram, 'svg');
        } catch (error) {
          // Expected to throw
        }
      });

      expect(result.current.exportError).toBeInstanceOf(Error);
    });
  });
});
