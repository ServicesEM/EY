(function () {
    // Ejecutar solo cuando el DOM esté completamente cargado
    function iniciarScript() {
        function limpiarTextoDuplicado(elemento) {
            if (!elemento || !elemento.textContent) return;
            const texto = elemento.textContent.trim();
            const partes = texto.split(/[\s\-–—]+/).map(p => p.trim()).filter(Boolean);
            const unicas = [...new Set(partes)];
            const nuevoTexto = unicas.join(' ');
            if (texto !== nuevoTexto) {
                console.log(`🧹 Corrigiendo texto: "${texto}" → "${nuevoTexto}"`);
                elemento.textContent = nuevoTexto;
            }
        }

        function buscarYLimpiar() {
            const objetivo = document.querySelector('.header-language-toggle span.flag-icon + span');
            if (objetivo) {
                limpiarTextoDuplicado(objetivo);
            }
        }

        let intentos = 0;
        const maxIntentos = 30;
        const intervalo = setInterval(() => {
            intentos++;
            buscarYLimpiar();
            if (document.querySelector('.header-language-toggle span.flag-icon + span') || intentos >= maxIntentos) {
                clearInterval(intervalo);
            }
        }, 500);

        const observer = new MutationObserver(() => {
            buscarYLimpiar();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        console.log("🟢 Script observador de duplicados cargado.");
    }

    // Esperar hasta que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarScript);
    } else {
        iniciarScript();
    }
})();
