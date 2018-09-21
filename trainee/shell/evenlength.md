**program to find even length words**
```
!/bin/sh
fpath=$1 
echo "File path is =$fpath"
filename=$(basename "$fpath") 
directory=$(dirname "$fpath")
cd ..
cd $directory 
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
```
