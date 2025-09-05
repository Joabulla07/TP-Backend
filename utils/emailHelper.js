import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEmailTemplate(templateName, variables = {}) {
    try {
        const templatePath = path.join(__dirname, `../templates/${templateName}.html`);
        let template = await fs.readFile(templatePath, 'utf-8');

        // Reemplazar las variables en la plantilla
        Object.keys(variables).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            template = template.replace(regex, variables[key]);
        });

        return template;
    } catch (error) {
        console.error('Error al cargar la plantilla de correo:', error);
        throw error;
    }
}