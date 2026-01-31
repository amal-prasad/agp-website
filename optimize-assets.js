
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const filesToConvert = ['kraft-texture-v2.png'];

async function convertImages() {
    console.log('Starting image conversion...');

    for (const file of filesToConvert) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace('.png', '.webp'));

        if (fs.existsSync(inputPath)) {
            try {
                await sharp(inputPath)
                    .webp({ quality: 80, effort: 6 }) // High effort for best compression
                    .toFile(outputPath);
                console.log(`✅ Converted: ${file} -> ${path.basename(outputPath)}`);
            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error);
            }
        } else {
            console.warn(`⚠️ Source file not found: ${file}`);
        }
    }
}

convertImages();
