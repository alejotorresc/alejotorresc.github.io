# Prompt para construcción del sitio web — Alejandro Torres

## Contexto del proyecto

Construye un sitio web personal para Alejandro Torres, director creativo enfocado en diseño estratégico, conceptualización de marca y construcción de universos de comunicación (no diseño gráfico decorativo). El sitio debe sentirse como una pieza editorial de lujo silencioso, no como un portafolio convencional. Referencias de tono: Koto Studio, Porto Rocha, Pentagram, Commission Studio. El objetivo es que cada visitante sienta que está habitando una publicación cuidadosamente diseñada, no navegando un catálogo de servicios.

## Principios de diseño no negociables

1. **Clásico, no tendencia.** Tipografía serif editorial para titulares y momentos de lectura, sans-serif neutra para UI y navegación. Nada de efectos de moda (glassmorphism, gradientes, neón, 3D decorativo).
2. **Silencioso, no ostentoso.** El lujo se percibe en el espacio en blanco, el ritmo tipográfico y la calidad de las imágenes, no en efectos visuales. Si un elemento no comunica nada, no existe.
3. **Editorial, no comercial.** No hay CTAs agresivos, no hay badges de "contrátame", no hay listas de servicios con precios. El lenguaje invita, no vende.
4. **Intencionalidad absoluta.** Cada elemento en pantalla debe justificar su existencia. Cero decoración. Si se puede quitar sin perder significado, se quita.
5. **Carga rápida y técnicamente limpia.** Sitio estático, sin frameworks pesados innecesarios, imágenes optimizadas, sin animaciones que sacrifiquen rendimiento por espectáculo.

## Especificaciones técnicas

- **Stack:** HTML semántico + CSS moderno (Grid/Flexbox) + JavaScript vanilla mínimo. Sin frameworks de CSS (no Bootstrap, no Tailwind salvo que se use de forma muy controlada). Si se requiere algo más robusto, usar Astro o Next.js estático, pero priorizar simplicidad.
- **Despliegue:** Compatible con GitHub Pages (sitio estático, multi-página, sin backend).
- **Performance:** Imágenes en formato WebP con fallback, lazy loading nativo, sin librerías de animación pesadas (evitar GSAP salvo que sea estrictamente necesario; preferir CSS transitions/animations nativas).
- **Responsive:** Mobile-first, pero el diseño debe lucir igual de intencional en desktop, donde vive la experiencia principal.
- **Accesibilidad:** Contraste AA mínimo, navegación por teclado funcional, alt text en todas las imágenes.

## Sistema tipográfico

- **Titulares y momentos editoriales:** una serif con carácter editorial (ejemplos de referencia: Canela, Tiempos, Reckless Neue, GT Sectra, o si se usa una de Google Fonts: Fraunces o Source Serif 4 en peso bajo).
- **UI, navegación, cuerpo de texto corto:** una sans neutra (ejemplos: Neue Montreal, GT Walsheim, o Inter/General Sans como alternativa de Google Fonts).
- Jerarquía tipográfica amplia: los titulares deben sentirse grandes y con espacio, nunca apretados.
- Interlineado generoso en bloques de texto largo (1.6–1.8).

## Paleta de color

- Base neutra: blanco roto o crema muy claro (no blanco puro, da frialdad clínica), negro suave o gris carbón para texto (no negro puro).
- Un solo color de acento, usado con extrema moderación (puede ser el verde de Aetnis #b7f122 si se quiere un guiño personal, o un tono tierra/sofisticado si se prefiere distancia total de proyectos de cliente).
- Sin gradientes. Sin sombras decorativas. Bordes finos (0.5–1px) si se necesitan separadores.

## Estructura de páginas

### 1. Home / Portada
- Pantalla completa con una imagen o video de un proyecto, sin texto superpuesto inicialmente.
- Al hacer scroll o tras unos segundos, aparece el nombre y una línea de posicionamiento breve (máximo 6-8 palabras).
- Sin CTA visible. Sin botón de "ver trabajo".
- Navegación minimalista fija o que aparece al hacer scroll: Trabajo / Pensamiento / Sobre mí.

### 2. Trabajo (listado)
- Galería editorial, no grid de tarjetas uniformes. Cada proyecto con peso visual propio, tamaños variables.
- Cada entrada: imagen grande, título del proyecto, una línea que describe el problema resuelto (no la disciplina aplicada).
- Transiciones suaves al pasar el cursor, sin exagerar.

### 3. Proyecto individual
- Estructura narrativa larga tipo artículo de revista: contexto, proceso, decisiones clave, resultado.
- Ritmo visual alternado: imágenes a sangre completa intercaladas con imágenes pequeñas rodeadas de espacio blanco.
- Cierre con enlace a "Siguiente proyecto" en lugar de regresar al índice.

### 4. Pensamiento
- Sección de artículos cortos o reflexiones sobre diseño, proceso y conceptualización de marca.
- Formato editorial simple: título, fecha, texto. Sin categorías ni tags visuales ruidosos.

### 5. Sobre mí
- Foto editorial en contexto (no foto corporativa de estudio).
- Texto en primera persona, tono reflexivo, sin lenguaje promocional.
- Filosofía de trabajo como párrafo central, no como lista de bullets.
- Trayectoria presentada como línea de tiempo visual discreta, no como CV.

### 6. Contacto
- Lenguaje de invitación a la conversación, no de conversión comercial.
- Email visible directamente. Enlace a LinkedIn.
- Sin formulario complejo de múltiples campos.

## Tono de copy (para los textos que ya existen y se integrarán)

El copy ya fue desarrollado y debe integrarse tal cual, respetando saltos de párrafo y énfasis. El tono general es reflexivo, conceptual, en primera persona, sin lenguaje de venta ni adjetivos vacíos como "apasionado" o "innovador".

## Qué evitar explícitamente

- Stock photos genéricas de "gente sonriendo en oficina".
- Iconografía decorativa sin función.
- Animaciones de scroll exageradas (parallax agresivo, zoom in/out constante).
- Testimonios de clientes.
- Contador de años de experiencia o número de proyectos.
- Botones con microcopy de venta ("¡Empecemos!", "Contrátame ahora").
- Cualquier elemento que pueda percibirse como plantilla genérica de portafolio.

## Entregable esperado

Sitio multi-página completo, listo para desplegar en GitHub Pages, con la estructura de archivos organizada por página/sección, CSS modular, y placeholders claramente marcados donde se deben insertar imágenes y copy final.
