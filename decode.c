// https://github.com/simontime/VGMPlayerNX/blob/388c2ee45b79534f329ed91bde16681102e3ebcd/source/vgmstream/coding/ogg_vorbis_decoder.c#L79

#include <vorbis/vorbisfile.h>

OggVorbis_File vf;
// int buffers[];

// int add_buffer()

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

int decode_buffer(float outbuf[])
{
  float **pcm;
  int bitstream = 0;
  int total = 0;
  int length = get_length();
  int channels = ov_info(&vf, 0)->channels;
  int streams = ov_streams(&vf);

  float val;
  int ret, i, j;
  int index = 0;
  while ((ret = ov_read_float(&vf, &pcm, 93000, &bitstream)) != 0)
  {
    for (i = 0; i < channels; i++)
    {
      for (j = 0; j < ret; j++)
      {
        outbuf[index + i * length + j] = pcm[i][j];
        // if (j>500 && j<600) {
        //   printf("%.20f\n", pcm[i][j]);
        // }
      }
    }
    index += ret;
  }

  return 0;
}
