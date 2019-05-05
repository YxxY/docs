inode 是linux中标识文件的元数据，每一个文件会对应一个inode

## 查看文件inode信息
> `stat <filename>`

```sh
$ stat test.sh
  File: ‘test.sh’
  Size: 2641            Blocks: 8          IO Block: 4096   regular file
Device: fd02h/64770d    Inode: 67197706    Links: 1
Access: (0775/-rwxrwxr-x)  Uid: ( 1001/    sora)   Gid: ( 1001/    sora)
Access: 2019-04-12 10:50:56.403622019 +0800
Modify: 2019-04-12 10:50:55.081595253 +0800
Change: 2019-04-12 10:50:55.086595354 +0800
 Birth: -
```

包含的信息有：
- File，文件名（非完整路径）
- Size, 文件大小，字节数
- Access，文件操作权限
- Uid, 文件拥有者user id
- Gid, 文件拥有者group id
- Inode号码
- links，文件链接数
- 时间戳，atime（最后访问时间），mtime（内容最后修改时间），ctime（inode最后修改时间）
- 文件数据存储信息

### Blocks
文件存储在磁盘上，磁盘最小的存储单位是**扇区**（sector），大小为 512字节（0.5kb）  
读取磁盘信息时一次会读取多个连续扇区，这种多个扇区的组成成为**块**（block），
一般是 8个扇区组成一个块，即 4096个字节，也就是 4kb

### inode 号码
每一个inode都有一个唯一的inode号码。操作系统使用该号码识别不同的文件    
查看文件inode号码，除了使用 `stat`命令之外还可以使用`ls -i`
```sh
$ ls -i test.sh
67197706 test.sh
```
用户通过文件路径打开文件。然而操作系统的底层操作如下：
- 找到这个文件的inode号
- 根据inode号码获取完整的inode信息
- 根据inode信息，找到文件数据所在的block，读取数据

## inode存储位置
inode 也是存储在磁盘上，但是分开存储的。磁盘格式化时会分为两个区域：
- 数据区，存放文件数据
- inode 区，存放inode 信息

一个inode信息一般为 128字节/256字节。格式化时就确定了inode的总数量。  

查询每个磁盘分区的 inode数量和已使用的数量，使用 `df -i`命令
```sh
$ df -i
Filesystem       Inodes  IUsed    IFree IUse% Mounted on
/dev/vda2      31200768 318001 30882767    2% /
devtmpfs         998832    354   998478    1% /dev
tmpfs           1001289      1  1001288    1% /dev/shm
tmpfs           1001289    516  1000773    1% /run
tmpfs           1001289     16  1001273    1% /sys/fs/cgroup
/dev/vda1        256000    328   255672    1% /boot
tmpfs           1001289      1  1001288    1% /run/user/1001
```

由于inode 数量有限，磁盘大小也有限。因此二者任意一个用完就不能再创建新文件了

## 目录文件
目录也是一种文件，打开目录，实际上就是打开目录文件。  
目录文件的内容及所包含的文件名及对应的inode号。  
因此，**目录的读写权限都是针对目录文件本身**。如果要或者目录下详细文件信息（除了文件名及inode号），
则需要目录文件的**执行权限**

## Tips
- 有时文件名含有特殊字符，无法正常删除是，自己删除 inode节点也能起到删除文件的作用
    - `find -inum 67197706 -delete`
- 移动，重命名文件等只是改变文件名，不影响inode号码

