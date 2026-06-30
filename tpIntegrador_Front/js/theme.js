/**
 * ========================================================================
 * CONTROLADOR DE TEMA CLARO / OSCURO (theme.js)
 * ========================================================================
 * Propósito:
 * - Proveer soporte de cambio de tema (claro/oscuro) de forma global en la aplicación.
 * - Mantener la preferencia del usuario persistida en localStorage.
 * 
 * Funciones y lógica esperadas:
 * - initTheme(): Verificar si hay una preferencia guardada en localStorage o sistema operativo,
 *   y aplicar la clase correspondiente (ej. 'dark-theme' o 'light-theme') al elemento HTML/body al cargar la página.
 * - toggleTheme(): Alternar la preferencia de tema y guardarla en localStorage.
 * - Configurar un escuchador de eventos para el botón de cambio de tema presente en el header de las páginas.
 */