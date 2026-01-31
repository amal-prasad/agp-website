
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Hero from '../components/sections/Hero';

describe('Hero Component', () => {
    it('renders the main headlines', () => {
        render(<Hero />);
        expect(screen.getByText(/PRECISION/i)).toBeInTheDocument();
        expect(screen.getByText(/IN PRINT/i)).toBeInTheDocument();
        expect(screen.getByText(/industrial-grade perfection/i)).toBeInTheDocument();
    });

    it('renders call-to-action buttons', () => {
        render(<Hero />);
        expect(screen.getByText(/Start Project/i)).toBeInTheDocument();
        expect(screen.getByText(/Our Work/i)).toBeInTheDocument();
    });

    it('contains the "Est. 2019" badge', () => {
        render(<Hero />);
        expect(screen.getByText(/Est. 2019/i)).toBeInTheDocument();
    });

    it('renders the floating delivery card with correct animation class', () => {
        render(<Hero />);
        // Find the card by text content
        const cardText = screen.getByText(/Order Delivered/i);
        const cardContainer = cardText.closest('.animate-float-infinite');

        expect(cardContainer).toBeInTheDocument();
        expect(cardContainer).toHaveClass('animate-float-infinite');
        expect(cardContainer.tagName).toBe('DIV');
    });
});
