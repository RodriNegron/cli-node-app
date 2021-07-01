const commands = ['create_file', 'show', 'metadata', 'cd', 'destroy', 'ls', 'whereami']

// create_file file_1 "Contenido"
const file = {
    name: process.argv[1],
    content: process.argv[2]
}



const directoryExists = filepath => {
  return fs.existsSync(filepath)
}

function show(fileName) {
    arrayFiles.forEach(element => {
        if(element.name == fileName){
            console.log(element.content);
            break;
        }
    });
}


const create_file = promisify(fs.mkdir)
const rm = promisify(rimraf)


module.exports = {
    create_file,
    show,
    metadata,
    cd,
    destroy,
    ls,
    whereami,
}

