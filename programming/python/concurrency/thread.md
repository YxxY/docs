Python提供高层模块 [threading](https://docs.python.org/3/library/threading.html)来实现多线程

## Thread 对象
实现多线程需要为每一个线程构造线程对象, 构造线程对象方法有两种
- 传递一个可调用对象给 `threading.Thread`类构造器
- 继承 `threading.Thread`类, 重写 `run`方法

一般采用第一种方法比较方便, 构造器类为 `class Thread(group=None, target=None, name=None, args=(), kwargs={}, *, daemon=None)`  
需要关注的参数有:
- target, 可调用对象, 会在 run方法里被调用, 一般为一个函数, 默认为 None, 即什么都不发生
- name, 线程名, 默认会生成一个不重复的线程名
- args, 传递给可调用对象的位置参数元组, 默认为 ()
- kwargs, 传递给可调用对象的关键字参数, 默认为 {}
- daemon, 是否显式的声明线程为守护线程, 默认会继承当前主线程的属性

### start()
启动线程活动, 一个线程对象只能调用一次

### join(timeout=None)
等待线程结束, 该方法会阻塞主线程直到 join()结束.  
`timeout` 参数单位为秒, 表示等待的超时时间.  
因为该方法的返回值总是为 None, 所以通常还会调用 `is_alive()`方法判断线程是否还在运行,
如果是则是说明超时了.

## Lock
多线程同步的时候会涉及到锁对象, theading 提供两种类型的锁可以用
- 基本类型锁, `threading.Lock`类的实例对象, 只有两种状态, `lock`和 `unlock`.  
    分别通过 `acquire()`和 `release()`方法获得和释放锁
- 可重入锁, `threading.RLock`类的实例对象, 提供和基本类型相同的方法来操作锁

