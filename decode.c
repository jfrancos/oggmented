#include <vorbis/vorbisfile.h>
#include <stdlib.h>

OggVorbis_File vf;
int bitstream = 0;

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

// Maybe this opening part should be done in javascript land
// (although maybe try to do everything in js land?)

int read_float(float ***outbuf) {
  float **pcm;
  int ret = ov_read_float(&vf, &pcm, 4096, &bitstream);
  // printf("%i\n", &pcm[0][0] );
  // printf("%i\n", pcm[1] );
  // printf("%i\n", *pcm );
  // printf("%f\n", **pcm );
  *outbuf = pcm;
  return ret;
}

// see what's going on before that last commit
int decode_buffer(float outbuf[])
{
  float **pcm;
  int bitstream = 0;
  int length = get_length();
  int channels = ov_info(&vf, 0)->channels;
  int streams = ov_streams(&vf);
  int ret, i, j;
  int index = 0;
  while ((ret = ov_read_float(&vf, &pcm, 4800, &bitstream)) != 0)
  {
    for (i = 0; i < channels; i++)
    {
      for (j = 0; j < ret; j++)
      {
        outbuf[index + i * length + j] = pcm[i][j];
      }
    }
    index += ret;
  }
  return 0;
}
