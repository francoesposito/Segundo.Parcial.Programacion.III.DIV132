/**
 * ========================================================================
 * LÓGICA DE LA ENCUESTA DE SATISFACCIÓN (survey.js)
 * ========================================================================
 * Propósito:
 * - Gestionar el formulario de calificación de experiencia del cliente en survey.html.
 * - Enviar los resultados al servidor y realizar una cuenta regresiva para reiniciar el kiosco.
 * 
 * Funciones y lógica esperadas:
 * - initSurveyForm(): Configurar la captura del evento submit del formulario.
 * - validateSurvey(): Asegurar que el usuario complete las calificaciones mínimas requeridas.
 * - submitSurvey(): Recopilar los datos del formulario, llamar a api.js para guardarla, y mostrar un mensaje de éxito.
 * - startCountdownRedirect(seconds): Iniciar una cuenta regresiva visual que redirija a index.html y limpie
 *   cualquier dato residual del localStorage para dejar el Kiosco listo para el siguiente cliente.
 */
