
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
async function convertImages() {
    console.log('Starting Ultra Think Protocol optimization...');

    const files = fs.readdirSync(publicDir);
    const images = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file));

    for (const file of images) {
        const inputPath = path.join(publicDir, file);
        const outputPath = path.join(publicDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

        // Skip if WebP already exists and is recent (optional, but we want to force re-optimize here)

        try {
            let pipeline = sharp(inputPath);
            const metadata = await pipeline.metadata();

            // Aggressive resize for specifically known large assets or generally large ones
            if (metadata.width > 1920) {
                console.log(`Resizing ${file} from ${metadata.width}px to 1920px`);
                pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
            }

            // Specific handling for person images if they are too huge, maybe cap at 1080 height?
            // "person-blue.png" detected as 1MB.
            if (file.includes('person') || file.includes('pexels')) {
                if (metadata.width > 1200) {
                    console.log(`Aggressively resizing content image ${file} to 1200px`);
                    pipeline = pipeline.resize(1200, null, { withoutEnlargement: true });
                }
            }

            await pipeline
                .webp({ quality: 75, effort: 6, smartSubsample: true })
                .toFile(outputPath);

            console.log(`✅ Optimized: ${file} -> ${path.basename(outputPath)}`);

            // Optional: Delete original if it's not a source file we want to keep? 
            // The instructions imply replacing usage, but deleting source might be destructive if not careful.
            // For this task, we will keep sources but we MUST update code to use .webp

        } catch (error) {
            console.error(`❌ Error converting ${file}:`, error);
        }
    }
}

convertImages();
