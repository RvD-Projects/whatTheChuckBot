#! /bin/bash
if [ "$#" -ne 2 ]
then
    echo "Incorrect number of arguments"
    exit 1
fi

cmd="restart"
dockerName="cs2-WeConnected-ns1"

case "$1" in
    "0")
        dockerName="cs2-WeConnected-ns1"
    ;;
    
    "1")
        dockerName="cs2-rafux-ns1"
    ;;
    
    *)
        dockerName="cs2-WeConnected-ns1"
    ;;
esac

case "$2" in
    "0")
        cmd="restart"
    ;;
    
    "1")
        cmd="start"
    ;;
    
    "2")
        cmd="stop"
    ;;
    
    *)
        cmd="restart"
    ;;
esac

echo ""
echo "Job to be done: $cmd --> $dockerName"

format="{{.Names}}+{{.Status}}"
statuses=$(docker ps --format $format --filter "name=$dockerName")
readarray -d + -t statsArr <<<"$statuses"

echo ""
echo "Results"
up=1
[[ ${statsArr[0]} -eq $dockerName ]] && echo "Container was found" || echo "Container not found" || exit 1;
[[ ${statsArr[1]} = Up* ]] && echo "Container is running" || echo "Container not up" && up=0

[[ $up -eq 0 && "$cmd" == "stop" ]] && exit 0
[[ $up -eq 1 && "$cmd" == "stop" ]] && docker $cmd $dockerName && exit 0

[[ $up -eq 0 && "$cmd" == "start" ]] && docker $cmd $dockerName && exit 0
[[ $up -eq 1 && "$cmd" == "start" ]] && exit 0

[[ $up -eq 0 && "$cmd" == "restart" ]] && cmd="start" && docker $cmd $dockerName && exit 0
[[ $up -eq 1 && "$cmd" == "restart" ]] && docker $cmd $dockerName && exit 0


exit 1
