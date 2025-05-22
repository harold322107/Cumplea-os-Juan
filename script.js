// Función para ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar mensaje de cumpleaños con animación
    setTimeout(() => {
        document.querySelector('.title').style.opacity = 1;
    }, 500);

    // Crear confeti al cargar la página
    createConfetti();
    
    // Crear globos flotantes
    createBalloons();
    
    // Mostrar regalo automáticamente
    showGift();
    
    // Configurar reproductor de música
    setupMusicPlayer();
    
    // Crear visualizador de audio
    createAudioVisualizer();
    
    // Crear chispitas brillantes en el fondo
    createSparkles();
});

// Función para crear chispitas brillantes en el fondo
function createSparkles() {
    // Crear contenedor para las chispitas si no existe
    let sparklesContainer = document.getElementById('sparkles-container');
    if (!sparklesContainer) {
        sparklesContainer = document.createElement('div');
        sparklesContainer.id = 'sparkles-container';
        sparklesContainer.style.position = 'fixed';
        sparklesContainer.style.top = '0';
        sparklesContainer.style.left = '0';
        sparklesContainer.style.width = '100%';
        sparklesContainer.style.height = '100%';
        sparklesContainer.style.pointerEvents = 'none';
        sparklesContainer.style.zIndex = '1';
        document.body.appendChild(sparklesContainer);
    }
    
    // Crear chispitas iniciales
    for (let i = 0; i < 50; i++) {
        createSparkle(sparklesContainer);
    }
    
    // Crear nuevas chispitas periódicamente
    setInterval(() => {
        createSparkle(sparklesContainer);
    }, 300);
}

// Función para crear una chispita individual
function createSparkle(container) {
    const sparkle = document.createElement('div');
    
    // Estilos de la chispita
    sparkle.style.position = 'absolute';
    sparkle.style.width = Math.random() * 4 + 2 + 'px';
    sparkle.style.height = sparkle.style.width;
    sparkle.style.borderRadius = '50%';
    
    // Colores brillantes para las chispitas
    const hue = Math.floor(Math.random() * 360);
    sparkle.style.backgroundColor = `hsl(${hue}, 100%, 70%)`;
    sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px hsl(${hue}, 100%, 75%)`;
    
    // Posición aleatoria en la pantalla
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    
    // Opacidad y animación
    sparkle.style.opacity = Math.random() * 0.7 + 0.3;
    
    // Añadir al contenedor
    container.appendChild(sparkle);
    
    // Animación de parpadeo
    const duration = Math.random() * 3 + 2;
    sparkle.animate([
        { opacity: 0, transform: 'scale(0.5)' },
        { opacity: sparkle.style.opacity, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.5)' }
    ], {
        duration: duration * 1000,
        easing: 'ease-in-out'
    });
    
    // Eliminar la chispita después de la animación
    setTimeout(() => {
        sparkle.remove();
    }, duration * 1000);
}

// Función para crear un visualizador de audio simple
function createAudioVisualizer() {
    const audio = document.getElementById('birthday-song');
    const musicPlayer = document.querySelector('.music-player');
    
    // Crear contenedor para el visualizador
    const visualizer = document.createElement('div');
    visualizer.className = 'audio-visualizer';
    visualizer.style.display = 'flex';
    visualizer.style.justifyContent = 'center';
    visualizer.style.alignItems = 'flex-end';
    visualizer.style.height = '30px';
    visualizer.style.margin = '10px 0';
    visualizer.style.opacity = '0';
    visualizer.style.transition = 'opacity 0.5s ease';
    
    // Crear barras del visualizador
    for (let i = 0; i < 20; i++) {
        const bar = document.createElement('div');
        bar.className = 'visualizer-bar';
        bar.style.width = '4px';
        bar.style.marginRight = '3px';
        bar.style.background = '#ff4081';
        bar.style.height = '5px';
        bar.style.transition = 'height 0.1s ease';
        visualizer.appendChild(bar);
    }
    
    // Insertar visualizador antes del control de volumen
    const volumeControl = musicPlayer.querySelector('.volume-control');
    musicPlayer.insertBefore(visualizer, volumeControl);
    
    // Animar barras cuando la música está sonando
    audio.addEventListener('play', function() {
        visualizer.style.opacity = '1';
        animateVisualizer();
    });
    
    audio.addEventListener('pause', function() {
        visualizer.style.opacity = '0';
    });
    
    function animateVisualizer() {
        if (!audio.paused) {
            const bars = visualizer.querySelectorAll('.visualizer-bar');
            bars.forEach(bar => {
                const height = Math.floor(Math.random() * 25) + 5;
                bar.style.height = height + 'px';
                
                // Cambiar color según altura
                if (height < 10) {
                    bar.style.background = '#ff9a9e';
                } else if (height < 20) {
                    bar.style.background = '#ff4081';
                } else {
                    bar.style.background = '#9c27b0';
                }
            });
            
            requestAnimationFrame(animateVisualizer);
        }
    }
}

// Función para crear confeti
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#ff4081', '#3f51b5', '#ffeb3b', '#4caf50', '#ff9800'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'absolute';
        confetti.style.top = '-50px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() + 0.5;
        
        // Animación de caída
        confetti.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear infinite`;
        confetti.style.animationDelay = Math.random() * 5 + 's';
        
        confettiContainer.appendChild(confetti);
    }
}

