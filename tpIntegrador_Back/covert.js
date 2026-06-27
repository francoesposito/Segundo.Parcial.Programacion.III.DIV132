import fs from 'fs';
import path from 'path';
function convertFiles(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            convertFiles(filePath);
        } else if (file.endsWith('.ejs') || file.endsWith('.js')) {
            const buffer = fs.readFileSync(filePath);
            const isUtf16Le = buffer[0] === 0xFF && buffer[1] === 0xFE;
            if (isUtf16Le) {
                const content = buffer.toString('utf16le');
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Convertido a UTF-8: ${file}`);
            }
        }
    }
}
try {
    convertFiles('./src');
    console.log('¡Conversión finalizada con éxito!');
} catch (error) {
    console.error('Error al convertir:', error.message);
}