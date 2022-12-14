## 进程VS线程
**进程**
- 进程是对正在进行中的程序的一个抽象，是系统进行资源分配和调度的基本单位。操作系统的其他所有内容都是围绕进程展开的，负责执行这些任务的是CPU。
**线程**
线程是操作系统能够进行运算调度的最小单位，其是进程中的一个执行任务（控制单元），负责当前进程中程序的执行。
一个进程至少有一个线程，一个进程可以运行多个线程。
区别：
- 本质区别：进程是操作系统资源分配的基本单位，线程是任务调度和执行的基本单位。
- 开销方面：每个进程都有独立的代码和数据空间（程序上下文），程序之间的切换会有较大的开销；线程可以看作轻量级的进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器，线程之间切换开销小。
- 所处环境：在操作系统中能同时运行多个进程（程序）；而在同一个进程中有多个线程同时执行。
- 内存分配：系统在运行的时候会为每个进程分配不同的内存空间；而对线程来说，除了CPU，系统不会为线程分配内存（线程所使用的资源来自所属进程资源），线程之间只能共享资源。
- 包含关系：没有线程的进程可以看作单线程，如果一个进程内有多个线程，则执行过程不是一条线，而是多条线（多线程）共同完成的。