// Función para crear globos flotantes
function createBalloons() {
    const balloonsContainer = document.getElementById('balloons-container');
    const colors = ['#ff4081', '#3f51b5', '#ffeb3b', '#4caf50', '#ff9800', '#e91e63', '#2196f3'];
    
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.bottom = Math.random() * 20 + 'vh';
        balloon.style.animationDuration = Math.random() * 10 + 10 + 's';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        balloon.style.cursor = 'pointer'; // Añadir cursor pointer para indicar que es clickeable
        
        // Añadir cuerda al globo
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '1px';
        string.style.height = '100px';
        string.style.backgroundColor = 'rgba(0,0,0,0.2)';
        string.style.bottom = '-100px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';
        
        balloon.appendChild(string);
        balloonsContainer.appendChild(balloon);
        
        // Añadir evento de clic para reventar el globo
        balloon.addEventListener('click', function(e) {
            popBalloon(this, e.clientX, e.clientY);
        });
    }
}

// Función para crear muchos globos al hacer clic en el regalo
function createManyBalloons() {
    const balloonsContainer = document.getElementById('balloons-container');
    const colors = ['#ff4081', '#3f51b5', '#ffeb3b', '#4caf50', '#ff9800', '#e91e63', '#2196f3'];
    
    // Limpiar globos existentes
    balloonsContainer.innerHTML = '';
    
    // Crear muchos globos nuevos
    for (let i = 0; i < 50; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.bottom = '-50px';
        balloon.style.animationDuration = Math.random() * 5 + 5 + 's';
        balloon.style.animationDelay = Math.random() * 2 + 's';
        balloon.style.cursor = 'pointer'; // Añadir cursor pointer para indicar que es clickeable
        
        // Añadir cuerda al globo
        const string = document.createElement('div');
        string.style.position = 'absolute';
        string.style.width = '1px';
        string.style.height = '100px';
        string.style.backgroundColor = 'rgba(0,0,0,0.2)';
        string.style.bottom = '-100px';
        string.style.left = '50%';
        string.style.transform = 'translateX(-50%)';
        
        balloon.appendChild(string);
        balloonsContainer.appendChild(balloon);
        
        // Añadir evento de clic para reventar el globo
        balloon.addEventListener('click', function(e) {
            popBalloon(this, e.clientX, e.clientY);
        });
    }
}

