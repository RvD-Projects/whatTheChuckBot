#! /bin/bash
if [ "$#" -ne 2 ]; then
    echo "Incorrect number of arguments"
    exit 1
fi

case "$1" in
"0")
    dockerName="cs2-WeConnected-ns1"
    ;;

"1")
    dockerName="cs2-WeConnected-ns2"
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

statuses=$(docker ps -a --format {{.Names}}+{{.Status}} --filter name=$dockerName)
readarray -d + -t statsArr <<<"$statuses"

echo ""
echo "Container health:"
if [[ ${statsArr[0]} == "$dockerName" ]]; then
    echo "$dockerName was found."
    echo $statuses
else
    echo "$dockerName was not found."
    echo $statuses
    exit 0
fi
echo ""

if [[ ${statsArr[1]} = Up* ]]; then
    up=1
else
    up=0
fi

echo "Job to be done:"
if [[ $up == 1 ]]; then
    case "$cmd" in
    "restart")
        echo "Doing case 1 :: docker restart $dockerName"
        docker restart $dockerName
        exit 0
        ;;

    "start")
        echo "Doing case 2 :: docker restart $dockerName"
        docker restart $dockerName
        exit 0
        ;;
    "stop")
        echo "Doing case 3 :: docker stop $dockerName"
        docker stop $dockerName
        exit 0
        ;;
    esac
fi

if [[ $up == 0 ]]; then
    case "$cmd" in
    "restart")
        echo "Doing case 4 :: docker start $dockerName"
        docker start $dockerName
        exit 0
        ;;

    "start")
        echo "Doing case 5 :: docker start $dockerName"
        docker start $dockerName
        exit 0
        ;;
    "stop")
        echo "Doing case 6 :: docker stop $dockerName"
        docker stop $dockerName
        exit 0
        ;;
    esac
fi

echo "Bad exit...."
exit 1
