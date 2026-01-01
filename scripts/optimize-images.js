#!/usr/bin/env node

/**
 * Image Optimization Script
 * Optimizes images using Sharp for WebP conversion and compression
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const optimizations = [
  {
    input: 'public/images/portfolio/porto-cuanx.png',
    output: 'public/images/portfolio/porto-cuanx.webp',
    quality: 82,
    maxSize: 200 * 1024, // 200 KB
    description: 'CuanX portfolio image (875 KB → <200 KB)'
  },
  {
    input: 'public/images/portfolio/porto-footballmoney.jpeg',
    output: 'public/images/portfolio/porto-footballmoney.webp',
    quality: 82,
    maxSize: 150 * 1024, // 150 KB
    description: 'Football Money portfolio image (284 KB → <150 KB)'
  },
  {
    input: 'public/images/profile/profile_rangga.jpeg',
    output: 'public/images/profile/profile_rangga.webp',
    quality: 78,
    maxSize: 80 * 1024, // 80 KB
    description: 'Rangga profile image (144 KB → <80 KB)'
  },
  {
    input: 'public/images/profile/profile_tiffany.jpeg',
    output: 'public/images/profile/profile_tiffany.webp',
    quality: 78,
    maxSize: 80 * 1024, // 80 KB
    description: 'Tiffany profile image (99 KB → <80 KB)'
  }
];

async function optimizeImage(config) {
  const inputPath = join(rootDir, config.input);
  const outputPath = join(rootDir, config.output);

  try {
    // Get original file size
    const originalStats = await stat(inputPath);
    const originalSize = originalStats.size;
    const originalSizeKB = (originalSize / 1024).toFixed(2);

    console.log(`\nOptimizing: ${config.description}`);
    console.log(`  Input: ${config.input} (${originalSizeKB} KB)`);

    // Optimize image
    let outputSize = 0;
    let quality = config.quality;

    // Try to hit target size by adjusting quality if needed
    do {
      await sharp(inputPath)
        .webp({ quality, effort: 6 })
        .toFile(outputPath);

      const outputStats = await stat(outputPath);
      outputSize = outputStats.size;
      const outputSizeKB = (outputSize / 1024).toFixed(2);

      if (outputSize <= config.maxSize) {
        const reduction = ((1 - outputSize / originalSize) * 100).toFixed(1);
        console.log(`  ✓ Output: ${config.output} (${outputSizeKB} KB, ${reduction}% reduction)`);
        console.log(`  Quality: ${quality}`);
        return { success: true, originalSize, outputSize, reduction };
      } else {
        quality -= 2;
        if (quality < 60) break; // Don't go below 60 quality
      }
    } while (outputSize > config.maxSize && quality >= 60);

    // If we couldn't hit target, still report results
    const outputStats = await stat(outputPath);
    outputSize = outputStats.size;
    const outputSizeKB = (outputSize / 1024).toFixed(2);
    const reduction = ((1 - outputSize / originalSize) * 100).toFixed(1);

    if (outputSize > config.maxSize) {
      console.log(`  ⚠ Output: ${config.output} (${outputSizeKB} KB, ${reduction}% reduction)`);
      console.log(`  ⚠ Warning: Target size not met, but optimized`);
    } else {
      console.log(`  ✓ Output: ${config.output} (${outputSizeKB} KB, ${reduction}% reduction)`);
    }

    return { success: true, originalSize, outputSize, reduction };
  } catch (error) {
    console.error(`  ✗ Error optimizing ${config.input}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('Starting image optimization...\n');
  console.log('Using Sharp for WebP conversion and compression\n');

  const results = [];
  for (const config of optimizations) {
    const result = await optimizeImage(config);
    results.push({ ...config, ...result });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Optimization Summary');
  console.log('='.repeat(60));

  let totalOriginal = 0;
  let totalOptimized = 0;

  results.forEach((result) => {
    if (result.success) {
      totalOriginal += result.originalSize;
      totalOptimized += result.outputSize;
      const status = result.outputSize <= result.maxSize ? '✓' : '⚠';
      console.log(`${status} ${result.description}`);
      console.log(`   ${(result.originalSize / 1024).toFixed(2)} KB → ${(result.outputSize / 1024).toFixed(2)} KB (${result.reduction}% reduction)`);
    } else {
      console.log(`✗ ${result.description} - FAILED: ${result.error}`);
    }
  });

  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log('\n' + '-'.repeat(60));
  console.log(`Total: ${(totalOriginal / 1024).toFixed(2)} KB → ${(totalOptimized / 1024).toFixed(2)} KB`);
  console.log(`Overall reduction: ${totalReduction}%`);
  console.log('='.repeat(60));

  console.log('\n✓ Image optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Update component imports to use .webp files');
  console.log('2. Add lazy loading attributes to images');
  console.log('3. Add responsive image srcset attributes');
}

main().catch(console.error);

