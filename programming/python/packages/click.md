`click` 是一个用来创建程序命令行接口的 python第三方包  
详情可参考 [官方文档](https://click.palletsprojects.com/en/master/)

主要有以下特点
- 可随意组合命令
- 自动生成 help说明
- 支持懒加载, 可在运行时生成子命令

安装: `pip install click`

## 示例
```python
# hello.py

import click

@click.command()
@click.option('--count', default=1, help='Number of greetings.')
@click.option('--name', prompt='Your name',
              help='The person to greet.')
def hello(count, name):
    """Simple program that greets NAME for a total of COUNT times."""
    for x in range(count):
        click.echo('Hello %s!' % name)

if __name__ == '__main__':
    hello()
```
- 运行 `python hello.py --count=3`, 结果如下:
    ```
    $ python hello.py --count=3
    Your name: John
    Hello John!
    Hello John!
    Hello John!
    ```
- 运行 `python3 hello.py --help`, 返回:
    ```
    $ python3 hello.py --help
    Usage: hello.py [OPTIONS]

      Simple program that greets NAME for a total of COUNT times.

    Options:
      --count INTEGER  Number of greetings.
      --name TEXT      The person to greet.
      --help           Show this message and exit.
    ```

## option
### 别名
```python
# test.py

@click.command()
@click.option('-s', '--string-to-echo') #支持长, 短参数
def echo(string_to_echo):
    click.echo(string_to_echo)

# 或者显示的指定一个不带短横杠前缀的参数
@click.command()
@click.option('--from', '-f', 'from_')
@click.option('--to', '-t')
def reserved_param_name(from_, to):
    click.echo('from %s to %s' % (from_, to))
```
使用时如下:
- 长参数: `python test.py --string-to-echo=xxx`
- 短参数: `python test.py -s xxx`

### 默认值
```python
@click.command()
@click.option('--n', default=1, show_default=True)
def dots(n):
    click.echo('.' * n)
```
```
$ dots --help
Usage: dots [OPTIONS]

Options:
  --n INTEGER  [default: 1]
  --help       Show this message and exit.
```
- 默认值支持布尔类型: True/False
- 还可以设置未一个函数实现动态默认值, 
    eg: `default=lambda: os.environ.get('USER', '')`

### 必要参数
```python
@click.command()
@click.option('--number', '-n', 'num', required=True, type=int)
def dots(num):
    click.echo('.' * num)

if __name__ == '__main__':
        dots()

```

### 多参数
```python
# test.py

@click.command()
@click.option('--pos', nargs=2, type=float)
def findme(pos):
    click.echo('%s / %s' % pos)

if __name__ == '__main__':
        findme()
```
```
$ python test.py --pos 1 2
1.0 / 2.0
```

### 多选项
```python
@click.command()
@click.option('--message', '-m', multiple=True)
def commit(message):
    click.echo('\n'.join(message))

```
```
$ commit -m foo -m bar
foo
bar
```

### 限定选项
指定选项值
```python
@click.command()
@click.option('--hash-type', type=click.Choice(['md5', 'sha1']))
def digest(hash_type):
    click.echo(hash_type)
```
给出选项范围
```python
@click.command()
@click.option('--count', type=click.IntRange(0, 20, clamp=True))
@click.option('--digit', type=click.IntRange(0, 10))
def repeat(count, digit):
    click.echo(str(digit) * count)

if __name__ == '__main__':
    repeat()
```
默认 `clamp`参数为 False, 表示如果超出指定范围则报错. 为 True时表示取当前范围的最大值

### 回调验证
```python
def validate_rolls(ctx, param, value):
    try:
        rolls, dice = map(int, value.split('d', 2))
        return (dice, rolls)
    except ValueError:
        raise click.BadParameter('rolls need to be in format NdM')

@click.command()
@click.option('--rolls', callback=validate_rolls, default='1d6')
def roll(rolls):
    click.echo('Rolling a %d-sided dice %d time(s)' % rolls)

if __name__ == '__main__':
    roll()
```

### 环境变量集成
指定单个环境变量
```python
@click.command()
@click.option('--username', envvar='USERNAME')
def greet(username):
    click.echo('Hello %s!' % username)

if __name__ == '__main__':
    greet()
```
多环境变量值
```python
@click.command()
@click.option('paths', '--path', envvar='PATHS', multiple=True,
              type=click.Path())
def perform(paths):
    for path in paths:
        click.echo(path)

if __name__ == '__main__':
    perform()
```
### 确认选项
```python
def abort_if_false(ctx, param, value):
    if not value:
        ctx.abort()

@click.command()
@click.option('--yes', is_flag=True, callback=abort_if_false,
              expose_value=False,
              prompt='Are you sure you want to drop the db?')
def dropdb():
    click.echo('Dropped all tables!')
```
```
$ dropdb
Are you sure you want to drop the db? [y/N]: n
Aborted!
$ dropdb --yes
Dropped all tables!
```

### 交互
```python
@click.command()
@click.option('--password', prompt=True, hide_input=True,
              confirmation_prompt=True)

def encrypt(password):
    click.echo('Encrypting password to %s' % password.encode('rot13'))
```

### 版本号
使用 `click.version_option`
```python
@click.version_option(version="1.0.0", prog_name="test")
```
自定义
```python
def print_version(ctx, param, value):
    if not value or ctx.resilient_parsing:
        return
    click.echo('Version 1.0')
    ctx.exit()

@click.command()
@click.option('--version', is_flag=True, callback=print_version,
          expose_value=False, is_eager=True)
def hello():
    click.echo('Hello World!')
```
- `is_flag`, 为 True表示不需要参数值, 出现即为 True, 否则为 False
- `expose_value`, 为 False阻止当前参数传递给目标函数
- `is_eager`, 为 True表示优先处理当前参数
