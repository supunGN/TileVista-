import { config } from '../../../../config';

/**
 * Interface representing the raw, high-precision stock payload returned by the OSPOS PHP controller.
 */
export interface IOsposRawStock {
  item_id: number;
  quantity_available: string | number;
}

/**
 * Data Transfer Object (DTO) for OSPOS live stock level responses.
 * Cleans, sanitizes, and normalizes raw string representations of high-precision decimals 
 * (e.g., "250.0000") into clean TypeScript primitives.
 */
export class OsposStockResponseDto {
  /**
   * Cleaned numeric product ID.
   */
  itemId: number;

  /**
   * Normalized numeric stock count.
   */
  stock: number;

  /**
   * Dynamically calculated indicator specifying if stock level falls below safety threshold.
   */
  isLowStock: boolean;

  constructor(raw: IOsposRawStock, threshold: number = config.lowStockThreshold) {
    this.itemId = Number(raw.item_id);
    
    // Safely handle both numeric types and high-precision string decimals (e.g., "250.0000")
    this.stock = typeof raw.quantity_available === 'number'
      ? raw.quantity_available
      : parseFloat(raw.quantity_available || '0');

    // Calculate low stock condition dynamically based on the application's configuration
    this.isLowStock = this.stock < threshold;
  }
}
