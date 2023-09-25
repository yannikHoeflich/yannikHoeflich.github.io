@echo off

echo building TypeScript ...
CALL build-tools/build-ts.bat %1
echo done
echo building Sass ...
CALL build-tools/build-sass.bat %1
echo done
echo compressing ...
CALL build-tools/compress.bat %1
echo done