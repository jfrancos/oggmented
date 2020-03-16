decode.js: decode.c Makefile
	emcc -I/local/include decode.c -o decode.js \
	-s ALLOW_MEMORY_GROWTH=1 \
	-O3 --closure 1 \
	-s EXPORTED_FUNCTIONS="[ \
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
	-llibvorbisfile -llibvorbis -llibogg -L/local/lib
