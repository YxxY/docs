`/proc` 目录是linux下非常特殊的一个目录，它是一个虚拟文件系统，虚拟的原因是它里面并不包含真正的文件，使用文件查看命令会返回大量信息，但文件大小会显示 0 字节  

这些特殊文件是存储在RAM中，掉电内容即消失。它包含一些运行中的系统信息（内存，挂载设备，硬件配置等）

`/proc` 目录下包含很多数字命名的目录，每一个数字对应着一个实际运行的**进程ID**， 目录里的虚拟文件包含着当前进程的详细信息  
## 虚拟文件
> 这些虚拟文件的大小为0, 是怎么记录进程信息的呢？

答案是，这些文件的仅作指针，指向内核里真实存放这些信息的地址

举例说明，列举一个进程文件夹里的文件信息
```shell
total 0
-r--r--r--    1 root     root            0 Jan 19 15:02 cmdline
lrwxrwxrwx    1 root     root            0 Jan 19 15:02 cwd -> /
-r--------    1 root     root            0 Jan 19 15:02 environ
lrwxrwxrwx    1 root     root            0 Jan 19 15:02 exe -> /usr/sbin/sshd
dr-x------    2 root     root            0 Jan 19 15:02 fd
-r--r--r--    1 root     root            0 Jan 19 15:02 maps
-rw-------    1 root     root            0 Jan 19 15:02 mem
lrwxrwxrwx    1 root     root            0 Jan 19 15:02 root -> /
-r--r--r--    1 root     root            0 Jan 19 15:02 stat
-r--r--r--    1 root     root            0 Jan 19 15:02 statm
-r--r--r--    1 root     root            0 Jan 19 15:02 status
```

文件|内容信息  
--- |--- 
/proc/PID/cmdline |   进程启动的命令行参数  
/proc/PID/cpu |       当前和最后执行该进程的CPU  
/proc/PID/cwd |       链接到当前工作目录的软链接  
/proc/PID/environ |   环境变量值  
/proc/PID/exe |       当前进程的可执行路径  
/proc/PID/fd |        包含所有文件描述符的目录  
/proc/PID/maps |      可执行文件及库文件的内存映射表  
/proc/PID/mem |       当前进程的内存占用信息  
/proc/PID/root |      当前进程根目录  
/proc/PID/stat |      进程状态  
/proc/PID/statm |     进程内存状态信息  
/proc/PID/status |    进程状态以人类可读的形式展现  

以查看status文件内容举例
```shell
> cat status

ame: sshd
State: S (sleeping)
Tgid: 439
Pid: 439
PPid: 1
TracerPid: 0
Uid: 0 0 0 0
Gid: 0 0 0 0
FDSize: 32
Groups: 
VmSize:     2788 kB
VmLck:        0 kB
VmRSS:     1280 kB
VmData:      252 kB
VmStk:       16 kB
VmExe:      268 kB
VmLib:     2132 kB
SigPnd: 0000000000000000
SigBlk: 0000000000000000
SigIgn: 8000000000001000
SigCgt: 0000000000014005
CapInh: 0000000000000000
CapPrm: 00000000fffffeff
CapEff: 00000000fffffef
```

## 常用文件信息
- /proc/cpuinfo, CPU信息
- /proc/meminfo, 内存信息
- /proc/devices, 内核已加载的设备驱动信息
- /proc/filesystems, 内核已配置/支持的文件系统
