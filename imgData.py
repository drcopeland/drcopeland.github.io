"""
Python script to clean image data and create a small app to help
label training data.
"""

import os
from PIL import Image, ImageOps
from pathlib import Path

picPath = Path('ShiloTrain')

"""
fixPics: clean up picture data

Args:
	path (= picPath) - pathlib Path object
	size (= [60,80] ) - new image sizes (list of integers)

Returns:
	creates a new folder GoodPics and fills it up with the cleaned images using
	images in ./path, names them pic_i

"""
def fixPics(path = picPath, size = [60,80]):
	numFiles = len(os.listdir(picPath))

	newPath = Path(path) / "GoodPics"
	os.mkdir(newPath)

	