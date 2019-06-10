Git 的基本使用包括几个高层命令，在完成git的安装和配置后即可展开

## 连接至服务器
创建一个ssh key用作鉴权

    ssh-keygen
使用默认配置即可，秘钥会生成到用户home目录下的.ssh文件夹里，会生成两个文件。  
一个是私钥，另一个公钥，更加使用的算法不同，生成的文件名不同，一般默认是 RSA 算法，所以文件名为`id_rsa`以及`id_rsa.pub`。  
复制**公钥`id_rsa.pub`**里的内容到服务端保存即可。

## 建立本地仓库
git大部分操作，都是在本地  
本地仓库可以通过`git init`自己建, 也可以使用`git clone`从远程仓库拉取。  
- `git init`会默认创建一个`master`的当前分支  
- `git clone <remote url>`会同步远程的分支  

## 提交
提交分两种
- `git add` 提交到暂存
- `git commit` 提交到版本库

暂存区的可以让使用者决定哪些内容需要被版本管理，也提供提交前多次修改的机会。  

> **推荐的方式是**，将需要被版本管理的文件先加到暂存区，再从暂存区提交到版本库   

当然也可以使用 `git commit -a`  
跳过暂存区，直接将`已被版本管理的内容`提交到版本库

## 对比
对比变化改动  
- **工作区 vs 暂存区**
    > `git diff`

- **工作区 vs 已提交版本**
    > `git diff <commit_hash_id>`

- **暂存区 vs 已提交版本**
    > `git diff --cached <commit_hash_id>`

- **对比不同提交版本之间的差异**
    > `git diff <commit_hash_id_1> <commit_hash_id_2>`

- **local vs remote**
    1. 先使用`git fetch`下载远程提交  
    2. > `git diff <local_branch> <remote>/<remote_branch>`  

    eg: git diff master origin/master

- **使用图形界面工具**

    - 需先配置git difftool,  eg: 使用vscode, 配置如下

            [diff]
                tool = default-difftool
            [difftool "default-difftool"]
                cmd = code --wait --diff $LOCAL $REMOTE

    将以上配置，追加到全局`.gitconfig`文件中  
    使用和diff 一样，只是用`git difftool`代替`git diff`

## 撤销回退
- **覆盖上一次提交**  
    即对最近一次的提交做修改  
    使用 `git commit --amend`替换上一次的提交
- **撤销暂存区的文件**  
    即把已经加入到暂存区的文件，移出暂存区  
    使用 `git reset HEAD <file>`
- **撤销工作区的改动**  
    文件出入修改状态（不在暂存区），撤销所有改动  
    使用 `git checkout -- <file>`
- **版本回退**  
    根据版本哈希值可以回退到任意版本  
    使用`git reset <hash_id>`  or `git reset HEAD~<N>` or `git reset HEAD^`
    > 默认是`--mixed`选项，回退到指定版本，清空暂存，工作区内容不变，效果相当于撤销当前版本之后的提交

    > 另外还有`--soft`选项，和默认选项的区别是: **`保留暂存区内容`**

    > `--hard`选项，与迷人选项的区别是，**`工作区内容变化`**，同步当前版本库里内容完全覆盖工作区里的内容

## 打标签
给特定提交添加特别标识  
- **查看标签**
    - `git tag` 查看已有标签，
    - 支持匹配模式`git tag -l|--list "<pattern>"`

- **创建标签**  
    标签分两种，一个是轻量级别，只包括标签名。另一种是注释标签，除了名字还可以添加注释  
    > `git tag <tag_name> [hash_id]` 创建轻量标签 

    > `git tag -a <tag_name> [-m <msg>] [hash_id]` 创建注释标签

    默认是给**当前提交**打标签，也可以给出具体提交的哈希值，给已经提交的版本打标签  
    可以给一个提交**打多个标签**  
    > `git show <tag_name>` 可查看具体的标签信息

- **推送标签**  
    标签是存在本地，默认提交时不会推送到远程  
    > `git push origin <tag_name>`可以共享单个具体标签  

    > `git push origin --tags`共享所有标签  

- **删除标签**  
    - 删除本地标签 
        > `git tag -d tag_name`  
    - 删除已推送的远程标签
        1. 先删除本地标签
        2. `git push origin : refs/tags/<tag_name>`

## 远程仓库
- **查看远程仓库地址**
    > git remote -v

- **给本地仓库添加远程仓库链接**
    > git remote add `<name>` `<url>`

- **修改远程仓库的地址，指向别的仓库**
    > git remote set-url `<name>` `<url>`

- **删除远程仓库链接**
    > git remote remove `<name>`

## 同步更新
如果本地仓库已配置远程仓库地址， 通过`git remote -v`可以看到两个地址  
一个是fetch， 一个是push时的地址  
当与他人合作开发需拉取远程仓库最新提交时，可运行`git fetch`  

这个操作只是把远程提交存储到本地，并没有和本地的提交合并，合并有两个选择
- `git merge`
- `git rebase`

根据团队的需求使用即可，一般直接使用`git pull`，即选择的是第一种方案

## 保留工作区
有时需要临时解决其他问题，工作区的改动不适合提交，那么就可以先保留现场，解决其他问题后再来恢复  
- `git stash` 保存现场
- `git stash list` 查看保留区
- `git stash apply [stash@{<index}>]` 恢复现场
- `git stash drop [stash@{<index}>]` 删除保留，
- `git stash pop` 恢复并删除， 默认使用 stash@{0}

## 分支
- **查看当前分支**
    > `git branch`
- **查看所有分支**
    > `git branch -a`
- **创建分支**
    > `git branch <branch_name>` 基于当前提交创建分支
- **切换分支**
    > `git checkout <branch_name>`

    > `git checkout -b <branch_name>` 基于当前提交创建并切换分支 
    
    > `git checkout -b <branch_name> <tag_name>` 基于标签名创建并切换分支 
- **删除分支**
    > `git branch -d <branch_name>` 删除已合并的分支

    > `git branch -D <branch_name>` 强制删除未合并的分支
