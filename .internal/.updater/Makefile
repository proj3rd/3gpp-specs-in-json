SPECS = 36.331 36.413 36.423 37.355 37.483 38.331 38.413 38.423 38.455 38.463 38.473

# 'get' 다음에 오는 두 번째 인자를 date 변수로 저장
# (words와 word 함수를 이용해 인자 위치를 잡습니다)
ifeq ($(firstword $(MAKECMDGOALS)), get)
DATE_ARG := $(word 2, $(MAKECMDGOALS))
# 두 번째 인자가 존재한다면, Make가 해당 인자를 타겟으로 인식해 에러내는 것을 방지
ifneq ($(DATE_ARG),)
$(eval $(DATE_ARG):;@:)
endif
endif

.PHONY: get text extract-asn1 serialize-asn1 serialize-ran3

get:
ifeq ($(DATE_ARG),)
	$(error Missing YYYY-MM. Usage: make get 2026-06)
endif
	@for spec in $(SPECS); do \
		echo "Downloading $$spec..."; \
		get-3gpp-spec "$$spec" -d "$(DATE_ARG)"; \
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
