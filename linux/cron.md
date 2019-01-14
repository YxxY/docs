定时任务在linux上会经常用到  
一般会使用如下命令  
- `crontab -l` 查看当前用户的定时任务
- `crontab -e` 编辑当前用户定时任务

## 创建定时任务
使用
        
    crontab -e
也许会提示
> You (xxx) are not allowed to use this program (crontab)  
See crontab(1) for more information

那是因为当前用户还没被允许使用定时任务  

系统会按顺序查找以下两个文件
- `/etc/cron.allow` **允许**创建定时任务的用户列表
- `/etc/cron.deny`  **不允许**创建定时任务的用户列表

如果两个文件里都不存在当前用户名，那么就会出现之前的提示

解决方案也很简单，就把当前用户名添加到`/etc/cron.allow`中即可

    sudo echo <user_name> >> /etc/cron.allow

## 定时规则
定时规则一般形如：
```
*    *    *    *    *  command to be executed
-    -    -    -    -
|    |    |    |    |
|    |    |    |    +----- day of week (0 - 6) (Sunday=0)
|    |    |    +------- month (1 - 12)
|    |    +--------- day of month (1 - 31)
|    +----------- hour (0 - 23)
+------------- min (0 - 59)
```

举例说明  

|command| explain|
|:-------|:--------|
|`0  */2  *  *  *` |每两个小时执行一次命令| 
|`0  23-7/2，8  *  *  *`| 晚上 11 点到早上 7 点之间每 2 小时，早上 8 点|
|`0  11  4  *  1-3`|每个月的4号与每个星期一到星期三的早上 11 点|
|`0  4  1  1  *`|  1 月 1 日早上 4 点|

## 环境变量
定时任务执行时，当前进程的环境变量会失效，如果要使用到，需要手动指明

    *  *  *  *  * . /path/to/.profile; command to be executed

常用的比如当前用户的`.bashrc`文件，把需要用到的环境变量记录其中，然后以如上形式编写定时任务

## 定时任务日志
不同的发行版，日志位置可能不同，以centos为例  

系统级日志位于 `/var/log/cron`  
可用来确认定时任务是否启动

任务运行结束，会给当前用户发送邮件，位置在`/var/spool/mail/<curr_user>`  
会记录一些任务的打印

建议的方式是**重定向输出**日志

    *  *  *  *  *  command to be executed &> stdout.txt < /dev/null

