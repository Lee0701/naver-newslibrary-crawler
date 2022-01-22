#!/bin/bash
echo "" > merged-unfiltered-donga.txt
for i in 1960 1961 1962 1963 1964 1965 1966 1967 1968 1969 1970 1971 1972 1973 1974
do
	# node src/filter-tsv.js jungang $i
	cat workspace/jungang-unfiltered-$i.txt >> merged-unfiltered-donga.txt
	echo "" >> merged-unfiltered-donga.txt
done