// Función para reventar un globo cuando se hace clic en él
function popBalloon(balloon, x, y) {
    // Obtener el color del globo para las partículas
    const balloonColor = balloon.style.backgroundColor;
    
    // Crear efecto de explosión
    createBalloonExplosion(x, y, balloonColor);
    
    // Crear chispitas adicionales en el lugar de la explosión
    createExplosionSparkles(x, y, balloonColor);
    
    // Reproducir sonido de explosión (opcional)
    playPopSound();
    
    // Eliminar el globo con una pequeña animación
    balloon.style.transition = 'transform 0.1s, opacity 0.1s';
    balloon.style.transform = 'scale(1.5)';
    balloon.style.opacity = '0';
    
    // Eliminar el globo del DOM después de la animación
    setTimeout(() => {
        balloon.remove();
    }, 100);
}

// Función para crear el efecto de explosión del globo
function createBalloonExplosion(x, y, color) {
    // Crear contenedor para las partículas si no existe
    let explosionContainer = document.getElementById('explosion-container');
    if (!explosionContainer) {
        explosionContainer = document.createElement('div');
        explosionContainer.id = 'explosion-container';
        explosionContainer.style.position = 'fixed';
        explosionContainer.style.top = '0';
        explosionContainer.style.left = '0';
        explosionContainer.style.width = '100%';
        explosionContainer.style.height = '100%';
        explosionContainer.style.pointerEvents = 'none';
        explosionContainer.style.zIndex = '2';
        document.body.appendChild(explosionContainer);
    }
    
    // Crear partículas de explosión
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        
        // Estilos de la partícula
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 8 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        
        // Añadir al contenedor
        explosionContainer.appendChild(particle);
        
        // Animación de explosión
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1 + 0.5;
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)'
        });
        
        // Eliminar la partícula después de la animación
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

