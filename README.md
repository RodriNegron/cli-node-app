# cli-node-app  [[NODE JS]](https://nodejs.org/es/)
NodeJs Command line app for users and files management 

# Running

```
node index.js
```
> default admin user: username = admin, password = admin 

## For data persistence

### `persisted` 

```
node index.js -persisted file_name
```
> If file doesn't exist, system creates a new file, if it does exist system will read data from it. 

> Data persistance on JSON format. Example:
```
[
  {
    "name": "name",
    "files": []
  },
  {
    "userList": [
      {
        "userName": "userName",
        "password": "password",
        "role": "role"
      }
    ],
    "loggedUser": null
  }
]
```
## Available User Commands 

### `create_user` 

```
create_user username password -role=ready_only 
```

> roles = super, regular, read_only 

> Only users with "super" role can use this command

+ Creates a new user

### `update_password` 

```
update_password newpassword
```
+ Update user logged password 

### `destroy_user` 

```
destroy_user username
```
> Only users with "super" role can use this command 

+ Delete one user by name

### `login` 

```
login username password
```

+ Log in to the system

### `logout` 

```
logout
```
+ Finish current user session

### `whoami` 

```
whoami
```
+ Shows username for the current user

## Available File Commands 

### `create_file` 

```
create_file name content
```
> Only users with "super" or "regular" role can use this command 

+ Creates one file

### `show` 

```
show file_name
```
+ Show file name

### `metadata` 

```
metadata name
```
+ Show metadata for the file provided name

### `create_folder` 

```
create_folder name
```
> Only users with "super" or "regular" role can use this command 

+ Create a new directory

### `cd` 

```
cd directory_name
```
+ Change directory by name


### `..` 

```
cd ..
```
+ Move one directory back

### `destroy` 

```
destroy name
```
+ Delete one directory / file by name

### `ls` 

```
ls
```
+ List all files / folders in the current directory

### `whereami` 

```
whereami
```
+ Show current directory path


-------------------------------------
