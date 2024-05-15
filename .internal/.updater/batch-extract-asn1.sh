FILES="./*.txt"
for file in $FILES
do
	npx extract-asn1 --exclude-non-tag-comment $file > $file.asn1
done
