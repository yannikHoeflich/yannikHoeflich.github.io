IF '%1'=='release' (
    sass src/scss:src/css --no-source-map --style compressed 
) ELSE (
    sass src/scss:src/css --style compressed 
)