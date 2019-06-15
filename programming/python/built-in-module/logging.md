日志打印是常见的需求, 如果只是打印到控制台, 可以使用 `print()`函数. 另外, `logging`模块提供更丰富的日志输出功能.  

## 基本使用
### 打印等级
```python
import logging

logging.debug('this is a debug')
logging.info('this is a info')
logging.warning('this is a warning')
logging.error('this is a error')
logging.critical('this is a critical')
```
打印等级分五种, 依次上升, 上述代码输出为
```
WARNING:root:this is a warning
ERROR:root:this is a error
CRITICAL:root:this is a critical
```
不存在debug和info的打印, 因为默认的打印等级为 `warning`, 只有高于或等于该等级才会有输出.  
也可以修改该等级配置, 通过调用 [basicConfig()](https://docs.python.org/3/library/logging.html#logging.basicConfig), 如下:
```python
import logging
logging.basicConfig(level=logging.DEBUG)

logging.debug('this is a debug')
logging.info('this is a info')
```

### 输出到文件
同样修改配置文件即可, 通过 `basicConfig()`, 指定 `filename`参数
```python
import logging
logging.basicConfig(filename='example.log', level=logging.DEBUG)

logging.debug('this is a debug')
logging.info('this is a info')
```
控制台不再有输出, 所有内容输出到文件中, 需要注意的是: 
如果 filename指定的路径文件夹不存在会抛出 `FileNotFoundError`, 文件不存在会自动创建

#### filemode
`basicConfig(**kwargs)` 配置时, 还可以指定 `filemode`参数, 默认为 `a`, 即增量模式.  
可以自定义为 `w`, 即覆盖模式

### 自定义日志格式
同上, 在 `basicConfig(**kwargs)`里指定 `format`参数, 自定义日志输出格式. eg:
- `logging.basicConfig(format='%(levelname)s:%(message)s')`, 输出打印等级和日志内容
- `format='%(asctime)s %(message)s'`, 输出日志时间和内容
- `%(module)s`, 模块名, 一般为调用处的文件名
- `%(name)s`, 用户自定义的 logger对象名
- `%(lineno)d`, 表示输出打印的代码所在文件的行号
- `%(process)d %(processName)s`, 进程号, 进程名(如果有)
- `%(thread)d %(threadName)s`, 线程号, 线程名(如果有)

完整的配置见 [logrecord-attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes)

eg:
```python
# main.py

import logging
logging.basicConfig(level=logging.DEBUG, 
	format='%(asctime)s %(levelname)-8s \
[%(module)s:%(lineno)d] [%(name)s] [%(processName)s:%(process)d] \
[%(threadName)s:%(thread)d]: %(message)s')

import sub_logger

logger = logging.getLogger(__name__)


logger.debug('this is a debug')
logger.info('this is a info')
logger.warning('this is a warning')
logger.error('this is a error')
logger.critical('this is a critical')
```
```python
#sub_logger.py
import logging

logger = logging.getLogger(__name__)

logger.info('this is sub logger')
```
执行 `python3 main.py`:
```
2019-06-15 15:55:12,463 INFO     [sub_logger:5] [sub_logger] [MainProcess:5844] [MainThread:1128]: this is sub logger
2019-06-15 15:55:12,469 DEBUG    [main:12] [__main__] [MainProcess:5844] [MainThread:1128]: this is a debug
2019-06-15 15:55:12,472 INFO     [main:13] [__main__] [MainProcess:5844] [MainThread:1128]: this is a info
2019-06-15 15:55:12,476 WARNING  [main:14] [__main__] [MainProcess:5844] [MainThread:1128]: this is a warning
2019-06-15 15:55:12,477 ERROR    [main:15] [__main__] [MainProcess:5844] [MainThread:1128]: this is a error
2019-06-15 15:55:12,478 CRITICAL [main:16] [__main__] [MainProcess:5844] [MainThread:1128]: this is a critical
```

## 高级使用
整个 logging库也是采用模块化方法实现的, 大致分为以下几个部分
- `Loggers`, 暴露接口给外部应用代码直接调用
- `Handlers`, 分发日志内容(loggers产生的)发送到具体的位置
- `Filters`, 过滤器, 定义日志输出的过滤规则
- `Formatters`, 最终输出时定义日志的格式

### Loggers
之前调用的 `logging.info()`等方法, 实际上是通过执行 `Logger`实例对象的方法实现.
#### 创建 logger对象
创建 logger实例通常通过 `logging.getLogger()`方法:
- `getLogger()` 如果**不提供参数或空字符串**时会返回 `root logger`(名字为 root). 为 `logging.RootLogger`的实例.  
    也可以通过 `logging.root`获取该对象
- 提供**自定义名称**会获取/创建对应名字的对象. 为 `logging.Logger`的实例.  
    **以相同的名称参数多次调用会返回同一对象**
- 每个实例都用一个名字, 对应的命名空间, eg: `foo` 名字的 logger对象是 `foo.bar`的父级, 这个关系可用于后续过滤.  
    一个模块一个独立的日志对象可使用 `logger = logging.getLogger(__name__)`
- **所有的 logger都是 `root logger`的子级**

#### 设置 level等级
给 logger设置一个 level等级, 那么只有高于或等于该等级的日志才会被处理  
提供 `logger.setLevel()`方法设置
- `logger.setLevel(logging.DEBUG)`
- 3.2 版本之后也可以使用 `logger.setLevel('INFO')`的方式

#### propagate 属性
该属性默认为 True, 会将当前 logger对象的所有信息传递给高层(父级)的 logger处理, 
无视该 logger上的打印等级以及其它过滤规则. 处理完之后再传递给自身的 handler处理

### Handlers
`handler` 对象会根据日志的等级分发日志的输出位置, eg: 控制台还是文件或者其它网络位置等.  
可以在 `logger`对象上添加 **0个或多个** `handler`, 通过 `logger.addHandler(handler)`方法
#### handler 对象
常见的 handler有 `logging.FileHandler` 和 `logging.StreamHandler` 的实例对象.  
标准库里还有很多其它有用的 handler:
- [RotatingFileHandler](https://docs.python.org/3/library/logging.handlers.html#logging.handlers.RotatingFileHandler), 
    按照指定大小切割文件
- [TimedRotatingFileHandler](https://docs.python.org/3/library/logging.handlers.html#logging.handlers.TimedRotatingFileHandler), 
    按时间划分日志文件

完整的 handler列表见 [useful handlers](https://docs.python.org/3/howto/logging.html#useful-handlers)  
相应的类文档 [handlers class](https://docs.python.org/3/library/logging.handlers.html)

#### 对象方法
##### setLevel()
handler对象也有一个 `setLevel`方法, 它需要和 logger里的同名方法配合使用, 因为数据是流式处理的, 先到 logger再到 handler, 任何一个 level不达标都不会按照预期输出

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)

logger.addHandler(handler)

logger.debug('this is debug message')
```
上例会输出到标准输出, 但如果 logger或 handler 任意一个的 level 高于 debug都不会有任何输出

##### setFormatter()
在 handler对象上添加后续格式化处理

##### addFilter()
在 handler对象上添加过滤器

#### 再看 basicConfig
回过头来看基本使用里 `basicConfig(**kwargs)`, 它做的事情就是:  
**如果 `root logger`没有任何handler**, 就创建一个 `StreamHandler` handler, 设置默认的 formatter, 然后添加到 `root logger`中, 因为后续创建的 logger均为它的子级, 由于 `propagate`属性默认为 True, 所以他们都会复用该 handler

### Formatters
格式化输出是最后的步骤, 完成对信息片段顺序, 结构和内容的处理.  
使用上是实例化一个 `logging.Formatter`对象 formatter, 调用 `handler.setFormatter(formatter)`方法传递给 handler对象. 

初始化方法为 `logging.Formatter.__init__(fmt=None, datefmt=None, style='%')`  

```python
import logging

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

handler = logging.StreamHandler()
handler.setLevel(logging.DEBUG)

formatter = logging.Formatter('%(asctime)s %(levelname)-8s \
[%(module)s:%(lineno)d] [%(name)s] [%(processName)s:%(process)d] \
[%(threadName)s:%(thread)d]: %(message)s')

handler.setFormatter(formatter)

logger.addHandler(handler)


logger.debug('this is debug logger')

# output
# 2019-06-15 17:31:47,133 DEBUG    [sub_logger:18] [__main__] [MainProcess:1984] [MainThread:13880]: this is debug logger

```
`fmt`的全部可用参数见 [logrecord-attributes](https://docs.python.org/3/library/logging.html#logrecord-attributes)

### Filters
`filter` 对象可以在 `logger`或 `handler`对象上调用 `addFilter()`方法注册, 从而完成后续过滤功能

#### filter 对象
过滤功能是通过 logger日志定义的名称完成的, eg: 初始化一个 filter为 `A.B`, 那么它仅允许名称为 `A.B`开头(eg: A.B, A.B.C)的 logger完成打印, 不满足条件的都会被过滤.

因此, 初始化非常简单, `logging.Filter(name='')`, 默认的name为空字符, 即所有的打印都会通过

### 总流程图
![logging_flow](../img/logging_flow.png)

## 配置函数
logging 模块的使用还提供面向配置的使用方式, 省区调用 API的复杂过程.  
配置的提供方式有三种:
- 通过一个字典对象
- 配置文件的形式
- 启动一个服务器, 监听端口, 接收网络传输过来的配置

### dictConfig
通过调用 `logging.config.dictConfig(config)`方法加载配置, 完整的配置字段见[config schema](https://docs.python.org/3/library/logging.config.html#logging-config-dictschema)

大致如下:
- `version`, 目前只能为数字 1, 作用时保持兼容性.  
    **只有该参数为必要参数, 其它均为可选**
- `formatters`, 参数值也为一个字典, 对应的每一个Key为一个id, Value 用来配置对应的 Formatter实例, 
    - `format`, 指定格式
    - `datefmt`, 默认为 None  
    eg:
    ```js
    'formatters': {
        'standard': {
            'format': '[%(levelname)s][%(asctime)s][%(filename)s:%(lineno)d] %(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'simple': {
            'format': '[%(levelname)s][%(asctime)s] %(message)s'
        },
    },
    ```
- `handlers`, 同上, 参数值也为一个字典, key-value 对应一个 id和它要创建的 Handler实例
    - `class`, 必要参数, 对应具体的 Handler类
    - `level`, 可选参数, 对应 handler对象的 level
    - `formatter`, 可选参数, 对应已定义 formatter对象的 id
    - `filters`, 可选参数, 对应已定义的 filter对象的 id列表
    - 其它参数依赖于使用的 `Handler`类的实例化参数
    eg:
    ```js
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': logconfig.log,
            'maxBytes': 1024*1024*5,
            'backupCount': 5,
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
    },
    ```
- `filters`, 同上, 定义过滤器
- `loggers`, 同上, 定义具体的 logger, 一般仅定义 `root logger`即可, 其它logger会有继承的效果
    - `level`, 可选参数
    - `propagate`, 可选参数
    - `filters`, 可选参数
    - `handlers`, 可选参数
- `root`, root logger的专属配置
- `incremental`, 布尔值, 是否覆盖已有配置, 默认为 False
- `disable_existing_loggers`, 布尔值, 是否禁用所有非 root logger, 默认为 True.

#### 示例
```js
{
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'standard': {
            'format': standard_format,
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'simple': {
            'format': id_simple_format
        },
    },
    'filters': {},
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'default': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': logfile_path,
            'maxBytes': 1024*1024*5,
            'backupCount': 5,
            'formatter': 'standard',
            'encoding': 'utf-8',
        },
    },
    'loggers': {
        '': {
            'handlers': ['default', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}
```

### fileConfig
通过调用 `fileConfig(fname, defaults=None, disable_existing_loggers=True)`方法加载配置  

因为我个人觉得这种方式没有对象的方式灵活, 所以没有在实际中使用

详情参考 [config-fileformat](https://docs.python.org/3/library/logging.config.html#logging-config-fileformat)


## 最佳实践
以配置文件的方式来写一个最佳实践吧, 完成一个 `logger.py`模块的编写, 
功能如下:
- 同时支持精简地标准输出和详细地文件输出
- 支持错误日志的单独输出
- 支持文件按大小切割
- 支持文件按日期切割

```python
# logger.py

import os
import logging.config

__all__ = ['logging']


SIMPLE_FORMAT = '%(asctime)-s %(levelname)-s: %(message)s'

VERBOSE_FORMAT = '%(asctime)-s [%(module)s:%(lineno)d] \
[%(name)s] [%(processName)s:%(process)d] \
[%(threadName)s:%(thread)d] [%(levelname)-s]: %(message)s'

# default file path
LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../logs')
if not os.path.isdir(LOG_DIR):
    os.mkdir(LOG_DIR)

LOG_FILE_PATH = os.path.join(LOG_DIR, 'trace.log')
ERROR_LOG_FILE_PATH = os.path.join(LOG_DIR, 'error.log')


# rotation
BACKUP_COUNT = 10

## file size rotation
MAX_FILE_SIZE = 1024 * 1024 * 10

## file time rotation
WHEN = 'D' # D, H, M, S
INTERVAL = 1

dict_config  = {
	'version': 1,
	# 'disable_existing_loggers': True,
	'formatters': {
        'verbose': {
            'format': VERBOSE_FORMAT,
            'datefmt': '%Y-%m-%d %H:%M:%S',
        },
        'simple': {
            'format': SIMPLE_FORMAT
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'file-size-rotation': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': LOG_FILE_PATH,
            'maxBytes': MAX_FILE_SIZE,
            'backupCount': BACKUP_COUNT,
            'formatter': 'verbose',
            'encoding': 'utf-8',
        },
        'error-file-rotation': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': ERROR_LOG_FILE_PATH,
            'maxBytes': MAX_FILE_SIZE,
            'backupCount': BACKUP_COUNT,
            'formatter': 'verbose',
            'encoding': 'utf-8',
        },
        'file-time-rotation': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': LOG_FILE_PATH,
            'when': WHEN,
            'interval': INTERVAL,
            'backupCount': BACKUP_COUNT,
            'formatter': 'verbose',
            'encoding': 'utf-8',
        },
    },
    'filters':{
    	'root_only': {
    		'name': 'root'
    	},
    	'debug_only': {
    		'name': 'debug'
    	}
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['console', 'file-time-rotation', 'error-file-rotation'],
    }
}


logging.config.dictConfig(dict_config)
```
调用时
```python
from logger import logging
import time

logger = logging.getLogger()

logger.info('anything you want')

```