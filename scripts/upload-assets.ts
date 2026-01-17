import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'set' : 'MISSING');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'set' : 'MISSING');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadFile(localPath: string, storagePath: string, contentType: string) {
  console.log(`Uploading ${localPath} to ${storagePath}...`);

  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await supabase.storage
    .from('assets')
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    console.error(`Error uploading ${localPath}:`, error.message);
    return false;
  }

  console.log(`Successfully uploaded ${localPath}`);
  console.log(`Public URL: ${supabaseUrl}/storage/v1/object/public/assets/${storagePath}`);
  return true;
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');

  // Upload profile image
  const imagePath = path.join(projectRoot, 'ido mosseri.jpg');
  if (fs.existsSync(imagePath)) {
    await uploadFile(imagePath, 'profile-image.jpg', 'image/jpeg');
  } else {
    console.error(`Profile image not found at: ${imagePath}`);
  }

  // Upload CV PDF
  const cvPath = path.join(projectRoot, 'Ido Mosseri - CV.pdf');
  if (fs.existsSync(cvPath)) {
    await uploadFile(cvPath, 'Ido-Mosseri-CV.pdf', 'application/pdf');
  } else {
    console.error(`CV not found at: ${cvPath}`);
  }

  console.log('\nDone! Assets uploaded to Supabase storage.');
}

main().catch(console.error);
