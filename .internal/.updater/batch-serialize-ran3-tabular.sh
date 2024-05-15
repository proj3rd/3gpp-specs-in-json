FILES="./*.docx"
for file in $FILES
do
	npx proj3rd/serialize-ran3-tabular $file 2>$file.log
done
