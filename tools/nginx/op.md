配置好配置文件后, 执行 `nginx`命令即可启动服务

服务启动后后续操作使用以下命令:
> nginx -s `signal`

signal 可以取以下值:
- `stop` — fast shutdown  
- `quit` — graceful shutdown
- `reload` — reloading the configuration file
- `reopen` — reopening the log files