import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ error: 'Category is required' }, { status: 400 });
  }

  // Map our UI category IDs to folder names
  let folderName = category;
  if (category === 'dressing_table') folderName = 'dressingtable';
  if (category === 'runners_rugs') folderName = 'runners_and_small_rugs';
  if (category === 'tv_cabinet') folderName = 'tv';
  if (category === 'coffee_table') folderName = 'table';
  if (category === 'table') folderName = 'dinning';

  const dirPath = path.join(process.cwd(), 'public', 'images', 'furniture', folderName);
  
  if (!fs.existsSync(dirPath)) {
    return NextResponse.json({ items: [] });
  }

  try {
    const files = fs.readdirSync(dirPath);
    
    // Group files by base name
    const itemsMap = new Map<string, any>();
    
    files.forEach(file => {
      if (file.startsWith('.')) return;
      
      const ext = path.extname(file);
      // Handle double extensions like .jpg.avif if needed, but simple parse is usually fine
      const baseName = file.replace(/\.(webp|png|jpg|jpeg|avif|glb|gltf)$/i, '');
      
      if (!itemsMap.has(baseName)) {
        itemsMap.set(baseName, {
          id: `${category}_${baseName}`,
          name: baseName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          type: category,
          cost: 199.99, // default cost
          isWallMounted: category === 'mirror', // simple heuristic
          image: null,
          model: null
        });
      }
      
      const item = itemsMap.get(baseName);
      const urlPath = `/images/furniture/${folderName}/${file}`;
      
      if (['.glb', '.gltf'].includes(ext.toLowerCase())) {
        item.model = urlPath;
      } else if (['.webp', '.png', '.jpg', '.jpeg', '.avif'].includes(ext.toLowerCase()) || file.endsWith('.jpg.avif')) {
        item.image = urlPath;
      }
    });

    // Convert map to array and only include items that have at least an image or model
    const items = Array.from(itemsMap.values()).filter(i => i.image || i.model);
    
    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json({ error: 'Failed to read directory' }, { status: 500 });
  }
}
