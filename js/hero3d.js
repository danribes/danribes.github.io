// ===================================
// Hero 3D Background — Three.js
// Animated health economics graph wireframes
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

    // --- Helper: create a line from an array of Vector3 ---
    function makeLine(points, color, opacity) {
        opacity = opacity !== undefined ? opacity : 0.85;
        var geo = new THREE.BufferGeometry().setFromPoints(points);
        var mat = new THREE.LineBasicMaterial({
            color: color, transparent: true, opacity: opacity
        });
        return new THREE.Line(geo, mat);
    }

    // --- Helper: create a dashed line ---
    function makeDashedLine(points, color, dashSize, gapSize, opacity) {
        opacity = opacity !== undefined ? opacity : 0.5;
        var geo = new THREE.BufferGeometry().setFromPoints(points);
        var mat = new THREE.LineDashedMaterial({
            color: color, transparent: true, opacity: opacity,
            dashSize: dashSize || 0.08, gapSize: gapSize || 0.06
        });
        var line = new THREE.Line(geo, mat);
        line.computeLineDistances();
        return line;
    }

    // --- Helper: small sphere dot ---
    function makeDot(x, y, z, color, radius) {
        radius = radius || 0.04;
        var geo = new THREE.SphereGeometry(radius, 6, 6);
        var mat = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.9 });
        var m = new THREE.Mesh(geo, mat);
        m.position.set(x, y, z);
        return m;
    }

    // --- Helper: axes (X right, Y up) centered at origin, length s ---
    function makeAxes(s, color) {
        var g = new THREE.Group();
        g.add(makeLine([new THREE.Vector3(0, 0, 0), new THREE.Vector3(s, 0, 0)], color, 0.6));
        g.add(makeLine([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, s, 0)], color, 0.6));
        return g;
    }

    // ========================================================
    // 1. Kaplan-Meier Survival Curve
    // ========================================================
    function buildKaplanMeier(color) {
        var g = new THREE.Group();
        var s = 1.2; // half-size

        // Axes
        g.add(makeAxes(s * 2, color));

        // Stepped survival line
        var steps = [
            [0, 1], [0.15, 1], [0.15, 0.92],
            [0.3, 0.92], [0.3, 0.80],
            [0.45, 0.80], [0.45, 0.72],
            [0.55, 0.72], [0.55, 0.60],
            [0.7, 0.60], [0.7, 0.48],
            [0.8, 0.48], [0.8, 0.38],
            [0.9, 0.38], [0.9, 0.25],
            [1.0, 0.25], [1.0, 0.18]
        ];
        var pts = steps.map(function(p) {
            return new THREE.Vector3(p[0] * s * 2, p[1] * s * 1.8, 0);
        });
        g.add(makeLine(pts, color, 0.95));

        // Confidence band (upper)
        var upper = [
            [0, 1], [0.15, 1], [0.15, 0.96],
            [0.3, 0.96], [0.3, 0.88],
            [0.55, 0.88], [0.55, 0.72],
            [0.7, 0.72], [0.7, 0.60],
            [0.9, 0.60], [0.9, 0.42],
            [1.0, 0.42], [1.0, 0.35]
        ];
        var upperPts = upper.map(function(p) {
            return new THREE.Vector3(p[0] * s * 2, p[1] * s * 1.8, 0);
        });
        g.add(makeDashedLine(upperPts, color, 0.06, 0.05, 0.3));

        // Confidence band (lower)
        var lower = [
            [0, 1], [0.15, 1], [0.15, 0.85],
            [0.3, 0.85], [0.3, 0.70],
            [0.55, 0.70], [0.55, 0.48],
            [0.7, 0.48], [0.7, 0.34],
            [0.9, 0.34], [0.9, 0.12],
            [1.0, 0.12], [1.0, 0.06]
        ];
        var lowerPts = lower.map(function(p) {
            return new THREE.Vector3(p[0] * s * 2, p[1] * s * 1.8, 0);
        });
        g.add(makeDashedLine(lowerPts, color, 0.06, 0.05, 0.3));

        // Censor marks (small vertical ticks)
        var censors = [0.25, 0.42, 0.65, 0.85];
        censors.forEach(function(cx) {
            // Find approximate y from steps
            var yVal = 0.5;
            for (var j = steps.length - 1; j >= 0; j--) {
                if (steps[j][0] <= cx) { yVal = steps[j][1]; break; }
            }
            var px = cx * s * 2;
            var py = yVal * s * 1.8;
            g.add(makeLine([
                new THREE.Vector3(px, py - 0.06, 0),
                new THREE.Vector3(px, py + 0.06, 0)
            ], color, 0.7));
        });

        // Center the graph
        g.position.set(-s, -s * 0.8, 0);
        var wrapper = new THREE.Group();
        wrapper.add(g);
        return wrapper;
    }

    // ========================================================
    // 2. Cost-Effectiveness Plane
    // ========================================================
    function buildCEPlane(color) {
        var g = new THREE.Group();
        var s = 1.1;

        // Axes crossing at center (incremental cost vs incremental effect)
        g.add(makeLine([new THREE.Vector3(-s, 0, 0), new THREE.Vector3(s, 0, 0)], color, 0.6));
        g.add(makeLine([new THREE.Vector3(0, -s, 0), new THREE.Vector3(0, s, 0)], color, 0.6));

        // ICER threshold diagonal
        g.add(makeDashedLine([
            new THREE.Vector3(-s * 0.8, -s * 0.6, 0),
            new THREE.Vector3(s * 0.8, s * 0.6, 0)
        ], color, 0.1, 0.08, 0.45));

        // Scatter dots — clustered mostly in NE quadrant (cost-effective)
        var dots = [
            [0.3, 0.2], [0.5, 0.4], [0.7, 0.3], [0.4, 0.6],
            [0.6, 0.5], [0.2, 0.1], [0.8, 0.7], [0.55, 0.35],
            [0.35, 0.45], [0.65, 0.55], [0.45, 0.15], [0.75, 0.4],
            [-0.1, 0.3], [-0.2, 0.5], [0.1, -0.1], [0.3, -0.15],
            [0.5, 0.25], [0.15, 0.35], [0.6, 0.1], [0.25, 0.55]
        ];
        dots.forEach(function(d) {
            g.add(makeDot(d[0] * s, d[1] * s, 0, color, 0.035));
        });

        // Quadrant labels — small marker dots at axes tips
        g.add(makeDot(s, 0, 0, color, 0.03));
        g.add(makeDot(0, s, 0, color, 0.03));

        return g;
    }

    // ========================================================
    // 3. Markov State Diagram
    // ========================================================
    function buildMarkov(color) {
        var g = new THREE.Group();
        var r = 0.35; // state circle radius

        // Three states arranged in a triangle
        var states = [
            { x: -0.8, y:  0.6, label: 'H' },  // Healthy
            { x:  0.8, y:  0.6, label: 'S' },  // Sick
            { x:  0,   y: -0.7, label: 'D' }   // Dead
        ];

        states.forEach(function(st) {
            // State circle (ring)
            var ringGeo = new THREE.RingGeometry(r - 0.03, r, 32);
            var ringMat = new THREE.MeshBasicMaterial({
                color: color, transparent: true, opacity: 0.7, side: THREE.DoubleSide
            });
            var ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.set(st.x, st.y, 0);
            g.add(ring);

            // Center dot
            g.add(makeDot(st.x, st.y, 0, color, 0.05));
        });

        // Transition arrows (lines between states)
        // H -> S
        var offset = 0.08;
        g.add(makeLine([
            new THREE.Vector3(states[0].x + r + 0.05, states[0].y + offset, 0),
            new THREE.Vector3(states[1].x - r - 0.05, states[1].y + offset, 0)
        ], color, 0.7));
        // S -> H (return, slightly below)
        g.add(makeDashedLine([
            new THREE.Vector3(states[1].x - r - 0.05, states[1].y - offset, 0),
            new THREE.Vector3(states[0].x + r + 0.05, states[0].y - offset, 0)
        ], color, 0.08, 0.06, 0.45));

        // H -> D
        var dx1 = states[2].x - states[0].x;
        var dy1 = states[2].y - states[0].y;
        var len1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        g.add(makeLine([
            new THREE.Vector3(states[0].x + dx1 / len1 * (r + 0.05), states[0].y + dy1 / len1 * (r + 0.05), 0),
            new THREE.Vector3(states[2].x - dx1 / len1 * (r + 0.05), states[2].y - dy1 / len1 * (r + 0.05), 0)
        ], color, 0.5));

        // S -> D
        var dx2 = states[2].x - states[1].x;
        var dy2 = states[2].y - states[1].y;
        var len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        g.add(makeLine([
            new THREE.Vector3(states[1].x + dx2 / len2 * (r + 0.05), states[1].y + dy2 / len2 * (r + 0.05), 0),
            new THREE.Vector3(states[2].x - dx2 / len2 * (r + 0.05), states[2].y - dy2 / len2 * (r + 0.05), 0)
        ], color, 0.5));

        // Self-loop arcs (small arcs above H and S to indicate staying in state)
        [states[0], states[1]].forEach(function(st) {
            var arcPts = [];
            for (var a = 0; a < Math.PI; a += Math.PI / 12) {
                arcPts.push(new THREE.Vector3(
                    st.x + Math.cos(a) * 0.2,
                    st.y + r + 0.08 + Math.sin(a) * 0.15,
                    0
                ));
            }
            g.add(makeLine(arcPts, color, 0.5));
        });

        return g;
    }

    // ========================================================
    // 4. Decision Tree
    // ========================================================
    function buildDecisionTree(color) {
        var g = new THREE.Group();

        // Root node (square-ish — use dot)
        var rootX = -1.0;
        g.add(makeDot(rootX, 0, 0, color, 0.07));

        // Level 1 branches
        var l1 = [
            { x: -0.3, y:  0.7 },
            { x: -0.3, y: -0.7 }
        ];
        l1.forEach(function(n) {
            g.add(makeLine([
                new THREE.Vector3(rootX, 0, 0),
                new THREE.Vector3(n.x, n.y, 0)
            ], color, 0.7));
            g.add(makeDot(n.x, n.y, 0, color, 0.06));
        });

        // Level 2 branches
        var l2 = [
            { from: l1[0], targets: [{ x: 0.5, y: 1.0 }, { x: 0.5, y: 0.4 }] },
            { from: l1[1], targets: [{ x: 0.5, y: -0.4 }, { x: 0.5, y: -1.0 }] }
        ];
        l2.forEach(function(branch) {
            branch.targets.forEach(function(t) {
                g.add(makeLine([
                    new THREE.Vector3(branch.from.x, branch.from.y, 0),
                    new THREE.Vector3(t.x, t.y, 0)
                ], color, 0.6));
                g.add(makeDot(t.x, t.y, 0, color, 0.05));
            });
        });

        // Level 3 — terminal nodes (triangles/endpoints)
        var l3Targets = [
            { from: { x: 0.5, y: 1.0 },  to: [{ x: 1.1, y: 1.15 }, { x: 1.1, y: 0.85 }] },
            { from: { x: 0.5, y: 0.4 },  to: [{ x: 1.1, y: 0.55 }, { x: 1.1, y: 0.25 }] },
            { from: { x: 0.5, y: -0.4 }, to: [{ x: 1.1, y: -0.25 }, { x: 1.1, y: -0.55 }] },
            { from: { x: 0.5, y: -1.0 }, to: [{ x: 1.1, y: -0.85 }, { x: 1.1, y: -1.15 }] }
        ];
        l3Targets.forEach(function(branch) {
            branch.to.forEach(function(t) {
                g.add(makeLine([
                    new THREE.Vector3(branch.from.x, branch.from.y, 0),
                    new THREE.Vector3(t.x, t.y, 0)
                ], color, 0.5));
                // Terminal node — small triangle
                var triPts = [
                    new THREE.Vector3(t.x, t.y + 0.06, 0),
                    new THREE.Vector3(t.x + 0.08, t.y - 0.04, 0),
                    new THREE.Vector3(t.x - 0.02, t.y - 0.04, 0),
                    new THREE.Vector3(t.x, t.y + 0.06, 0)
                ];
                g.add(makeLine(triPts, color, 0.7));
            });
        });

        return g;
    }

    // ========================================================
    // 5. Tornado Diagram (Sensitivity Analysis)
    // ========================================================
    function buildTornado(color) {
        var g = new THREE.Group();
        var s = 1.1;

        // Center vertical line
        g.add(makeLine([
            new THREE.Vector3(0, -s, 0),
            new THREE.Vector3(0,  s, 0)
        ], color, 0.6));

        // Horizontal bars (wider at top, narrower at bottom = tornado shape)
        var bars = [
            { y:  0.8, left: -1.0,  right: 0.9 },
            { y:  0.45, left: -0.8,  right: 0.75 },
            { y:  0.1,  left: -0.65, right: 0.6 },
            { y: -0.25, left: -0.5,  right: 0.45 },
            { y: -0.6,  left: -0.35, right: 0.3 },
            { y: -0.9,  left: -0.2,  right: 0.15 }
        ];

        var barH = 0.12;
        bars.forEach(function(b) {
            // Left bar (negative impact)
            var leftGeo = new THREE.PlaneGeometry(Math.abs(b.left) * s, barH);
            var leftMat = new THREE.MeshBasicMaterial({
                color: color, transparent: true, opacity: 0.35, side: THREE.DoubleSide
            });
            var leftMesh = new THREE.Mesh(leftGeo, leftMat);
            leftMesh.position.set(b.left * s / 2, b.y, 0);
            g.add(leftMesh);

            // Left bar outline
            var lPts = [
                new THREE.Vector3(b.left * s, b.y - barH / 2, 0),
                new THREE.Vector3(0, b.y - barH / 2, 0),
                new THREE.Vector3(0, b.y + barH / 2, 0),
                new THREE.Vector3(b.left * s, b.y + barH / 2, 0),
                new THREE.Vector3(b.left * s, b.y - barH / 2, 0)
            ];
            g.add(makeLine(lPts, color, 0.7));

            // Right bar (positive impact)
            var rightGeo = new THREE.PlaneGeometry(Math.abs(b.right) * s, barH);
            var rightMat = new THREE.MeshBasicMaterial({
                color: color, transparent: true, opacity: 0.25, side: THREE.DoubleSide
            });
            var rightMesh = new THREE.Mesh(rightGeo, rightMat);
            rightMesh.position.set(b.right * s / 2, b.y, 0);
            g.add(rightMesh);

            // Right bar outline
            var rPts = [
                new THREE.Vector3(0, b.y - barH / 2, 0),
                new THREE.Vector3(b.right * s, b.y - barH / 2, 0),
                new THREE.Vector3(b.right * s, b.y + barH / 2, 0),
                new THREE.Vector3(0, b.y + barH / 2, 0),
                new THREE.Vector3(0, b.y - barH / 2, 0)
            ];
            g.add(makeLine(rPts, color, 0.7));
        });

        return g;
    }

    // ========================================================
    // 6. 3D Bar Chart (Budget Impact)
    // ========================================================
    function buildBarChart(color) {
        var g = new THREE.Group();
        var s = 1.0;

        // Base axes
        g.add(makeLine([new THREE.Vector3(-s, -s, 0), new THREE.Vector3(s, -s, 0)], color, 0.5));
        g.add(makeLine([new THREE.Vector3(-s, -s, 0), new THREE.Vector3(-s, s, 0)], color, 0.5));

        // Bars
        var heights = [0.4, 0.75, 1.1, 0.9, 1.4, 0.6, 1.0];
        var barW = 0.18;
        var gap = 0.08;
        var startX = -s + 0.15;

        heights.forEach(function(h, i) {
            var x = startX + i * (barW + gap);
            var barHeight = h * s;

            // 3D-ish bar using BoxGeometry
            var boxGeo = new THREE.BoxGeometry(barW, barHeight, barW * 0.6);
            var boxMat = new THREE.MeshBasicMaterial({
                color: color, transparent: true, opacity: 0.3
            });
            var box = new THREE.Mesh(boxGeo, boxMat);
            box.position.set(x + barW / 2, -s + barHeight / 2, 0);
            g.add(box);

            // Wireframe edges
            var edgeGeo = new THREE.EdgesGeometry(boxGeo);
            var edgeMat = new THREE.LineBasicMaterial({
                color: color, transparent: true, opacity: 0.75
            });
            var edges = new THREE.LineSegments(edgeGeo, edgeMat);
            edges.position.copy(box.position);
            g.add(edges);
        });

        // Horizontal grid lines
        for (var y = -s + 0.3; y < s; y += 0.35) {
            g.add(makeDashedLine([
                new THREE.Vector3(-s, y, 0),
                new THREE.Vector3(s, y, 0)
            ], color, 0.06, 0.06, 0.2));
        }

        return g;
    }

    // ========================================================
    // 7. Distribution / Bell Curve
    // ========================================================
    function buildBellCurve(color) {
        var g = new THREE.Group();
        var s = 1.2;

        // Axes
        g.add(makeLine([
            new THREE.Vector3(-s, 0, 0),
            new THREE.Vector3(s, 0, 0)
        ], color, 0.6));
        g.add(makeLine([
            new THREE.Vector3(-s, 0, 0),
            new THREE.Vector3(-s, s * 1.1, 0)
        ], color, 0.6));

        // Normal distribution curve
        var curvePts = [];
        var shadePts = [new THREE.Vector3(-s, 0, 0)];
        for (var x = -s; x <= s; x += 0.04) {
            // Normalized x for bell curve
            var nx = (x / s) * 3; // map to -3..3 std deviations
            var y = Math.exp(-0.5 * nx * nx) * s * 0.95;
            curvePts.push(new THREE.Vector3(x, y, 0));
            shadePts.push(new THREE.Vector3(x, y, 0));
        }
        shadePts.push(new THREE.Vector3(s, 0, 0));
        g.add(makeLine(curvePts, color, 0.9));

        // Shaded area under curve (between -1σ and +1σ)
        var shadeInner = [new THREE.Vector3(-s / 3, 0, 0)];
        for (var x2 = -s / 3; x2 <= s / 3; x2 += 0.04) {
            var nx2 = (x2 / s) * 3;
            var y2 = Math.exp(-0.5 * nx2 * nx2) * s * 0.95;
            shadeInner.push(new THREE.Vector3(x2, y2, 0));
        }
        shadeInner.push(new THREE.Vector3(s / 3, 0, 0));
        shadeInner.push(new THREE.Vector3(-s / 3, 0, 0));
        g.add(makeLine(shadeInner, color, 0.4));

        // Mean line (vertical dashed at center)
        g.add(makeDashedLine([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, s * 0.95, 0)
        ], color, 0.06, 0.05, 0.5));

        // σ markers
        [-s / 3, s / 3].forEach(function(sx) {
            g.add(makeLine([
                new THREE.Vector3(sx, 0, 0),
                new THREE.Vector3(sx, 0.08, 0)
            ], color, 0.5));
        });

        return g;
    }

    // ========================================================
    // 8. Network Meta-Analysis
    // ========================================================
    function buildNMA(color) {
        var g = new THREE.Group();

        // 6 treatment nodes arranged in a rough circle
        var nodes = [];
        var n = 6;
        for (var i = 0; i < n; i++) {
            var angle = (i / n) * Math.PI * 2 - Math.PI / 2;
            nodes.push({
                x: Math.cos(angle) * 0.9,
                y: Math.sin(angle) * 0.9
            });
        }

        // Edges — varying opacity/thickness for evidence strength
        var edges = [
            { a: 0, b: 1, w: 0.9 }, { a: 0, b: 2, w: 0.7 },
            { a: 0, b: 3, w: 0.5 }, { a: 1, b: 2, w: 0.8 },
            { a: 1, b: 4, w: 0.6 }, { a: 2, b: 3, w: 0.4 },
            { a: 2, b: 5, w: 0.5 }, { a: 3, b: 4, w: 0.7 },
            { a: 4, b: 5, w: 0.6 }, { a: 0, b: 5, w: 0.3 }
        ];

        edges.forEach(function(e) {
            var a = nodes[e.a];
            var b = nodes[e.b];
            g.add(makeLine([
                new THREE.Vector3(a.x, a.y, 0),
                new THREE.Vector3(b.x, b.y, 0)
            ], color, e.w * 0.8));
        });

        // Nodes — size varies by connectivity (degree)
        var degree = new Array(n).fill(0);
        edges.forEach(function(e) { degree[e.a]++; degree[e.b]++; });

        nodes.forEach(function(nd, i) {
            var nodeR = 0.06 + degree[i] * 0.015;
            g.add(makeDot(nd.x, nd.y, 0, color, nodeR));

            // Outer ring for emphasis on high-degree nodes
            if (degree[i] >= 3) {
                var ringGeo = new THREE.RingGeometry(nodeR + 0.02, nodeR + 0.04, 16);
                var ringMat = new THREE.MeshBasicMaterial({
                    color: color, transparent: true, opacity: 0.4, side: THREE.DoubleSide
                });
                var ring = new THREE.Mesh(ringGeo, ringMat);
                ring.position.set(nd.x, nd.y, 0);
                g.add(ring);
            }
        });

        return g;
    }

    // ========================================================
    // SHAPE_DEFS — 8 health economics graphs
    // ========================================================
    const SHAPE_DEFS = [
        { build: buildKaplanMeier,  color: 0x4facfe, pos: [-5,   2,   -3] },
        { build: buildCEPlane,      color: 0x43e97b, pos: [ 5.5, 1.5, -2] },
        { build: buildMarkov,       color: 0x667eea, pos: [-3,  -2,   -1] },
        { build: buildDecisionTree, color: 0x00f2fe, pos: [ 6,  -1.5, -4] },
        { build: buildTornado,      color: 0x764ba2, pos: [-6.5, 0,   -2] },
        { build: buildBarChart,     color: 0x38f9d7, pos: [ 3,   3,   -5] },
        { build: buildBellCurve,    color: 0x667eea, pos: [ 0,  -3,   -2] },
        { build: buildNMA,          color: 0x4facfe, pos: [ 7,   3,   -3] }
    ];

    const shapeCount    = isMobile ? 5 : SHAPE_DEFS.length;
    const particleCount = isMobile ? 100 : 300;

    // --- Renderer ---
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            premultipliedAlpha: false
        });
    } catch (_) {
        return; // WebGL not available — hero looks fine with just CSS
    }
    renderer.setClearColor(0x000000, 0);
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
        const def   = SHAPE_DEFS[i];
        const color = new THREE.Color(def.color);
        const group = def.build(color);

        group.position.set(def.pos[0], def.pos[1], def.pos[2]);

        // Store per-shape animation parameters
        // Graphs rotate slowly, primarily around Y-axis to stay legible
        group.userData = {
            rotSpeed: {
                x: (Math.random() - 0.5) * 0.002,
                y: (Math.random() - 0.5) * 0.008,
                z: (Math.random() - 0.5) * 0.001
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
        size: 0.06,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
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
