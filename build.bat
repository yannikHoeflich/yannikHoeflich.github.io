@echo off

echo building TypeScript ...
CALL build-tools/build-ts.bat
echo done
echo building Sass ...
CALL build-tools/build-sass.bat
echo done