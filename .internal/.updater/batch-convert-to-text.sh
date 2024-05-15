FILES="./*.doc*"
for file in $FILES
do
	libreoffice --headless -convert-to txt $file
done

