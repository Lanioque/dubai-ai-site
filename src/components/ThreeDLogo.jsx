import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeDLogo({ className = '' }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let width = container.clientWidth;
        let height = container.clientHeight;

        // 1. Core Scene Setup
        const scene = new THREE.Scene();
        // Using transparent fog so it blends with the dark theme instead of a hard color
        scene.fog = new THREE.FogExp2(0x020617, 0.0015);

        const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
        camera.position.set(0, 0, 320); // Pulled back slightly so it fits nicely

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = 1.1;
        container.appendChild(renderer.domElement);

        // 2. Custom Environment Map
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        const envScene = new THREE.Scene();
        envScene.background = new THREE.Color(0x020617);

        const lightGeo = new THREE.PlaneGeometry(300, 300);

        const whiteEnvLight = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
        whiteEnvLight.position.set(150, 150, 100);
        whiteEnvLight.lookAt(0, 0, 0);
        envScene.add(whiteEnvLight);

        const topBlueLight = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0x3b82f6 }));
        topBlueLight.position.set(-150, 150, 100);
        topBlueLight.lookAt(0, 0, 0);
        envScene.add(topBlueLight);

        const bottomNavyLight = new THREE.Mesh(lightGeo, new THREE.MeshBasicMaterial({ color: 0x1e3a8a }));
        bottomNavyLight.position.set(100, -200, 50);
        bottomNavyLight.lookAt(0, 0, 0);
        envScene.add(bottomNavyLight);

        const centerWhiteLightEnv = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        centerWhiteLightEnv.position.set(0, 0, 200);
        centerWhiteLightEnv.lookAt(0, 0, 0);
        envScene.add(centerWhiteLightEnv);

        const envRenderTarget = pmremGenerator.fromScene(envScene);
        const metallicEnvMap = envRenderTarget.texture;

        // 3. True Metallic PBR Materials (Contrasting Lighter Blues)
        const frameMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#3b82f6"), // Lighter base blue instead of navy
            metalness: 0.95,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            envMap: metallicEnvMap,
            envMapIntensity: 2.5 // Increased environmental reflection
        });

        const sparkleMaterial = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#93c5fd"), // Bright glowing cyan/light blue
            metalness: 0.9,
            roughness: 0.1,
            clearcoat: 1.0,
            clearcoatRoughness: 0.02,
            envMap: metallicEnvMap,
            envMapIntensity: 2.5 // Increased environmental reflection
        });

        // 4. Geometry Generation
        function buildRoundedRect(ctx, x, y, width, height, radius) {
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height - radius);
            ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
            ctx.lineTo(x + width - radius, y + height);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
            ctx.lineTo(x + width, y + radius);
            ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
            ctx.lineTo(x + radius, y);
            ctx.quadraticCurveTo(x, y, x, y + radius);
        }

        const frameShape = new THREE.Shape();
        const outerSize = 130;
        const innerSize = 90;

        buildRoundedRect(frameShape, -outerSize / 2, -outerSize / 2, outerSize, outerSize, 30);
        const holePath = new THREE.Path();
        buildRoundedRect(holePath, -innerSize / 2, -innerSize / 2, innerSize, innerSize, 20);
        frameShape.holes.push(holePath);

        const sparkleShape = new THREE.Shape();
        const s = 30;
        sparkleShape.moveTo(0, s);
        sparkleShape.quadraticCurveTo(s * 0.2, s * 0.2, s, 0);
        sparkleShape.quadraticCurveTo(s * 0.2, -s * 0.2, 0, -s);
        sparkleShape.quadraticCurveTo(-s * 0.2, -s * 0.2, -s, 0);
        sparkleShape.quadraticCurveTo(-s * 0.2, s * 0.2, 0, s);

        const extrudeSettings = {
            depth: 14,
            bevelEnabled: true,
            bevelSegments: 16,
            steps: 1,
            bevelSize: 2.5,
            bevelThickness: 2.5
        };

        const frameGeo = new THREE.ExtrudeGeometry(frameShape, extrudeSettings);
        frameGeo.center();

        const sparkleGeo = new THREE.ExtrudeGeometry(sparkleShape, extrudeSettings);
        sparkleGeo.center();

        const group = new THREE.Group();
        scene.add(group);

        const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
        const sparkleMesh = new THREE.Mesh(sparkleGeo, sparkleMaterial);

        frameMesh.position.z = -5;
        sparkleMesh.position.z = 5;

        group.add(frameMesh);
        group.add(sparkleMesh);

        // 5. Direct Scene Lighting
        // Increased all light intensities to combat darkness and enhance the metallic sheen
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambient);

        const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
        dirLight1.position.set(50, 50, 50);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xbae6fd, 1.5);
        dirLight2.position.set(-50, -50, 50);
        scene.add(dirLight2);

        // 6. Interaction & Animation
        group.rotation.x = 0.35;
        group.rotation.y = 0.45;

        const clock = new THREE.Clock();
        let reqId;
        function animate() {
            reqId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth swinging oscillation for the frame
            group.rotation.y = 0.45 + Math.sin(t * 1.5) * 0.15;
            group.rotation.x = 0.35 + Math.cos(t * 1.2) * 0.1;

            // Full continuous 360 rotation for the inner star
            sparkleMesh.rotation.z = t * 1.2;

            // Move the light slightly to create dynamic dancing reflections on the metal
            dirLight1.position.x = 50 + Math.sin(t * 2) * 30;
            dirLight1.position.y = 50 + Math.cos(t * 1.5) * 20;

            renderer.render(scene, camera);
        }
        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            width = containerRef.current.clientWidth;
            height = containerRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(reqId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            pmremGenerator.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div className={`relative ${className}`}>
            <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />
        </div>
    );
}
