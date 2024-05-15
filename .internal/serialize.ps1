$lines = Get-Content ./serialize.config
Foreach ($line in $lines) {
    Write-Output $line
    # [spec, rel, date, "asn1"|"tabular"|"both"]
    $tokens = $line.Split(" ")
    # Download the spec
    npx -y get-3gpp-spec $tokens[0] $tokens[1] $tokens[2]
    # Unzip the spec
    Expand-Archive *.zip -DestinationPath .
    # Convert to plain text
    $docx = Get-ChildItem *.docx
    $txt = "$($tokens[0])-$($tokens[1])-$($tokens[2]).txt"
    pandoc -f docx -t plain --wrap=none $docx -o $txt
    # Extract ASN.1
    $asn1 = "$($tokens[0])-$($tokens[1])-$($tokens[2]).asn1"
    npx -y extract-asn1 --exclude-non-tag-comment $txt > $asn1
    if ($tokens[3] -eq "asn1" -or $tokens[3] -eq "both") {
        # TODO: Serialize ASN.1
    }
    if ($tokens[3] -eq "tabular" -or $tokens[3] -eq "both") {
        # TODO: Serialize Tabular
    }
}
