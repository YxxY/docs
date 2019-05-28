线程(thread)和进程(process)的概念不在赘述。


## 构造线程类
Java 中提供`java.lang.Thread`类来构造和使用多线程
- Thread(Runnable target), 构建新线程 
- void start(), 启动新线程，调用run()方法，并发执行
- void join(), 等待线程结束
- void run(), 调用关联的 Runnable的 run方法
- static void sleep(long millis), 休眠

Thread 接受一个 `Runnable`对象参数返回一个线程对象，eg：`new Thread(Runnable_obj)`。  
接着调用 `start`方法启动该线程，并行执行。  
该方法实际调用的是 `run`方法，关联着 Runnable对象
的 run方法。**但不要直接调用 run方法**，直接调用只会在同一线程执行，不会开启新线程。

### Runnable 接口
`Runnable`接口只有一个run方法
```java
public interface Runnable{
    void run()
}
```
因此实现该接口的类，重写 run方法即可。

下面根据API编写一个测试类
```java
public class MyRunnable implements Runnable{
    private String name;

    public MyRunnable(String name){
        this.name = name;
    }

    @Override
    public void run(){
        for(int i = 0; i<5; i++){
            System.out.println(name + ":" + i);
            try {
	            Thread.sleep((int) Math.random() * 10);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
        	}
    	}
    }

    public static void main(String[] args){
        Thread thread1 = new Thread(new MyRunnable("A"));
        Thread thread2 = new Thread(new MyRunnable("B"));
        thread1.start();
        thread2.start();
    }
}
```
执行结果为:
```shell
B:0
A:0
B:1
A:1
B:2
A:2
B:3
A:3
B:4
A:4
```
上面的举例是标准的构建线程类对象的方法，当然也可以直接从 Thread类继承，然后编写 run方法，
最后调用 start方法启动线程。但这种方法不推荐使用。因为这样将要执行的任务和线程类强耦合在一起。
每一个线程任务都需要写一个 Thread 子类，不是很直观。



