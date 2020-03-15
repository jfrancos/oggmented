#include <vorbis/vorbisfile.h>
// #include <stdlib.h>

OggVorbis_File vf;
int bitstream = 0;
float **pcm;

int open_buffer(void *inbuf, int size)
{
  FILE *stream = fmemopen(inbuf, size, "r,b");
  return ov_open(stream, &vf, NULL, 0);
}

int get_length()
{
  return ov_pcm_total(&vf, 0);
}

int get_channels()
{
  return ov_info(&vf, 0)->channels;
}

int get_rate()
{
  return ov_info(&vf, 0)->rate;
}

float get_time()
{
  return ov_time_total(&vf, 0);
}

int get_streams()
{
  return ov_read_float(&vf, &pcm, 4096, &bitstream);
}

int read_float(float ***outbuf)
{
  int ret = ov_read_float(&vf, &pcm, 4096, &bitstream);
  *outbuf = pcm;
  return ret;
}