官方推荐的包管理工具, 类似于 Node.js里的 npm.

## 安装
- 通过 pip安装到用户空间
    - 执行命令 `pip3 install --user pipenv`
    - 由于不是全局安装,所以需要配置环境变量, 让 pipenv可用
        - linux下, 执行 `python -m site --user-base`, 将返回值下的 bin目录加到环境变量 PATH中  
            eg: `~/.local/bin`
        - widows下, 执行 `python -m site --user-site`, 将返回值的  site-packages替换为 Scripts添加到环境变量中  
            eg: `C:\Users\Username\AppData\Roaming\Python36\Scripts` 

## 使用
到项目目录下执行 `pipenv`可以查看命令行选项.  
- `pipenv install`, 类似于 pip install
- `pipenv shell`, 进入当前虚拟环境
- `pipenv run`, 在当前虚拟环境里运行命令
- `pipenv graph`, 查看依赖