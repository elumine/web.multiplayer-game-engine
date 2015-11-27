MeshWaterMaterial = new THREE.ShaderMaterial( {

	lights: true,

	uniforms: THREE.UniformsUtils.merge( [ THREE.ShaderLib[ 'phong' ].uniforms, 		
	{
		waveMap		: { type: "t", value: null },
		time		: { type: "f", value: 0.0 },
		waveHeight	: { type: "f", value: 50.0 }
	} ] ),		

	vertexShader: [

		"#define PHONG",

		"varying vec3 vViewPosition;",
		"varying vec3 vNormal;",

		"uniform sampler2D waveMap;",
		"uniform float time;",
		"uniform float waveHeight;",

		THREE.ShaderChunk[ "map_pars_vertex" ],
		THREE.ShaderChunk[ "lightmap_pars_vertex" ],
		THREE.ShaderChunk[ "envmap_pars_vertex" ],
		THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
		THREE.ShaderChunk[ "color_pars_vertex" ],
		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
		THREE.ShaderChunk[ "skinning_pars_vertex" ],
		THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
		THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

		"void main() {",

			THREE.ShaderChunk[ "map_vertex" ],
			THREE.ShaderChunk[ "lightmap_vertex" ],
			THREE.ShaderChunk[ "color_vertex" ],

			THREE.ShaderChunk[ "morphnormal_vertex" ],
			THREE.ShaderChunk[ "skinbase_vertex" ],
			THREE.ShaderChunk[ "skinnormal_vertex" ],
			THREE.ShaderChunk[ "defaultnormal_vertex" ],

		"	vNormal = normalize( transformedNormal );",

			THREE.ShaderChunk[ "morphtarget_vertex" ],
			THREE.ShaderChunk[ "skinning_vertex" ],
			THREE.ShaderChunk[ "default_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_vertex" ],

		"	vViewPosition = -mvPosition.xyz;",

			THREE.ShaderChunk[ "worldpos_vertex" ],
			THREE.ShaderChunk[ "envmap_vertex" ],
			THREE.ShaderChunk[ "lights_phong_vertex" ],
			THREE.ShaderChunk[ "shadowmap_vertex" ],
		
			"float z0 = texture2D(waveMap, uv).r;",
			"float z1 = texture2D(waveMap, uv).g;",
			"float k = 0.0;",
		
			"if (time <= 0.5) {",
				"k = 2.0 * time;",
			"}",
			"else {",
				"k = 2.0 * (1.0 - time);",
			"}",

			"float z = (z0 + ( z1 - z0 ) * k) * waveHeight;",

			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, z, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader 	: THREE.ShaderLib[ 'phong' ].fragmentShader

});
MeshWaterMaterial.uniforms.normalMap.value = THREE.ImageUtils.loadTexture('assets/graphic/material/water1/normal.png')
MeshWaterMaterial.uniforms.ambient.value = new THREE.Color(0, 0.2, 0.5)
MeshWaterMaterial.uniforms.diffuse.value = new THREE.Color(0, 0.2, 0.5)














MeshGrassMaterial = new THREE.ShaderMaterial( {

	lights: true,
	side: THREE.DoubleSide,

	attributes:
	{
		displacement: {	type: 'f', value: [] }
	},

	uniforms: THREE.UniformsUtils.merge( [ THREE.ShaderLib[ 'phong' ].uniforms, 		
	{
		time		: { type: "f", value: 0.0 },
		amplitude	: { type: "f", value: 1.0 }
	} ] ),

	vertexShader: [

		"#define PHONG",

		"varying vec3 vViewPosition;",
		"varying vec3 vNormal;",

		"uniform float time;",
		"uniform float amplitude;",

		"attribute float displacement;",

		THREE.ShaderChunk[ "map_pars_vertex" ],
		THREE.ShaderChunk[ "lightmap_pars_vertex" ],
		THREE.ShaderChunk[ "envmap_pars_vertex" ],
		THREE.ShaderChunk[ "lights_phong_pars_vertex" ],
		THREE.ShaderChunk[ "color_pars_vertex" ],
		THREE.ShaderChunk[ "morphtarget_pars_vertex" ],
		THREE.ShaderChunk[ "skinning_pars_vertex" ],
		THREE.ShaderChunk[ "shadowmap_pars_vertex" ],
		THREE.ShaderChunk[ "logdepthbuf_pars_vertex" ],

		"void main() {",

			THREE.ShaderChunk[ "map_vertex" ],
			THREE.ShaderChunk[ "lightmap_vertex" ],
			THREE.ShaderChunk[ "color_vertex" ],

			THREE.ShaderChunk[ "morphnormal_vertex" ],
			THREE.ShaderChunk[ "skinbase_vertex" ],
			THREE.ShaderChunk[ "skinnormal_vertex" ],
			THREE.ShaderChunk[ "defaultnormal_vertex" ],

		"	vNormal = normalize( transformedNormal );",

			THREE.ShaderChunk[ "morphtarget_vertex" ],
			THREE.ShaderChunk[ "skinning_vertex" ],
			THREE.ShaderChunk[ "default_vertex" ],
			THREE.ShaderChunk[ "logdepthbuf_vertex" ],

		"	vViewPosition = -mvPosition.xyz;",

			THREE.ShaderChunk[ "worldpos_vertex" ],
			THREE.ShaderChunk[ "envmap_vertex" ],
			THREE.ShaderChunk[ "lights_phong_vertex" ],
			THREE.ShaderChunk[ "shadowmap_vertex" ],
		
			"float px = position.x;",
			"float pz = position.z;",

			"if (position.y > 0.5) {",
				"px += amplitude * cos( 6.28 * (time - displacement)) + uv.x * 0.5;",
				"pz += amplitude * sin( 6.28 * (time - displacement));",
			"}",
			
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( px, position.y, pz, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader 	: THREE.ShaderLib[ 'phong' ].fragmentShader

});
MeshGrassMaterial.uniforms.map.value = THREE.ImageUtils.loadTexture('assets/graphic/material/grass0_hight/diffuse.png')
MeshGrassMaterial.uniforms.ambient.value = new THREE.Color(0, 1, 0)
MeshGrassMaterial.uniforms.diffuse.value = new THREE.Color(0, 1, 0)