// Función para crear chispitas adicionales en el lugar de la explosión
function createExplosionSparkles(x, y, color) {
    // Obtener el contenedor de chispitas
    let sparklesContainer = document.getElementById('sparkles-container');
    
    // Crear chispitas en el lugar de la explosión
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        
        // Estilos de la chispita
        sparkle.style.position = 'absolute';
        sparkle.style.width = Math.random() * 4 + 2 + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.borderRadius = '50%';
        
        // Usar color del globo con variación
        const hue = Math.floor(Math.random() * 30) - 15; // Variación de ±15 en el tono
        sparkle.style.backgroundColor = color;
        sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}`;
        
        // Posición cerca del punto de explosión
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';
        
        // Opacidad y animación
        sparkle.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Añadir al contenedor
        sparklesContainer.appendChild(sparkle);
        
        // Animación de parpadeo
        const duration = Math.random() * 2 + 1;
        sparkle.animate([
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: sparkle.style.opacity, transform: 'scale(1)' },
            { opacity: 0, transform: 'scale(0.5)' }
        ], {
            duration: duration * 1000,
            easing: 'ease-in-out'
        });
        
        // Eliminar la chispita después de la animación
        setTimeout(() => {
            sparkle.remove();
        }, duration * 1000);
    }
}

// Función para reproducir sonido de explosión
function playPopSound() {
    // Crear elemento de audio para el sonido de pop
    const popSound = new Audio();
    popSound.volume = 0.2; // Volumen bajo para no molestar
    
    // Intentar cargar diferentes formatos de sonido para compatibilidad
    try {
        popSound.src = 'https://assets.mixkit.co/sfx/preview/mixkit-balloon-pop-with-delay-2357.mp3';
        popSound.play().catch(e => console.log('No se pudo reproducir el sonido de pop:', e));
    } catch (e) {
        console.log('Error al crear sonido de pop:', e);
    }
}

// Función para mostrar el regalo automáticamente
function showGift() {
    const giftBox = document.querySelector('.gift-box');
    const giftLid = document.querySelector('.gift-lid');
    const birthdaySong = document.getElementById('birthday-song');
    
    // Preparar el audio para reproducción automática
    birthdaySong.volume = 0.7; // Volumen al 70%
    birthdaySong.loop = true; // Reproducir en bucle
    
    // Animar la caja de regalo
    setTimeout(() => {
        giftLid.style.transform = 'translateY(-50px) rotateX(60deg)';
        
        // Mostrar fuegos artificiales
        setTimeout(() => {
            createFireworks();
        }, 1000);
    }, 1500);
    
    // Hacer que el regalo sea clickeable
    giftBox.style.cursor = 'pointer';
    giftBox.addEventListener('click', function() {
        // Mostrar mensaje de feliz cumpleaños
        const message = document.createElement('div');
        message.className = 'birthday-message';
        message.textContent = '¡FELIZ CUMPLEAÑOS JUAN!';
        message.style.display = 'block'; // Aseguramos que el mensaje sea visible
        document.querySelector('.container').appendChild(message);
        
        // Reproducir música de cumpleaños automáticamente con efecto de fade in
        birthdaySong.currentTime = 0; // Reiniciar la canción desde el principio
        birthdaySong.volume = 0; // Comenzar con volumen 0
        
        // Intentar reproducir con manejo de promesa (para navegadores modernos)
        const playPromise = birthdaySong.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Reproducción iniciada con éxito
                // Efecto de fade in para el audio
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.7) {
                        volume += 0.1;
                        birthdaySong.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }).catch(error => {
                console.error('Error al reproducir audio en el regalo:', error);
                // Intentar reproducir después de interacción del usuario
                alert('Haz clic en OK para activar la música de cumpleaños');
                birthdaySong.play().then(() => {
                    // Efecto de fade in para el audio después de la interacción
                    let volume = 0;
                    const fadeIn = setInterval(() => {
                        if (volume < 0.7) {
                            volume += 0.1;
                            birthdaySong.volume = volume;
                        } else {
                            clearInterval(fadeIn);
                        }
                    }, 100);
                });
            });
        }
        
        // Actualizar el botón de música
        const playButton = document.getElementById('play-music');
        playButton.textContent = 'Pausar Música';
        playButton.style.backgroundColor = '#9c27b0';
        
        // Crear muchos globos al hacer clic
        createManyBalloons();
        
        // Mostrar el oso después de que aparezca el mensaje de feliz cumpleaños
        setTimeout(() => {
            showTeddyBear();
        }, 3000); // Esperar 3 segundos después del mensaje
    });
}

// Función para crear fuegos artificiales
function createFireworks() {
    const fireworks = document.querySelector('.fireworks');
    fireworks.style.opacity = 1;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = getRandomColor();
        particle.style.top = '50%';
        particle.style.left = '50%';
        
        // Animación de explosión
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const duration = Math.random() * 1 + 0.5;
        
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = `all ${duration}s ease-out`;
        
        fireworks.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            particle.style.opacity = 0;
        }, 10);
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

// Función para configurar el reproductor de música
function setupMusicPlayer() {
    const playButton = document.getElementById('play-music');
    const audio = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');
    
    // Verificar si el audio está disponible y cargar una alternativa si es necesario
    audio.addEventListener('error', function(e) {
        console.error('Error al cargar el audio:', e);
        // Intentar con una URL alternativa si la original falla
        audio.src = 'https://audio-previews.elements.envatousercontent.com/files/272863517/preview.mp3';
        // Intentar cargar de nuevo
        audio.load();
    });
    
    // Añadir controles visuales mejorados
    playButton.innerHTML = '<span>🎵 Reproducir Música</span>';
    playButton.style.display = 'flex';
    playButton.style.alignItems = 'center';
    playButton.style.justifyContent = 'center';
    playButton.style.gap = '8px';
    
    // Configurar el volumen inicial
    audio.volume = volumeSlider.value / 100;
    
    // Evento para cuando termina la canción
    audio.addEventListener('ended', function() {
        // Si no está en modo loop, actualizar el botón
        if (!audio.loop) {
            playButton.innerHTML = '<span>🎵 Reproducir Música</span>';
            playButton.style.backgroundColor = '#ff4081';
        }
    });
    
    // Evento para cuando se pausa la canción
    audio.addEventListener('pause', function() {
        playButton.innerHTML = '<span>🎵 Reproducir Música</span>';
        playButton.style.backgroundColor = '#ff4081';
        // Desactivar el indicador visual
        document.querySelector('.music-player').classList.remove('playing');
    });
    
    // Evento para cuando se reproduce la canción
    audio.addEventListener('play', function() {
        playButton.innerHTML = '<span>⏸️ Pausar Música</span>';
        playButton.style.backgroundColor = '#9c27b0';
        // Activar el indicador visual
        document.querySelector('.music-player').classList.add('playing');
    });
    
    // Evento de clic en el botón
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            // Intentar reproducir con manejo de promesa (para navegadores modernos)
            const playPromise = audio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Reproducción iniciada con éxito
                }).catch(error => {
                    console.error('Error al reproducir audio:', error);
                    // Mostrar mensaje al usuario
                    alert('No se pudo reproducir el audio. Intenta hacer clic de nuevo.');
                });
            }
        } else {
            audio.pause();
        }
    });
    
    // Evento para el control de volumen
    volumeSlider.addEventListener('input', function() {
        audio.volume = this.value / 100;
        
        // Efecto visual al cambiar el volumen
        if (this.value < 30) {
            this.style.accentColor = '#ff9a9e';
        } else if (this.value < 70) {
            this.style.accentColor = '#ff4081';
        } else {
            this.style.accentColor = '#9c27b0';
        }
    });
    
    // Forzar la carga del audio
    audio.load();
}

// Función para obtener un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para mostrar el oso de peluche y animar el abrazo
function showTeddyBear() {
    const teddyBear = document.getElementById('teddy-bear');
    
    // Mostrar el oso
    teddyBear.classList.remove('hidden');
    teddyBear.style.transform = 'scale(1)';
    
    // Reproducir la música automáticamente si no está sonando
    const audio = document.getElementById('birthday-song');
    if (audio.paused) {
        // Efecto de fade in para el audio
        audio.volume = 0;
        
        // Intentar reproducir con manejo de promesa (para navegadores modernos)
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
                // Reproducción iniciada con éxito
                let volume = 0;
                const fadeIn = setInterval(() => {
                    if (volume < 0.7) {
                        volume += 0.1;
                        audio.volume = volume;
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 100);
            }).catch(error => {
                console.error('Error al reproducir audio en el oso:', error);
                // Intentar reproducir después de interacción del usuario
                alert('Haz clic en OK para activar la música de cumpleaños');
                audio.play().then(() => {
                    // Efecto de fade in para el audio después de la interacción
                    let volume = 0;
                    const fadeIn = setInterval(() => {
                        if (volume < 0.7) {
                            volume += 0.1;
                            audio.volume = volume;
                        } else {
                            clearInterval(fadeIn);
                        }
                    }, 100);
                });
            });
        }
        
        // Actualizar el botón de música
        const playButton = document.getElementById('play-music');
        // El evento 'play' actualizará automáticamente el botón gracias a los event listeners
    }
    
    // Animar el oso después de un momento
    setTimeout(() => {
        teddyBear.classList.add('moving');
        
        // Hacer que el oso sea interactivo
        teddyBear.addEventListener('click', function() {
            this.classList.toggle('hug');
            
            // Efecto de sonido de abrazo
            if (this.classList.contains('hug')) {
                // Aumentar volumen brevemente cuando se abraza
                const audio = document.getElementById('birthday-song');
                const currentVolume = audio.volume;
                
                if (!audio.paused) {
                    audio.volume = Math.min(1, currentVolume + 0.2);
                    setTimeout(() => {
                        audio.volume = currentVolume;
                    }, 1000);
                }
            }
        });
    }, 1000);
}

// Función para hacer que las imágenes de la galería sean interactivas
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 500);
        });
    });
});