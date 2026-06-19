const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');
const SIZE_LIMIT_BYTES = 500 * 1024; // 500 KB

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        fileList.push({
          path: filePath,
          size: stat.size
        });
      }
    }
  }
  return fileList;
}

async function optimizeImage(imageInfo) {
  const { path: filePath, size: originalSize } = imageInfo;
  
  if (originalSize <= SIZE_LIMIT_BYTES) {
    console.log(`Skipping: ${path.relative(PUBLIC_DIR, filePath)} (${(originalSize / 1024).toFixed(1)} KB - below limit)`);
    return { saved: 0, optimized: false };
  }

  const relativePath = path.relative(PUBLIC_DIR, filePath);
  console.log(`Optimizing: ${relativePath} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

  try {
    const ext = path.extname(filePath).toLowerCase();
    const tempFilePath = filePath + '.tmp';
    
    // Read file into memory buffer to avoid file locking on Windows
    const fileBuffer = fs.readFileSync(filePath);
    
    // Load metadata to check width
    const image = sharp(fileBuffer);
    const metadata = await image.metadata();
    
    let pipeline = sharp(fileBuffer);
    
    // Resize if wider than 1920px
    if (metadata.width && metadata.width > 1920) {
      console.log(`  Resizing from ${metadata.width}px to 1920px`);
      pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
    }
    
    // Compress based on format
    if (ext === '.png') {
      pipeline = pipeline.png({ compressionLevel: 9, quality: 80 });
    } else {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true });
    }
    
    await pipeline.toFile(tempFilePath);
    
    const optimizedStat = fs.statSync(tempFilePath);
    const optimizedSize = optimizedStat.size;
    
    // Only replace if optimized size is smaller
    if (optimizedSize < originalSize) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempFilePath, filePath);
      const savings = originalSize - optimizedSize;
      console.log(`  ✓ Done! ${(originalSize / 1024 / 1024).toFixed(2)} MB ➔ ${(optimizedSize / 1024).toFixed(1)} KB (Saved: ${((savings / originalSize) * 100).toFixed(1)}%)`);
      return { saved: savings, optimized: true };
    } else {
      fs.unlinkSync(tempFilePath);
      console.log(`  ✗ Optimized size was not smaller. Keeping original.`);
      return { saved: 0, optimized: false };
    }
  } catch (error) {
    console.error(`  Error optimizing ${relativePath}:`, error.message);
    return { saved: 0, optimized: false };
  }
}

async function run() {
  console.log('Scanning for images in public folder...');
  const images = getFilesRecursively(PUBLIC_DIR);
  console.log(`Found ${images.length} images total.\n`);
  
  let totalSaved = 0;
  let optimizedCount = 0;
  
  for (const img of images) {
    const result = await optimizeImage(img);
    if (result.optimized) {
      totalSaved += result.saved;
      optimizedCount++;
    }
  }
  
  console.log('\n=========================================');
  console.log(`Optimization Completed!`);
  console.log(`Optimized: ${optimizedCount} images`);
  console.log(`Total Space Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
  console.log('=========================================');
}

run();
