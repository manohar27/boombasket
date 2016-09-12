#!/bin/bash

i=0
length=`cat personal.json|jq length`
while [ $i -le $length ]
do
b=`cat personal.json|jq ".[$i]"`
curl -XPOST "http://localhost:9200/shopping/personal/" -d "$b"
((i++))
done


