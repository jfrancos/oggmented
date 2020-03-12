
decode.js: decode.c Makefile
	emcc -Ilocal/include decode.c -o decode.js \
	-O3 --closure 1 --llvm-lto 1 -flto \
	-s INVOKE_RUN=0 \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s TOTAL_MEMORY=1610612736 \
	-s EXPORTED_FUNCTIONS="['_open_buffer', '_get_length', '_get_channels', '_get_rate', '_get_time', '_decode_buffer', '_malloc', '_fmemopen', '_ov_open', '_ov_pcm_total', '_ov_info']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS=['ccall'] \
	-llibvorbisfile -llibvorbis -llibogg -Llocal/lib

	# -O3 --closure 1 --llvm-lto 1 \

	# 	-s ASSERTIONS=1 \
	# -s SAFE_HEAP=1 \
	# -s DETERMINISTIC=1 \
	# -s TOTAL_MEMORY=1610612736 \
		# -g \
