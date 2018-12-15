Git 的基本使用包括几个高层命令，在完成git的安装和配置后即可展开

## 连接至服务器
创建一个ssh key用作鉴权

    ssh-keygen
使用默认配置即可，秘钥会生成到用户home目录下的.ssh文件夹里，会生成两个文件。  
一个是私钥，另一个公钥，更加使用的算法不同，生成的文件名不同，一般默认是 RSA 算法，所以文件名为`id_rsa`以及`id_rsa.pub`。  
复制**公钥`id_rsa.pub`**里的内容到服务端保存即可。

## 建立仓库
git大部分操作，都是在本地  
本地仓库可以通过`git init`自己建, 也可以使用`git clone`从远程仓库拉取。  
- `git init`会默认创建一个`master`的当前分支  
- `git clone <remote url>`会同步远程的分支  

查看本地及远程分支
> git branch -a

查看远程仓库地址
> git remote -v

如果是自建的本地仓库，后期可能需要添加远程仓库
> git remote add `<name>` `<url>`

也可以修改远程仓库的地址，指向别的仓库
> git remote set-url `<name>` `<url>`

更多远程仓库操作，可参考
> git help remote

## 提交
提交分两种，提交到暂存(`git add`)和提交到版本库(`git commit`)。  
暂存区的可以让使用者决定哪些内容需要被版本管理，也提供提交前多次修改的机会。  

?> 推荐的方式是，将需要被版本管理的文件先加到暂存区，再从暂存区提交到版本库   

当然也可以使用
> git commit -a

跳过暂存区，直接将`已被版本管理的内容`提交到版本库


## 同步更新






## Remote
> git help remote

- git remote [-v | --verbose]
- git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=<fetch|push>] <name> <url>
- git remote rename <old> <new>
- git remote remove <name>
- git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
- git remote set-branches [--add] <name> <branch>…​
- git remote get-url [--push] [--all] <name>
- git remote set-url [--push] <name> <newurl> [<oldurl>]
- git remote set-url --add [--push] <name> <newurl>
- git remote set-url --delete [--push] <name> <url>
- git remote [-v | --verbose] show [-n] <name>…​
- git remote prune [-n | --dry-run] <name>…​
- git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)…​]

### git remote
无参数，显示存在远程仓库列表，一般只有一个，名字通常叫 `origin`

### 
