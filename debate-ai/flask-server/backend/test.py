import glob
import os

list_of_files = glob.glob('/Users/nikhi/Downloads/*.mp4')
latest_mp4_file = max(list_of_files, key=os.path.getctime)
print(latest_mp4_file)
