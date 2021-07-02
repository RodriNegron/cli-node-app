# cli-node-app
NodeJs Command line app for users and files management

## User commands (roles = super, regular, read_only)

+ create_user username password -role=ready_only

+ update_password new_password

+ destroy_user username

+ login username password

+ whoami

## File commands 

+ create_file file_1 "Contenido"

+ show file_1

+ metadata file_1

+ create_folder folder_1

+ cd folder_1

+ cd ..

+ destroy file_1 || folder_!

+ ls

+ whereami
