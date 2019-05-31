多线程操作时是无法保证执行顺序的，然而有一些连续操作是必须被同步执行的，否则的话会产生不可预知的错误。 

举例来说，存钱和取钱，假设原账户有 1000块钱，存取各一个线程，每次存取10块。存取各操作 10000次，
理论上余额应该还是 1000块的。

eg：
```java

class Singleton {   
    private static Singleton obj = new Singleton(1000);
    private int total;

    private Singleton(int init) {
    	total = init;
    }
    public void increment(int num){
    	total += num;
    }
    public void decrement(int num){
    	total -= num;
    }
    public int getTotal(){
    	return total;
    }
    public static Singleton getSingleton(){
        return obj;
    }
}

class Increment implements Runnable{
	private Singleton obj;
	private int num;
	private int loop;
	public Increment(Singleton init, int num, int loop){
		obj = init;
		this.num = num;
		this.loop = loop;
	}
	public void run(){
		for(int i=0; i<loop; i++){
			obj.increment(num);
			try {
	            Thread.sleep((int) Math.random() * 10);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
        	}
		}
	}
}

class Decrement implements Runnable{
	private Singleton obj;
	private int num;
	private int loop;

	public Decrement(Singleton init, int num, int loop){
		obj = init;
		this.num = num;
		this.loop = loop;
	}

	public void run(){
		for(int i=0; i<loop; i++){
			obj.decrement(num);
			try {
	            Thread.sleep((int) Math.random() * 10);
	        } catch (InterruptedException e) {
	            e.printStackTrace();
        	}
		}
	}
}

public class MultiThreadWithoutLock{

	public static void main(String[] args) throws InterruptedException{
		Singleton obj = Singleton.getSingleton();
		Thread t1 = new Thread(new Increment(obj, 10, 10000));
		Thread t2 = new Thread(new Decrement(obj, 10, 10000));
		System.out.println(obj.getTotal());  //1000
		t1.start();
		t2.start();
		t1.join();
		t2.join();
		System.out.println(obj.getTotal());  // not 1000
	}
}

```

随着循环次数越大，离预期值差距越大。原因是在调用具体的增和减方法时，一次调用还未结束时，total值
已被另一个方法调用改变了。  
```java
    public void increment(int num){
    	total += num;
    }
    public void decrement(int num){
    	total -= num;
    }
```
就此例来说可能存在如下情况：初始值为 1000，正在执行减 10的操作时，另一个加 10的操作启动并结束，将总数更新为 1010。  
减操作完成时 总数更新为 1000。 而正确的值应该是 990。  
为了避免这种情况产生，就必须保证，只有当前增或减操作完成时才能进行另一个操作。

## synchronized
Java 提供两种机制可以防止代码受到并发访问的干扰。  
一个是 `synchronized`关键字。这是一个 JVM级别的实现，自动提供一个锁和相关条件，对于大部分需要显示锁的情况使用非常便利。

上例中操作数据的方法改成如下即可保证正常逻辑
```java
    public synchronized void increment(int num){
    	total += num;
    }
    public synchronized void decrement(int num){
    	total -= num;
    }
```

## ReentrantLock
除此之外，也可以自行实现锁的操作。 Java SE 5.0 之后引入了 `java.util.locks`框架，
提供具体的锁对象实现。  
具体包括
- `java.util.locks.Lock`类
    - `void lock()`, 获取锁，如果锁被其它线程占用则发生阻塞
    - `void unlock()`, 释放锁
- `java.util.locks.ReentrantLock`类, 实现了 Lock接口
    - `ReentrantLock()`, 构建一个可以保护临界区的可重入锁，返回一个 `Lock`类型对象
    - `ReentrantLock(boolean fair)`, 构建一个带有公平策略的锁，偏爱已等待时间最长的线程。  
        但这一策略会大大降低性能，所以一般默认为非公平锁

使用时代码结构如下：
```java
myLock.lock(); // a ReentrantLock obj
try{
    //statement
}finally{
    myLock.unlock();
}
```
