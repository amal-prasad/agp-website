import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react'

// Theme testing utilities
export const themeUtils = {
  // Set theme by manipulating HTML class
  setTheme: (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },

  // Get current theme state
  getCurrentTheme: () => {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  },

  // Mock prefers-color-scheme
  mockColorScheme: (scheme) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === `(prefers-color-scheme: ${scheme})`,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  },

  // Mock prefers-reduced-motion
  mockReducedMotion: (reduced) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)' ? reduced : false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  },

  // Wait for theme change to reflect
  waitForThemeChange: async (expectedTheme) => {
    await waitFor(() => {
      expect(themeUtils.getCurrentTheme()).toBe(expectedTheme)
    })
  },

  // Check if element has correct theme-specific styling
  expectElementThemeClass: (element, shouldBeVisibleInTheme) => {
    const currentTheme = themeUtils.getCurrentTheme()
    const isDarkModeOnly = element.classList.contains('dark-mode-only')
    const isLightModeOnly = element.classList.contains('light-mode-only')

    if (shouldBeVisibleInTheme === 'dark') {
      expect(isDarkModeOnly).toBe(true)
      expect(isLightModeOnly).toBe(false)
    } else if (shouldBeVisibleInTheme === 'light') {
      expect(isLightModeOnly).toBe(true)
      expect(isDarkModeOnly).toBe(false)
    }
  },

  // Get computed styles for an element
  getComputedStyles: (element) => {
    return window.getComputedStyle(element)
  },

  // Check background image for kraft texture
  expectKraftTexture: (element) => {
    const styles = themeUtils.getComputedStyles(element)
    expect(styles.backgroundImage).toContain('kraft-texture-v2.png')
  },

  // Check for gradient background in dark mode
  expectGradientBackground: (element) => {
    const styles = themeUtils.getComputedStyles(element)
    // Check for gradient-related properties
    const hasGradient = styles.background.includes('gradient') || 
                       styles.backgroundImage.includes('gradient') ||
                       element.classList.contains('bg-gradient-to-br')
    expect(hasGradient).toBe(true)
  },

  // Check for grid pattern
  expectGridPattern: (element) => {
    const styles = themeUtils.getComputedStyles(element)
    const hasGrid = styles.backgroundImage.includes('linear-gradient') &&
                   element.classList.contains('dark-mode-only')
    expect(hasGrid).toBe(true)
  }
}

// Custom render function with theme utilities
export const renderWithTheme = (component, { initialTheme = 'light' } = {}) => {
  themeUtils.setTheme(initialTheme)
  
  const utils = render(component)
  
  return {
    ...utils,
    // Theme-specific helper methods
    setTheme: themeUtils.setTheme,
    getCurrentTheme: themeUtils.getCurrentTheme,
    waitForThemeChange: themeUtils.waitForThemeChange,
    expectElementThemeClass: themeUtils.expectElementThemeClass,
  }
}

// Animation testing utilities
export const animationUtils = {
  // Check if animations are disabled
  expectAnimationsDisabled: () => {
    const styles = window.getComputedStyle(document.documentElement)
    expect(styles.animationDuration).toBe('0.01ms')
    expect(styles.transitionDuration).toBe('0.01ms')
  },

  // Check if animations are enabled
  expectAnimationsEnabled: () => {
    const styles = window.getComputedStyle(document.documentElement)
    expect(styles.animationDuration).not.toBe('0.01ms')
    expect(styles.transitionDuration).not.toBe('0.01ms')
  }
}