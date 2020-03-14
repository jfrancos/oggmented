
decode.js: decode.c Makefile
	emcc -I/local/include decode.c -o decode.js \
	-s INVOKE_RUN=0 \
	-O3 --closure 1 --llvm-lto 3 -flto \
	-fno-exceptions -fno-rtti \
	-s ALLOW_MEMORY_GROWTH=1 \
	-s TOTAL_MEMORY=1610612736 \
	-s EXPORTED_FUNCTIONS="['_decode_buffer', '_read_float', '_open_buffer', '_get_length', '_get_channels', '_get_rate', '_get_time', '_malloc', '_fmemopen', '_ov_open', '_ov_pcm_total', '_ov_info']" \
	-s EXTRA_EXPORTED_RUNTIME_METHODS=['ccall'] \
	-llibvorbisfile -llibvorbis -llibogg -L/local/lib







	# -O3 --closure 1 --llvm-lto 1 \
	# -s LLD_REPORT_UNDEFINED \
	# 	-s ASSERTIONS=1 \
	# -s SAFE_HEAP=1 \
	# -s DETERMINISTIC=1 \
	# -s TOTAL_MEMORY=1610612736 \
		# -g \
