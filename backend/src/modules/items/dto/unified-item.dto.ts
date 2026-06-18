/**
 * The unified DTO representing a merged OSPOS item + TileVista asset catalog entry.
 * Live pricing, stock, SKU, name, and category come from OSPOS.
 * Visual and 3D asset data come from the TileVista ItemAssetCatalog table.
 */
export class UnifiedItemDto {
  /** OSPOS item_id — the single source of truth identifier */
  itemId: number;
  /** Live item name from OSPOS */
  name: string;
  /** Category string from OSPOS (e.g. "Tiles", "Sanitaryware") */
  category: string;
  /** Item number / SKU from OSPOS */
  sku: string;
  /** Description from OSPOS */
  description: string | null;
  /** Live unit price from OSPOS */
  price: number;
  /** Live quantity at location 1 from OSPOS */
  quantity: number;

  // ── Asset Catalog Fields (from TileVista ItemAssetCatalog) ─────────────
  /** Full URL to the product image, or null if no image uploaded */
  imageUrl: string | null;
  /** Full URL to the GLB 3D model file, or null if not uploaded */
  glbUrl: string | null;
  /** 3D scale factors for the GLB model */
  scale: { x: number; y: number; z: number };
  /** Y-axis rotation for the GLB model in degrees */
  rotationY: number;
  /** Array of descriptive tags (e.g. ["floor", "matte", "600x600"]) */
  tags: string[];
  /** Material description (e.g. "Porcelain") */
  material: string | null;
  /** Surface finish (e.g. "Matte", "Glossy") */
  finish: string | null;
  /** Whether this item is enabled / visible on the public site */
  isEnabled: boolean;
  /** Admin notes for asset management */
  notes: string | null;
  /** True if a TileVista asset catalog entry exists for this OSPOS item */
  hasAssetEntry: boolean;
}

export class UpsertAssetDto {
  scaleX?: number;
  scaleY?: number;
  scaleZ?: number;
  rotationY?: number;
  tags?: string; // comma-separated
  material?: string;
  finish?: string;
  isEnabled?: boolean;
  notes?: string;
}
