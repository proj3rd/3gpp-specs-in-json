rm -rf lib3rd
git clone https://github.com/proj3rd/lib3rd
cd lib3rd
npm install
FILES="../*.asn1"
for file in $FILES
do
	npm run asn1 serialize $file 2>$file.log
done
