linus一周完成了Git的数据模型设计——[一周的工程](https://lkml.org/lkml/2005/4/6/121)

但本质上git仍然是一个工具，一个版本控制工具

对于工具最原始的目的是为我所用，但随着使用的深入，如果不了解原理，遇到解决不了的问题会非常的难受和烦躁

显然Git已然是改变程序员工作方式的存在

轻度使用时，你可以仍然把她当作一个命令行的工具集来使用，如果没什么问题，那很好  

但如果重度使用，参与团队协作，你可能会遇到各种问题，也许google能解决问题，
但更好的方式是，对git做一次深入的学习，从原理上理解它的运行方式

贴一篇很有启发性的老文章[Git比你想象的简单](http://nfarina.com/post/9868516270/git-is-simpler)

这个系列，我就在做这样的一个尝试，然后留下一些东西备忘

主要参考内容：
- [Pro Git](https://progit.bootcss.com/#_getting_started)
- [Pro Git v2](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)
- [万能的stackoverflow](https://stackoverflow.com)