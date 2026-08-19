# ARCHBIM Studio — sitio web

Sitio estático de una sola página. No necesita build ni dependencias (no hay `package.json`, no hay framework) — es HTML/CSS/JS puro, listo para servir tal cual.

## Estructura

```
index.html          la página completa (CSS y JS inline)
og-image.png         imagen para previsualizaciones al compartir el link (WhatsApp, Twitter, LinkedIn, etc.)
apple-touch-icon.png  ícono para "agregar a inicio" en iOS
icon-192.png / icon-512.png  íconos para Android / PWA
favicon-16.png / favicon-32.png  favicon de respaldo (el principal es un SVG inline en el propio HTML)
site.webmanifest      metadata para "agregar a pantalla de inicio"
robots.txt            indica a los buscadores que pueden indexar todo el sitio
sitemap.xml           mapa del sitio (una sola URL, es una landing de una página)
vercel.json           headers de seguridad y caché para el deploy en Vercel
```

## Desplegar en Vercel

**Opción A — desde la web (sin instalar nada):**
1. Entrá a [vercel.com/new](https://vercel.com/new).
2. Elegí "Deploy" y arrastrá esta carpeta completa (o subila a un repo de GitHub/GitLab primero y conectá el repo).
3. Vercel detecta que es un sitio estático automáticamente — no hace falta configurar ningún framework ni build command. Dejá todo en blanco y confirmá.
4. En un minuto vas a tener una URL tipo `archbim-studio.vercel.app`.

**Opción B — con la CLI de Vercel:**
```bash
npm i -g vercel
cd carpeta-del-sitio
vercel        # deploy de prueba
vercel --prod # deploy a producción
```

## Importante: actualizar el dominio real

Dejé `https://archbim-studio.vercel.app/` como dominio de referencia en varios lugares (para que las previsualizaciones y el SEO funcionen bien apenas se suba). Una vez que sepas la URL final — la que te da Vercel automáticamente, o un dominio propio que conectes — reemplazá ese texto en estos archivos:

- `index.html` — las etiquetas `og:url`, `og:image`, `twitter:image`, `canonical`, y la URL dentro del bloque `<script type="application/ld+json">`.
- `robots.txt` — la línea `Sitemap:`.
- `sitemap.xml` — la etiqueta `<loc>`.

Es un buscar-y-reemplazar del dominio en esos 3 archivos, nada más.

## Qué se optimizó para este deploy

- **Sin build ni dependencias**: Vercel lo sirve directo, sin configuración.
- **Imagen de preview social** (`og-image.png`) para que el link se vea bien al compartirlo por WhatsApp o redes, en vez de aparecer en blanco.
- **Íconos** para que el sitio se vea bien si alguien lo agrega a la pantalla de inicio del celular.
- **`robots.txt` + `sitemap.xml`** para que Google pueda indexar el sitio correctamente.
- **Headers de seguridad** (`vercel.json`): evita que el sitio se cargue dentro de un iframe ajeno (clickjacking), fuerza HTTPS en las políticas de referrer, y bloquea el sniffing de tipo de contenido.
- **Caché**: las imágenes se cachean por un año (no van a cambiar); el HTML se revalida siempre, así cualquier actualización futura se ve al instante sin esperar a que expire un caché viejo.
