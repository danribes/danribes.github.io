// ===================================
// Hero 3D Background — Three.js
// Animated wireframe mathematical figures
// ===================================

(function () {
    'use strict';

    // Bail out if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Bail out if Three.js didn't load
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;

    const heroSection = canvas.closest('.hero');
    if (!heroSection) return;

    // --- Configuration ---
    const isMobile = window.innerWidth < 768;
    const COLORS = [0x667eea, 0x4facfe, 0x00f2fe, 0x43e97b, 0x38f9d7, 0x764ba2];

    const SHAPE_DEFS = [
        { geo: () => new THREE.TorusGeometry(1.2, 0.4, 16, 50),          color: 0x667eea, pos: [-5,  2,   -3] },
        { geo: () => new THREE.IcosahedronGeometry(1.0, 0),              color: 0x4facfe, pos: [ 5.5, 1.5, -2] },
        { geo: () => new THREE.DodecahedronGeometry(0.9, 0),             color: 0x43e97b, pos: [-3, -2,   -1] },
        { geo: () => new THREE.OctahedronGeometry(1.0, 0),               color: 0x00f2fe, pos: [ 6, -1.5, -4] },
        { geo: () => new THREE.TorusKnotGeometry(0.8, 0.25, 100, 16),    color: 0x764ba2, pos: [-6.5, 0,  -2] },
        { geo: () => new THREE.IcosahedronGeometry(1.1, 1),              color: 0x38f9d7, pos: [ 3,  3,   -5] },
        { geo: () => new THREE.TetrahedronGeometry(1.0, 0),              color: 0x667eea, pos: [ 0, -3,   -2] },
        { geo: () => new THREE.TorusGeometry(1.0, 0.02, 8, 80),          color: 0x4facfe, pos: [ 7,  3,   -3] }
    ];

    const shapeCount    = isMobile ? 5 : SHAPE_DEFS.length;
    const particleCount = isMobile ? 100 : 300;

    // --- Renderer ---
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    } catch (_) {
        return; // WebGL not available — hero looks fine with just CSS
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(heroSection.offsetWidth, heroSection.offsetHeight);

    // --- Scene & Camera ---
    const scene  = new THREE.Scene();
    const aspect = heroSection.offsetWidth / heroSection.offsetHeight;
    const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
    camera.position.set(0, 0, 8);

    // --- Build shapes ---
    const shapeGroups = [];

    for (let i = 0; i < shapeCount; i++) {
        const def      = SHAPE_DEFS[i];
        const geometry  = def.geo();
        const color     = new THREE.Color(def.color);
        const group     = new THREE.Group();

        // 1. Wireframe mesh
        const wireMat = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.55
        });
        group.add(new THREE.Mesh(geometry, wireMat));

        // 2. Inner glow fill
        const fillMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.07
        });
        group.add(new THREE.Mesh(geometry, fillMat));

        // 3. Outer glow shell (BackSide, scaled up)
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.03,
            side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(geometry, glowMat);
        glowMesh.scale.setScalar(1.2);
        group.add(glowMesh);

        group.position.set(def.pos[0], def.pos[1], def.pos[2]);

        // Store per-shape animation parameters
        group.userData = {
            rotSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.005
            },
            floatOffset: Math.random() * Math.PI * 2,
            floatAmp:    0.3 + Math.random() * 0.4,
            floatFreq:   0.3 + Math.random() * 0.3,
            baseY:       def.pos[1]
        };

        scene.add(group);
        shapeGroups.push(group);
    }

    // --- Particle field ---
    const particleGeo = new THREE.BufferGeometry();
    const positions   = new Float32Array(particleCount * 3);
    const colors      = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * 24;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;

        const c = new THREE.Color(COLORS[Math.floor(Math.random() * COLORS.length)]);
        colors[i * 3]     = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Mouse tracking ---
    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function onMouseMove(e) {
        mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
        mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // --- Visibility (IntersectionObserver) ---
    let isVisible = true;

    if ('IntersectionObserver' in window) {
        const visObs = new IntersectionObserver(
            (entries) => { isVisible = entries[0].isIntersecting; },
            { threshold: 0 }
        );
        visObs.observe(heroSection);
    }

    // --- Animation loop ---
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isVisible) return;

        const t = clock.getElapsedTime();

        // Smooth mouse lerp for parallax
        target.x += (mouse.x - target.x) * 0.05;
        target.y += (mouse.y - target.y) * 0.05;
        camera.position.x =  target.x * 0.8;
        camera.position.y = -target.y * 0.5;
        camera.lookAt(0, 0, 0);

        // Animate shapes
        for (const grp of shapeGroups) {
            const u = grp.userData;
            grp.rotation.x += u.rotSpeed.x;
            grp.rotation.y += u.rotSpeed.y;
            grp.rotation.z += u.rotSpeed.z;
            grp.position.y  = u.baseY + Math.sin(t * u.floatFreq + u.floatOffset) * u.floatAmp;
        }

        // Slowly rotate particles
        particles.rotation.y = t * 0.02;
        particles.rotation.x = t * 0.01;

        renderer.render(scene, camera);
    }

    animate();

    // --- Resize handler ---
    function onResize() {
        const w = heroSection.offsetWidth;
        const h = heroSection.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('resize', onResize, { passive: true });
})();
