# Imágenes del proyecto

Generadas con la herramienta integrada Imagegen el 12 de octubre de 2026. No se han descargado fotografías de una empresa real ni se atribuyen estas imágenes a trabajos realizados. La web las identifica como ilustrativas; el pie explica el uso de IA. Las versiones finales se guardan dentro del repositorio, sin referencias a rutas del equipo del autor.

- `public/images/hero.webp`: fotografía ilustrativa principal de inspección con cámara.
- `public/images/inspeccion.webp`: versión optimizada de la misma imagen para la tarjeta y el servicio.
- `public/images/desatascos.webp`: fotografía ilustrativa de equipo de desatasco.
- `public/images/og.jpg`: recorte del visual principal para redes sociales, 1200 × 630.
- `public/icon.svg`: marca geométrica vectorial original, dibujada en código. No implica marca registrada.

## Prompt principal

Create a premium photorealistic editorial website hero photograph for a Spanish drain unblocking and pipe camera inspection service. Landscape wide composition 1536x1024. A technician shown from side/back, face not visible, wearing plain navy work clothing and black protective gloves, operating a professional compact sewer inspection camera reel beside an opened small outdoor inspection chamber in a bright Mediterranean residential courtyard. Coiled teal cable, realistic rugged inspection monitor with generic indistinct pipe image, natural limestone paving, white stucco wall, tiny soft focus olive greenery. Strong realistic material textures, late afternoon natural sunlight, calm competent premium corporate photography, restrained navy and teal palette, immaculate professional composition, eye-level medium shot with close foreground equipment. No text, no logos, no phone numbers, no badges, no certification marks, no watermarks. This is illustrative imagery, not a portrait of an actual business or proof of a real job.

## Prompt desatasco

Premium photorealistic corporate editorial photograph, wide landscape 1536x1024, professional drain unblocking equipment in a Mediterranean residential courtyard in Spain. Close shot of a technician's black protective gloved hands guiding a thick reinforced drain-cleaning hose into an open small inspection chamber at ground level. Plain navy work sleeve, no face visible. Professional compact hose reel slightly out of focus in background, natural warm limestone tiles, white plaster wall and sunlight. Technically plausible uncluttered scene, realistic metal and rubber textures, clean controlled professional work, navy and turquoise details, high-end architectural photography feel, no sewage splashes, no text or logo or badges or watermark, not a testimonial or actual company job photograph.

## Optimización

`scripts/prepare-images.mjs` permite volver a producir los archivos finales a partir de dos PNG proporcionados como argumentos. No es necesario ejecutarlo para compilar: los cuatro archivos finales ya están versionados. El código solo redimensiona y comprime los originales para servirlos de forma local.
