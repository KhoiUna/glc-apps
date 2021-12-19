folder=$1

if [[ "$folder" == "admin" ]]; then
    port=3000
else
    port=3001
fi

cd ./$folder
npx next dev -p $port