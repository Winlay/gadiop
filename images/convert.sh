#
# (OS X, Unix and Linux)
#
# What is this?
#
# It's a shell script that is using ImageMagick to create all the icon files from one source icon.
#
# Stick the script in your 'www/res/icons' folder with your source icon 'my-hires-icon.png' then trigger it from Terminal.
#

ICON=${1:-"icon.png"}
SPLASH=${2:-"splash.png"}

cd android/icon/
convert $ICON -resize 36x36\! icon-36-ldpi.png
convert $ICON -resize 48x48\! icon-48-mdpi.png
convert $ICON -resize 72x72\! icon-72-hdpi.png
convert $ICON -resize 96x96\! icon-96-xhdpi.png

cd ../../ios/icon/
convert $ICON -resize 29\!  icon-29.png
convert $ICON -resize 40\!  icon-40.png
convert $ICON -resize 50\!  icon-50.png
convert $ICON -resize 57\!  icon-57.png
convert $ICON -resize 58\!  icon-29-2x.png
convert $ICON -resize 60\!  icon-60.png
convert $ICON -resize 72\!  icon-72.png
convert $ICON -resize 76\!  icon-76.png
convert $ICON -resize 80\!  icon-40-2x.png
convert $ICON -resize 100\! icon-50-2x.png
convert $ICON -resize 114\! icon-57-2x.png
convert $ICON -resize 120\! icon-60-2x.png
convert $ICON -resize 144\! icon-72-2x.png



#cd android/splash/
#convert $SPLASH -resize 200x320\!   splash-ldpi-portrait.png
#convert $SPLASH -resize 320x200\!   splash-ldpi-landscape.png
#convert $SPLASH -resize 320x480\!   splash-mdpi-portrait.png
#convert $SPLASH -resize 480x320\!   splash-mdpi-landscape.png
#convert $SPLASH -resize 480x800\!   splash-hdpi-portrait.png
#convert $SPLASH -resize 800x480\!   splash-hdpi-landscape.png
#convert $SPLASH -resize 720x1280\!  splash-xhdpi-portrait.png
#convert $SPLASH -resize 1280x720\!  splash-xhdpi-landscape.png
#convert $SPLASH -resize 900x1600\!  splash-xxhdpi-portrait.png
#convert $SPLASH -resize 1600x960\!  splash-xxhdpi-landscape.png
#convert $SPLASH -resize 1280x1920\! splash-xxxhdpi-portrait.png
#convert $SPLASH -resize 1920x1280\! splash-xxxhdpi-landscape.png
#
#
#cd ../../ios/splash/
#convert $SPLASH -resize 320x480\!   splash~iphone.png
#convert $SPLASH -resize 640x960\!   splash@2x~iphone.png
#convert $SPLASH -resize 768x1024\!  splash-Portrait~ipad.png
#convert $SPLASH -resize 1536x2048\! splash-Portrait@2x~ipad.png
#convert $SPLASH -resize 1024x768\!  splash-Landscape~ipad.png
#convert $SPLASH -resize 2048x1536\! splash-Landscape@2x~ipad.png
#convert $SPLASH -resize 640x1136\!  splash-568h@2x~iphone.png
#convert $SPLASH -resize 750x1334\!  splash-667h.png
#convert $SPLASH -resize 1242x2208\! splash-736h.png
#convert $SPLASH -resize 2208x1242\! splash-Landscape-736h.png

