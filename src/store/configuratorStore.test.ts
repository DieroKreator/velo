import { describe, it, expect } from 'vitest';
import {
  calculateTotalPrice,
  calculateInstallment,
  formatPrice,
  CarConfiguration
} from './configuratorStore';

describe('configuratorStore', () => {
  describe('calculateTotalPrice', () => {
    it('should calculate base price correctly with default configuration', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: []
      };
      // Base price is 40000
      expect(calculateTotalPrice(config)).toBe(40000);
    });

    it('should add sport wheels price correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: []
      };
      // Base price 40000 + 2000 (sport wheels) = 42000
      expect(calculateTotalPrice(config)).toBe(42000);
    });

    it('should add optional features prices correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'aero',
        optionals: ['precision-park', 'flux-capacitor']
      };
      // Base price 40000 + 5500 (precision-park) + 5000 (flux-capacitor) = 50500
      expect(calculateTotalPrice(config)).toBe(50500);
    });

    it('should add both sport wheels and optional features correctly', () => {
      const config: CarConfiguration = {
        exteriorColor: 'glacier-blue',
        interiorColor: 'carbon-black',
        wheelType: 'sport',
        optionals: ['precision-park']
      };
      // Base price 40000 + 2000 + 5500 = 47500
      expect(calculateTotalPrice(config)).toBe(47500);
    });
  });

  describe('calculateInstallment', () => {
    it('should calculate 12-month installment with 2% monthly interest correctly', () => {
      const total = 40000;
      // Formula matches 3782.38 based on the rounding logic
      const installment = calculateInstallment(total);
      expect(installment).toBe(3782.38);
    });
  });

  describe('formatPrice', () => {
    it('should format a number as BRL currency', () => {
      const price = 40000;
      const formatted = formatPrice(price);
      // Remove possible non-breaking spaces for a reliable test match
      const sanitized = formatted.replace(/\u00a0/g, ' ');
      expect(sanitized).toMatch(/R\$\s*40\.000,00/);
    });
  });
});
