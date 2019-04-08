图片切割

```python
#!/usr/bin/env python2
#-*- coding:utf-8 -*-

import datetime
import os, sys
from PIL import Image

def splitimage(src, rownum, colnum, dstpath):
    img = Image.open(src)
    w, h = img.size
    if rownum <= h and colnum <= w:
        print('Original image info: %sx%s, %s, %s' % (w, h, img.format, img.mode))
        print('start cutting picture...')

        s = os.path.split(src)
        if dstpath == '':
            dstpath = s[0]
        fn = s[1].split('.')
        basename = fn[0]
        ext = fn[-1]

        num = 0
        rowheight = h // rownum
        colwidth = w // colnum
        for r in range(rownum):
            for c in range(colnum):
                box = (c * colwidth, r * rowheight, (c + 1) * colwidth, 
                    (r + 1) * rowheight)
                img.crop(box).save(os.path.join(dstpath, basename + '-' 
                    + str(num) + '.' + ext), ext)
                num = num + 1

        print('done! generate %s pics' % num)
    else:
        print('illegal row or col parameter')


def main():
    now = datetime.date.today()
    yesterday = now - datetime.timedelta(1)

    params = sys.argv[1:]
    if len(params) == 0:
        src_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 
                'static/pic')
        default_pic = os.path.join(src_path, str(yesterday) + '.png')
        if os.path.exists(default_pic):
            splitimage(default_pic, 2, 1, src_path)
        else:
            print('picture "%s" not exist' % default_pic)
    else:
        for pic in params:
            if not os.path.exists(pic):
                print('picture "%s" not exist'% pic)
                continue
            splitimage(pic, 2, 1, '')


if __name__ == '__main__':
    main()

```