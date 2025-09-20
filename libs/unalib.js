// modulo de ejemplo.

module.exports = {

    // Función para escapar HTML y prevenir XSS
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };
        return text.replace(/[&<>"'`=\/]/g, function (s) {
            return map[s];
        });
    },

    // Función para sanitizar URLs sin romper el formato
    sanitizeUrl: function(url) {
        // Solo escapar comillas para evitar romper atributos HTML
        return url.replace(/"/g, '&quot;').replace(/'/g, '&#039;');
    },

    // NUEVA: Función mejorada para remover scripts peligrosos
    removeScripts: function(text) {
        // Remover tags de script con cualquier variación
        text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        
        // Remover atributos de eventos JavaScript más completos
        text = text.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
        text = text.replace(/\s*on\w+\s*=\s*[^"'\s>]+/gi, '');
        
        // Remover URLs peligrosas
        text = text.replace(/javascript\s*:/gi, 'blocked:');
        text = text.replace(/vbscript\s*:/gi, 'blocked:');
        text = text.replace(/data\s*:\s*text\/html/gi, 'blocked:');
        
        // Remover tags peligrosos adicionales
        text = text.replace(/<\s*object\b[^>]*>/gi, '');
        text = text.replace(/<\s*embed\b[^>]*>/gi, '');
        text = text.replace(/<\s*applet\b[^>]*>/gi, '');
        text = text.replace(/<\s*meta\b[^>]*>/gi, '');
        text = text.replace(/<\s*link\b[^>]*>/gi, '');
        text = text.replace(/<\s*style\b[^>]*>/gi, '');
        
        return text;
    },

    // NUEVA: Función para detectar patrones de inyección XSS
    detectXSSPatterns: function(text) {
        var xssPatterns = [
            // Scripts básicos
            /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
            /javascript\s*:/gi,
            /vbscript\s*:/gi,
            
            // Eventos JavaScript
            /on\w+\s*=\s*["'][^"']*["']/gi,
            /on\w+\s*=\s*[^"'\s>]+/gi,
            
            // Inyecciones de expresiones
            /expression\s*\(/gi,
            /eval\s*\(/gi,
            
            // Data URLs peligrosas
            /data\s*:\s*text\/html/gi,
            
            // Inyecciones de CSS
            /style\s*=\s*["'][^"']*expression/gi,
            
            // Caracteres de escape maliciosos
            /&#x[0-9a-f]+;?/gi,
            /&#[0-9]+;?/gi
        ];

        for (var i = 0; i < xssPatterns.length; i++) {
            if (xssPatterns[i].test(text)) {
                return true; // Patrón peligroso encontrado
            }
        }
        return false; // No se encontraron patrones peligrosos
    },

    // NUEVA: Validación de longitud y formato
    validateInputLength: function(text, maxLength) {
        maxLength = maxLength || 1000;
        
        if (!text || typeof text !== 'string') {
            return false;
        }
        
        if (text.length > maxLength) {
            return false;
        }
        
        return true;
    },

    // NUEVA: Validación segura de URLs de imágenes
    validateImageUrl: function(url) {
        // Verificar longitud
        if (!this.validateInputLength(url, 500)) {
            return false;
        }
        
        // Verificar que no contenga patrones XSS
        if (this.detectXSSPatterns(url)) {
            return false;
        }
        
        // Verificar protocolo seguro
        if (!/^https?:\/\//i.test(url)) {
            return false;
        }
        
        // Verificar dominio válido (no localhost, no IPs privadas)
        if (/localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\./i.test(url)) {
            return false;
        }
        
        return this.is_valid_url_image(url);
    },

    // NUEVA: Validación segura de URLs de videos
    validateVideoUrl: function(url) {
        // Verificar longitud
        if (!this.validateInputLength(url, 500)) {
            return false;
        }
        
        // Verificar que no contenga patrones XSS
        if (this.detectXSSPatterns(url)) {
            return false;
        }
        
        // Solo permitir YouTube oficial
        if (!/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url)) {
            return false;
        }
        
        return this.is_valid_yt_video(url);
    },

    // logica que valida si un telefono esta correcto...
    is_valid_phone: function (phone) {
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/i;
  
      // validacion Regex
      try {
        isValid = re.test(phone);
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_url_image: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // expresion regular copiada de StackOverflow
      var re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg|bmp)/i;
  
      // validacion Regex
      try {
        isValid = re.test(url); // Corregido: era 'phone' ahora es 'url'
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    is_valid_yt_video: function (url) {
  
      // inicializacion lazy
      var isValid = false;
      // REGEX COMPLETAMENTE MEJORADO para manejar TODOS los formatos de YouTube
      var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/[\w-]{11}(?:\?.+)?|youtube\.com\/(?:embed\/|v\/|watch\?.*v=)[\w-]{11}(?:\S+)?)$/i;
  
      // validacion Regex
      try {
        isValid = re.test(url); // Corregido: era 'phone' ahora es 'url'
      } catch (e) {
        console.log(e);
      } finally {
          return isValid;
      }
      // fin del try-catch block
    },
  
    getYTVideoId: function(url){
      // Regex MEJORADO para extraer ID de CUALQUIER formato de YouTube
      var match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?.*v=))([\w-]{11})/);
      return match ? match[1] : null;
    },
  
    getEmbeddedCode: function (url){
      var id = this.getYTVideoId(url);
      if (!id) return url; // Si no se puede extraer ID, devolver URL original
      // Sanitizar solo el ID, no toda la URL
      id = id.replace(/[^a-zA-Z0-9_-]/g, ''); // Solo permitir caracteres válidos para YouTube ID
      var code = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+ '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      return code;
    },
  
    getImageTag: function(url){
      // Sanitizar la URL sin romper el formato
      url = this.sanitizeUrl(url);
      var tag = '<img src="'+url+'" style="max-height: 400px;max-width: 400px;">';
      return tag;
    },
  
    // FUNCIÓN PRINCIPAL MEJORADA con validaciones de seguridad
    validateMessage: function(msg){
      // Handle invalid input
      if (!msg || typeof msg !== 'string') {
        return JSON.stringify({ nombre: 'Anónimo', mensaje: '', color: '#000000' });
      }

      // Verificar longitud total del mensaje
      if (!this.validateInputLength(msg, 2000)) {
        console.log('Mensaje demasiado largo rechazado');
        return JSON.stringify({ nombre: 'Anónimo', mensaje: 'Mensaje demasiado largo', color: '#FF0000' });
      }

      try {
        var obj = JSON.parse(msg);
        
        // Validar estructura del objeto
        if (!obj.hasOwnProperty('nombre') || !obj.hasOwnProperty('mensaje')) {
          console.log('Formato de mensaje inválido');
          return JSON.stringify({ nombre: 'Anónimo', mensaje: 'Formato inválido', color: '#FF0000' });
        }
        
        // Validar tipos de datos
        if (typeof obj.nombre !== 'string' || typeof obj.mensaje !== 'string') {
          console.log('Tipos de datos inválidos');
          return JSON.stringify({ nombre: 'Anónimo', mensaje: 'Datos inválidos', color: '#FF0000' });
        }

        // Validar longitudes individuales
        if (!this.validateInputLength(obj.nombre, 50)) {
          console.log('Nombre demasiado largo');
          obj.nombre = 'Anónimo';
        }

        if (!this.validateInputLength(obj.mensaje, 1000)) {
          console.log('Mensaje demasiado largo');
          return JSON.stringify({ nombre: 'Anónimo', mensaje: 'Mensaje demasiado largo', color: '#FF0000' });
        }
        
        // Detectar patrones XSS en nombre
        if (this.detectXSSPatterns(obj.nombre)) {
          console.log('Intento de XSS detectado en nombre');
          obj.nombre = 'Usuario_Bloqueado';
        }

        // Sanitizar el nombre para prevenir XSS
        if (obj.nombre) {
          obj.nombre = this.escapeHtml(obj.nombre);
        } else {
          obj.nombre = 'Anónimo';
        }
        
        // Sanitizar el color (validar que sea un color hex válido)
        if (obj.color && /^#[0-9A-F]{6}$/i.test(obj.color)) {
          obj.color = obj.color; // Es válido, mantenerlo
        } else {
          obj.color = '#000000'; // Color por defecto
        }
        
        // VALIDACIÓN MEJORADA DEL MENSAJE
        if (obj.mensaje) {
          // Detectar patrones XSS en mensaje
          if (this.detectXSSPatterns(obj.mensaje)) {
            console.log('Intento de XSS detectado en mensaje');
            return JSON.stringify({ 
              nombre: obj.nombre, 
              mensaje: 'Contenido bloqueado por seguridad', 
              color: '#FF0000' 
            });
          }

          // Primero remover scripts peligrosos del URL original
          obj.mensaje = this.removeScripts(obj.mensaje);
          
          // Verificar si es una imagen con validación segura
          if(this.validateImageUrl(obj.mensaje)){
            console.log("Es una imagen válida!")
            obj.mensaje = this.getImageTag(obj.mensaje);
          }
          // Verificar si es un video con validación segura
          else if(this.validateVideoUrl(obj.mensaje)){
            console.log("Es un video válido!")
            obj.mensaje = this.getEmbeddedCode(obj.mensaje);
          }
          else{
            console.log("Es un texto!")
            // Para texto normal, escapar HTML para prevenir XSS
            obj.mensaje = this.escapeHtml(obj.mensaje);
          }
        } else {
          obj.mensaje = '';
        }
      
        return JSON.stringify(obj);
        
      } catch (e) {
        console.log('Error processing message:', e);
        // Si hay error al parsear, crear un objeto básico
        return JSON.stringify({ 
          nombre: 'Anónimo', 
          mensaje: 'Error de formato', 
          color: '#FF0000' 
        });
      }
    }
  
  
  
    
    
  
  // fin del modulo
  };