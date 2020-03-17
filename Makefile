
decode.js: decode.c Makefile pre.js
	EMCC_CLOSURE_ARGS="--language_in ECMASCRIPT6" \
	emcc -I/local/include decode.c -o src/decode.js \
	--pre-js pre.js \
	-s MODULARIZE=1 \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s ENVIRONMENT=web \
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
	-s EXTRA_EXPORTED_RUNTIME_METHODS="['ccall', 'getValue']" \
	 -O3 \
	-llibvorbisfile -llibvorbis -llibogg -L/local/lib \
	&& mv src/decode.wasm dist/



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