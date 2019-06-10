## Git 安装
以centos为例

    sudo yum install git
如果你在基于 Debian 的发行版上，请尝试用 apt-get

    sudo apt-get install git

windows用户下载安装包安装,官方下载地址[http://git-scm.com/download/win](http://git-scm.com/download/win)  
也可以安装`Github for Windows`, 里面集成了GUI和命令行的git， 下载地址见[http://windows.github.com/](http://windows.github.com/)

## Git 配置
每台计算机上只需要配置一次，程序升级时会保留配置信息。 你可以在任何时候再次通过运行命令来修改它们。

Git 自带一个 `git config` 的工具来帮助设置控制 Git 外观和行为的配置变量。   
这些变量存储在三个不同的位置：
- `/etc/gitconfig` 文件，对系统上每一个用户及他们的所有仓库均生效
    - 使用时带 `--system` 选项，它会从此文件读写配置变量
- `~/.gitconfig` or  `~/.config/git/config` 文件，**只针对当前用户生效**
    - 传递`--global` 选项让 Git 读写此文件
- `.git/config`当前使用仓库的 Git 目录中的 config 文件，**只针对当前仓库生效**
    - 使用时不带任何参数选项

!> 每一个级别覆盖上一级别的配置，所以 `.git/config` 的配置变量会覆盖 `/etc/gitconfig` 中的配置变量。

?> 在 Windows 系统中，Git 会查找 $HOME 目录下（一般情况下是 `C:\Users\$USER`）的 .gitconfig 文件。   

运用git config命令的作用是修改文件里的变量，也可以直接编辑对应目录下的文件内容完成配置

### 用户信息
用户信息是必要配置，包含用户名和邮箱，该信息会写入到每一次提交中，且不可更改。

根据配置部分的规则，一般使用如下配置
>$ git config --global user.name "John Doe"  
>$ git config --global user.email johndoe@example.com

使用了 `--global` 选项，那么当前用户下所有git操作都会使用该配置。  

!> 如果想针对特定项目使用不同的用户名称与邮件地址时，可以在那个项目目录下运行没有 --global 选项的命令来配置

### 配置别名
按照个人喜好添加别名，在对应配置文件中追加如下内容

    [alias]
	st = status
    addd = add -A
    cmt = commit
    lg = log --pretty=format:'%C(auto) %h | %ai | %Cred %an %Cgreen %s'
	ct = checkout 

也可以通过命令行来配置
    
    git config --global alias.co checkout  
    git config --global alias.br branch  


### 查看配置
运行命令

    git config --list
可以查看在当前目录下git能找到的配置信息  

可能会看到重复的变量名，因为 Git 会从不同的文件中读取同一个配置（例如：/etc/gitconfig 与 ~/.gitconfig）。 这种情况下，后面的变量会覆盖前面的值。

> `git config <key>` 可查看具体的配置值， eg： `git config user.name`



## 命令行帮助
一般完善的命令行工具都会提供命令行帮助，git也不例外。
当有问题时，应该首先查看帮助，其次才是诉诸于搜索引擎  

当忘记git中命令的使用方法时，可以使用
> `git help <verb> `  
> `git <verb> --help`

eg：

    git status --help