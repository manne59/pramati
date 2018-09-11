#!/bin/sh
filename="res.txt"
cou=$(cat $filename)
ew=0
ow=0
for i in $cou
do
len=${#i}
if [ `expr $len % 2` -eq 0 ]
then
ew=`expr $ew + 1`
fi
done
echo "number of words in even length are $ew"


