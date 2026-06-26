import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

if (!content.includes("slug: 'emaar-properties'")) {
    content = content.replace(/id:\s*'([a-zA-Z0-9\-]+)',\s*\n\s*name:\s*'([^']+)'/g, (match, id, name) => {
        return `${match},\n    slug: '${slugify(name)}',\n    seoTitle: '${name} | Dubai Real Estate',\n    seoDescription: 'Explore signature projects and investment opportunities by ${name}.'`;
    });
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully injected slugs and SEO metadata fields into data.ts');
