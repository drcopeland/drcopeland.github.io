"""
Python script to chop up images into smaller rectangles
"""

import os
from PIL import Image, ImageOps
from pathlib import Path


def_path = Path('HomePics')

"""
makeChops: take some images and chop them up,
producing new images

Args:
	vert_cuts (nonneg int)
	horiz_cuts (nonneg int)
	

Returns:
	a new directory filled with chopped images
	dir_path\chops
	img.jpg becomes a bunch of img_i_j.jpg as i = 1...vert_cuts and j = 1...horiz_cuts
"""

def makeChops(ncol, nrow, dir_path = def_path):
	path = Path(dir_path) / "chops"
	os.mkdir(path)

	numPics = len(os.listdir(def_path))
 
	for i in range(numPics-1):
		im = Image.open(dir_path / f"pic_{i}.jpg")
		im = ImageOps.exif_transpose(im)
		xinc = im.size[0]/ncol
		yinc = im.size[1]/nrow
		
		for y in range(nrow):
			for x in range(ncol):
				smallBox = (x*xinc, y*yinc, (x+1)*xinc, (y+1)*yinc)
				smallIm = im.crop(smallBox)
				outfile = path / f'pic_{i}_{y}_{x}.jpg'
				smallIm.save(outfile)

makeChops(3,3)