
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ThemeToggle from '../components/ui/ThemeToggle';

describe('ThemeToggle Component', () => {
  const mockSetTheme = vi.fn();

  it('renders all three theme options', () => {
    render(<ThemeToggle theme="system" setTheme={mockSetTheme} />);

    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to system mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  it('calls setTheme when a button is clicked', () => {
    render(<ThemeToggle theme="system" setTheme={mockSetTheme} />);

    const darkButton = screen.getByLabelText('Switch to dark mode');
    fireEvent.click(darkButton);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('applies active styling to the selected theme', () => {
    const { rerender } = render(<ThemeToggle theme="light" setTheme={mockSetTheme} />);

    const lightBtn = screen.getByLabelText('Switch to light mode');
    const darkBtn = screen.getByLabelText('Switch to dark mode');

    // Check for active color class (text-amber-500 for light)
    expect(lightBtn.className).toContain('text-amber-500');
    expect(darkBtn.className).not.toContain('text-amber-500');

    // Rerender with dark theme
    rerender(<ThemeToggle theme="dark" setTheme={mockSetTheme} />);

    // Check for active color class (text-blue-400 for dark)
    expect(screen.getByLabelText('Switch to dark mode').className).toContain('text-blue-400');
  });

  it('renders in vertical mode when prop is passed', () => {
    const { container } = render(<ThemeToggle theme="system" setTheme={mockSetTheme} isVertical={true} />);
    // The container div should have flex-col
    expect(container.firstChild).toHaveClass('flex-col');
  });
});