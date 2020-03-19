
decode.js: decode.c Makefile pre.js
	EMCC_CLOSURE_ARGS="--language_in ECMASCRIPT6 \
	--process_common_js_modules \
	--module_resolution=NODE \
	--js node_modules/setimmediate/setImmediate.js \
	--jscomp_off=checkVars \
	--js node_modules/setimmediate/package.json" \
	emcc -I/local/include decode.c -o decode.js \
	--pre-js pre.js \
	-s MODULARIZE=1 \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s ENVIRONMENT=web \
	-s STRICT=1 \
	-s SINGLE_FILE=1 \
	-s EXPORTED_FUNCTIONS="[ \
		'_open_buffer', \
		'_malloc', \
		'_read_float', \
		'_open_buffer', \
		'_get_length', \
		'_get_channels', \
		'_get_rate', \
		'_get_time', \
		'_get_streams' \
	]" \
	-O3 --closure 1 \
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'getValue']" \
	-llibvorbisfile -llibvorbis -llibogg -L/local/lib
	# && mv src/decode.wasm dist/
# var MODULARIZE_INSTANCE = 0;

 
	# -s EXPORT_ES6=1 \

	# EMCC_CLOSURE_ARGS="--language_in ECMASCRIPT6" \
	# -O3 --closure 1 \
		# '_malloc', \
		# '_read_float', \
		# '_open_buffer', \
		# '_get_length', \
		# '_get_channels', \
		# '_get_rate', \
		# '_get_time', \
		# '_get_streams' \