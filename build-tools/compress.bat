set arg1=%1
IF '%1'=='release' (
    uglifyjs src/js/app.js -o src/js/app.min.js -c -m
) ELSE (
    uglifyjs src/js/app.js -o src/js/app.min.js
)