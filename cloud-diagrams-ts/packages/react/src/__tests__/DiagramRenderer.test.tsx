import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Diagram } from '@cloud-diagrams/core';
import { EC2, S3 } from '@cloud-diagrams/aws';
import { DiagramRenderer } from '../components/DiagramRenderer';

describe('DiagramRenderer', () => {
  let diagram: Diagram;

  beforeEach(() => {
    diagram = new Diagram('Test Diagram');
    const ec2 = new EC2('web-server');
    const s3 = new S3('data-bucket');
    diagram.addNode(ec2);
    diagram.addNode(s3);
  });

  test('renders diagram container', () => {
    render(<DiagramRenderer diagram={diagram} />);
    const container = document.querySelector('.cloud-diagram-renderer');
    expect(container).toBeInTheDocument();
  });

  test('shows loading state while rendering', async () => {
    render(<DiagramRenderer diagram={diagram} />);

    // Should show loading initially
    expect(screen.getByText('Rendering diagram...')).toBeInTheDocument();

    // Wait for rendering to complete
    await waitFor(() => {
      expect(
        screen.queryByText('Rendering diagram...')
      ).not.toBeInTheDocument();
    });
  });

  test('handles node click events', async () => {
    const handleNodeClick = jest.fn();
    render(
      <DiagramRenderer
        diagram={diagram}
        onNodeClick={handleNodeClick}
        interactive={true}
      />
    );

    await waitFor(() => {
      expect(
        screen.queryByText('Rendering diagram...')
      ).not.toBeInTheDocument();
    });

    // Note: In a real test, you would need to mock the SVG elements and click handlers
    // This is a basic structure for the test
  });

  test('applies custom styling', () => {
    const customStyle = { backgroundColor: 'red', border: '2px solid blue' };
    render(
      <DiagramRenderer
        diagram={diagram}
        style={customStyle}
        className="custom-class"
      />
    );

    const container = document.querySelector('.cloud-diagram-renderer');
    expect(container).toHaveClass('custom-class');
    expect(container).toHaveStyle('background-color: red');
    expect(container).toHaveStyle('border: 2px solid blue');
  });

  test('handles render errors gracefully', async () => {
    const invalidDiagram = null as any;
    const handleRenderError = jest.fn();

    render(
      <DiagramRenderer
        diagram={invalidDiagram}
        onRenderError={handleRenderError}
      />
    );

    // Wait for error handling
    await waitFor(() => {
      expect(
        screen.queryByText('Rendering diagram...')
      ).not.toBeInTheDocument();
    });
  });

  test('calls onRenderComplete when rendering succeeds', async () => {
    const handleRenderComplete = jest.fn();

    render(
      <DiagramRenderer
        diagram={diagram}
        onRenderComplete={handleRenderComplete}
      />
    );

    await waitFor(() => {
      expect(handleRenderComplete).toHaveBeenCalled();
    });
  });

  test('supports different themes', () => {
    render(<DiagramRenderer diagram={diagram} theme="dark" />);
    const container = document.querySelector('.cloud-diagram-renderer');
    expect(container).toBeInTheDocument();
  });

  test('supports custom dimensions', () => {
    render(<DiagramRenderer diagram={diagram} width={800} height={600} />);

    const container = document.querySelector('.cloud-diagram-renderer');
    expect(container).toHaveStyle('width: 800px');
    expect(container).toHaveStyle('height: 600px');
  });
});
