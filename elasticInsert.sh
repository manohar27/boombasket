#!/bin/bash

i=0
length=`cat Sukhoi.json|jq length`
while [ $i -le $length ]
do
b=`cat Sukhoi.json|jq ".[$i]"`
curl -XPOST "http://localhost:9200/shopping/planes/" -d "$b"
((i++))
done


