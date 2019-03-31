linux 作为一个多人多任务系统，用户管理和权限划分不可或缺

## 用户信息
每个用户都有两个ID标识
- UID (User ID)
- GID (Group ID)

用户ID可以理解，每个用户都是独一无二的  
至于群组ID，linux提供这样一种方式，
可以把一群人放在一组，相对其他组做权限隔离，个体可隶属多个群组  

信息记录：
- 所有的用户名信息都记录在 `/etc/passwd`
- 所有用户密码信息都记录在 `/etc/shadow`
- 所有的群组名都记录在 `/etc/group`

## 用户管理

### Add
`useradd` 和 `groupadd`

- 新增用户  
    `useradd <user_name>`   
- 新增用户组
    `groupadd <group_name>`

### password
`passwd` 命令
- 设置用户密码  
    `passwd <user_name>`  

### Delete
`userdel` 命令
- 删除用户
    `userdel <user_name>`
- 删除用户及其工作目录
    `userdel -r <user_name>`

### Modify
使用`usermod`命令
- 授予管理员权限(加到管理员组)
    `usermod -aG wheel|sudo <username>`




