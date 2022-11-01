## MVVM
是Model，View，ViewModel 的缩写，View代表视图层，Model代表数据模型层，ViewModel待变数据视图层，视图与数据模型通过ViewModel进行交互，它能够监听到数据的变化，然后通知视图的更新，相反，也能监听到视图的变化，而通知数据更新。实际上是数据的双向绑定。
优点：
- 低耦合：View可以独立于Model变化和修改，一个View可以绑定不同的View上，当View变化的时候，Model可以不改变，当Model变化的时候View也可以不改变。
- 可重用行：可以把一些视图逻辑放在ViewModel里，让View重用这段视图逻辑
- 独立开发：开发人员可以专注于业务逻辑和数据的开发。

## MVC
Model，View，Controller。View一般通过Controller来和Model进行联系，Controller是View和Model的协调者，是业务逻辑，通常负责从视图读取数据，控制用户输入，并向模型发送数据。MVC是单向通信，也就是View根Model必须通过Controller来承上启下