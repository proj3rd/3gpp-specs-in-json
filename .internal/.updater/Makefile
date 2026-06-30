SPECS = 36.331 36.413 36.423 37.355 37.483 38.331 38.413 38.423 38.455 38.463 38.473

.PHONY: check-date get text extract-asn1 serialize-asn1 serialize-ran3

check-date:
ifndef DATE
	$(error Environment variable DATE=YYYY-DD must be given)
endif

get: check-date
	@for spec in $(SPECS); do \
		echo "Downloading $$spec..."; \
		get-3gpp-spec "$$spec" -d "$(DATE)"; \
	done
	@for file in ./*.zip; do \
		unzip -o "$$file"; \
	done
	@rm *.zip

text:
	@for file in ./*.docx; do \
		echo "Converting $$file to text..."; \
		pandoc --quiet -s "$$file" -t plain --wrap=none -o "$${file%.*}.txt"; \
	done

extract-asn1:
	@for file in ./*.txt; do \
		echo "Extracting ASN.1 from $$file..."; \
		extract-3gpp-asn1 -c $$file > "$${file%.*}.asn1"; \
	done

serialize-asn1:
	@cd lib3rd && \
	for file in ../*.asn1; do \
		if [ -f "$$file.error" ] && [ ! -s "$$file.error" ]; then \
			continue; \
		fi; \
		echo "Serializing ASN.1 of $$file..."; \
		npm run asn1 serialize "$$file" > "$$file.log" 2>"$$file.error"; \
	done

serialize-ran3:
	@for file in ./*.docx; do \
		echo "Serializing RAN3 tabular of $$file..."; \
		npx proj3rd/serialize-ran3-tabular "$$file" 2>"$${file%.*}.tabular.error"; \
	done
