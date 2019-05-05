## 进程状态
进程常见的几种状态：
State|Meaning
-----|:-----
D | Uninterruptible sleep (usually IO)
S | Interruptible sleep(waiting for an event to complete)
R | Running
T | Stopped (usually stopped by job control signal)
Z | Zombie, terminated but not reaped by its parent
X | dead (should never be seen)

状态的相互转化：  
![process-state](img/process-state.png)

## 僵尸进程杀不掉的原因
此时进程已经释放所有的资源，但是没有被父进程释放。僵尸进程要等到父进程结束，或者重启系统才可以被释放。  
进程处于“核心态”，并且在等待不可获得的资源，处于“核心态 ”的资源默认忽略所有信号。只能重启系统。