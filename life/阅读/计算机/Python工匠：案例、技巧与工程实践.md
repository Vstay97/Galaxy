---
title: Python工匠：案例、技巧与工程实践
description: 本书基于受欢迎的“Python工匠”系列开源文章。全书从工程实践角度出发，通过剖析核心知识、展示典型案例与总结实用技巧，帮助大家系统进阶Python，写好工程代码，做好实践项目。  本书共计13章，分为五大部分：变量与基础类型、语法结构、函数与装饰器、面向
keywords:
  - Python工匠：案例、技巧与工程实践
  - 计算机
tags:
  - 阅读
author: Vstay
date: 2023-07-17
---

## 简介

- **书名**：《Python工匠：案例、技巧与工程实践》
- **作者**： 朱雷
- **分类**： 计算机-编程设计
- **ISBN**：9787115584045
- **出版社**：人民邮电出版社有限公司

## 概述

本书基于受欢迎的“Python工匠”系列开源文章。全书从工程实践角度出发，通过剖析核心知识、展示典型案例与总结实用技巧，帮助大家系统进阶Python，写好工程代码，做好实践项目。  本书共计13章，分为五大部分：变量与基础类型、语法结构、函数与装饰器、面向对象编程、总结与延伸，涵盖Python编程的方方面面。本书的写作方式别具一格，核心知识点都会通过三大板块来阐述：基础知识、案例故事、编程建议。其中基础知识帮助大家快速回顾Python基础；案例故事由作者经历的编程项目与案例改编而来，兼具实战性与趣味性；编程建议以大家喜闻乐见的条目式知识点呈现，短小精悍，可直接应用于自己的编程实践中。

## 划线 
 

> 即便两个人实现同一个功能，最终效果看上去也一模一样，但代码质量却可能有着云泥之别。 

> 我前前后后读过一些书——《代码大全》《重构》《设计模式》《代码整洁之道》——毫无疑问，它们都是领域内首屈一指的经典好书，我从中学到了许多知识，至今受益匪浅。 

> 编程是一个通过代码来表达思想的过程。 

> 变量与注释是作者表达思想的基础，是读者理解代码的第一道门，它们对代码质量的贡献毋庸置疑。 

> 除了上面的普通解包外，Python还支持更灵活的动态解包语法。只要用星号表达式（*variables）作为变量名，它便会贪婪[插图]地捕获多个值对象，并将捕获到的内容作为列表赋值给variables。 

> 在常用的诸多变量名中，单下划线_是比较特殊的一个。它常作为一个无意义的占位符出现在赋值语句中。_这个名字本身没什么特别之处，这算是大家约定俗成的一种用法。 

> 相比编写Sphinx格式文档，我其实更推荐使用类型注解，因为它是Python的内置功能，而且正在变得越来越流行。 

> 因此，我强烈建议在多人参与的中大型Python项目里，至少使用一种类型注解方案——Sphinx格式文档或官方类型注解都行。 

> 计算机科学领域只有两件难事：缓存失效和命名。 

> 描述代码为什么要这么做，而不是简单复述代码本身。 

> 指引性注释。这种注释并不直接复述代码，而是简明扼要地概括代码功能，起到“代码导读”的作用。 

> 这些变化让整段代码变得更易读，也让整个算法变得更好理解。所以，哪怕是一段不到10行代码的简单函数，对变量和注释的不同处理方式，也会让代码发生质的变化 

> 喜欢把所有变量初始化定义写在一起，放在函数最前面 

> 总是从代码的职责出发，而不是其他东西。 

> 直接翻译业务逻辑的代码，大多不是好代码。优秀的程序设计需要在理解原需求的基础上，恰到好处地抽象，只有这样才能同时满足可读性和可扩展性方面的需求 

> 定义一个临时变量”是诸多方式里不太起眼的一个，但用得恰当的话效果也很巧妙。 

> 函数内变量的数量太多，通常意味着函数过于复杂，承担了太多职责。只有把复杂函数拆分为多个小函数，代码的整体复杂度才可能实现根本性的降低。 

> 这样的代码就像删掉赘语的句子，变得更精练、更易读。 

> 在编写了许多函数以后，我总结出了一个值得推广的好习惯：先写注释，后写代码。 

> 在写出一句有说服力的接口注释前，别写任何函数代码。 

> 在定义数值字面量时，如果数字特别长，可以通过插入_分隔符来让它变得更易读 

> True和False这两个布尔值可以直接当作1和0来使用 

> f-string格式化方式用起来最方便 

> 首先创建一个空列表，然后把需要拼接的字符串都放进列表，最后调用str.join来获得大字符串 

> 把数字字面量改成常量和枚举类型后，我们就能很好地规避输入错误问题。同样，把字符串字面量改写成枚举类型，也可以获得这种好处 

> 如果需要验证某个“经验之谈”，dis和timeit两个优秀的工具可以帮到你：前者能让你直接查看编译后的字节码，后者则能让你方便地做性能测试。 

> Python里的字典在底层使用了哈希表（hash table）数据结构。当你往字典里存放一对key: value时，Python会先通过哈希算法计算出key的哈希值——一个整型数字；然后根据这个哈希值，决定数据在表里的具体位置。 

> 集合只能存放可哈希对象 

> 当我们把某个对象放进集合或者作为字典的键使用时，解释器都需要对该对象进行一次哈希运算，得到哈希值，然后再进行后面的操作。 

> 虽然都是返回结果，但yield和return的最大不同之处在于，return的返回是一次性的，使用它会直接中断整个函数执行，而yield可以逐步给调用方生成结果： 

> 我们有时会过于喜欢用not关键字，反倒忘记了运算符本身就可以表达否定逻辑。最后，代码里会出现许多下面这种判断语句： 

> 异常处理对于我来说，就是一些不想做却又不得不做的琐事 

> 在Python世界里，EAFP指不做任何事前检查，直接执行操作，但在外层用try来捕获可能发生的异常。如果还用下雨举例，这种做法类似于“出门前不看天气预报，如果淋雨了，就回家后洗澡吃感冒药”。 

> Python里的函数可以一次返回多个值（通过返回一个元组实现）。所以，当我们要表明函数执行出错时，可以让它同时返回结果与错误信息。 

> 新函数拥有更稳定的返回值类型，它永远只会返回Item类型或是抛出异常。· 虽然我们鼓励使用异常，但异常总是会不可避免地让人“感到惊讶”，所以，最好在函数文档里说明可能抛出的异常类型。· 不同于返回值，异常在被捕获前会不断往调用栈上层汇报。因此create_item()的直接调用方也可以完全不处理CreateItemError，而交由更上层处理。异常的这个特点给了我们更多灵活性，但同时也带来了更大的风险。具体来说，假如程序缺少一个顶级的统一异常处理逻辑，那么某个被所有人忽视了的异常可能会层层上报，最终弄垮整个程序。 

> 上下文管理器功能强大、用处很多，其中最常见的用处之一，就是简化异常处理工作。 

> 除了应该避免抛出高于当前抽象级别的异常外，我们同样应该避免泄露低于当前抽象级别的异常 

> 在数据校验这块，pydantic模块是一个不错的选择。 

> 在编写代码时，我们应当尽量避免手动校验任何数据。因为数据校验任务独立性很强，所以应该引入合适的第三方校验模块（或者自己实现），让它们来处理这部分专业工作。 

> 可迭代对象不一定是迭代器，但迭代器一定是可迭代对象；· 对可迭代对象使用iter()会返回迭代器，迭代器则会返回其自身；· 每个迭代器的被迭代过程是一次性的，可迭代对象则不一定；· 可迭代对象只需要实现__iter__方法，而迭代器要额外实现__next__方法。 

> 生成器（generator）利用其简单的语法，大大降低了迭代器的使用门槛，是优化循环代码时最得力的帮手。 

> enumerate()是Python的一个内置函数，它接收一个可迭代对象作为参数，返回一个不断生成(当前下标,当前元素)的新可迭代对象。 

> “修饰可迭代对象”是指用生成器（或普通的迭代器）在循环外部包装原本的循环主体，完成一些原本必须在循环内部执行的工作——比如过滤特定成员、提供额外结果等，以此简化循环代码。 

> product()接收多个可迭代对象作为参数，然后根据它们的笛卡儿积不断生成结果： 

> 用product()优化函数里的嵌套循环 

> takewhile(predicate, iterable)会在迭代第二个参数iterable的过程中，不断使用当前值作为参数调用predicate()函数，并对返回结果进行真值测试，如果为True，则返回当前值并继续迭代，否则立即中断本次迭代。 

> for循环（和while循环）后的else关键字，代表如果循环正常结束（没有碰到任何break），便执行该分支内的语句。因此，老式的“循环+标记变量”代码，就可以利用该特性简写为“循环+else分支” 

> 因为Python语言不支持“带标签的break”语句[插图]，无法用一个break跳出多层循环。 

> 为了规避这个问题，使用None来替代可变类型默认值是比较常见的做法： 

> 当你要调用参数较多（超过3个）的函数时，使用关键字参数模式可以大大提高代码的可读性。 

> 每个函数只返回一种类型，变得更简单易用。 

> 适合返回None的函数需要满足以下两个特点：（1）函数的名称和参数必须表达“结果可能缺失”的意思；（2）如果函数执行无法产生结果，调用方也不关心具体原因。 

> 除了“搜索”“查询”几个场景外，对绝大部分函数而言，返回None并不是一个好的做法。 

> 在编写函数时，请不要纠结函数是不是应该只有一个return，只要尽早返回结果可以提升代码可读性，那就多多返回吧。 

> 为了简化函数调用，让代码更简洁，我们其实可以定义一个接收单个参数的double()函数，让它通过multiply()完成计算：def double(value):    # 返回 multiply 函数调用结果    return multiply(2, value)# 调用代码变得更简单result = double(value)val = double(number) 

> 原来，在使用re.sub(pattern, repl, string)函数时，第二个参数repl不光可以是普通字符串，还可以是一个可调用的函数对象。 

> 截至上一个问题，小R所写的mosaic_matchobj()函数只是一个无状态函数。但为了满足新需求，小R需要调整mosaic_matchobj()函数，把它从一个无状态函数改为有状态函数。 

> 闭包是一种非常有用的工具，非常适合用来实现简单的有状态函数。 

> 权衡了这三种方案的利弊后 

> 别写太复杂的函数 

> Python里的递归因为缺少语言层面的优化，局限性较大。当你想用递归来实现某个算法时，请先琢磨琢磨是否能用循环来改写。如果答案是肯定的，那就改成循环吧。 

> 装饰器并不提供任何独特的功能，它所做的，只是让我们可以在函数定义语句上方，直接添加用来修改函数行为的装饰器函数 

> 装饰器是一种通过包装目标函数来修改其行为的特殊高阶函数，绝大多数装饰器是利用函数的闭包原理实现的。 

> 添加@wraps(wrapped)来装饰decorated函数后，wraps()首先会基于原函数func来更新包装函数decorated的名称、文档等内置属性，之后会将func的所有额外属性赋值到decorated上 

> 所以，装饰器的优势并不在于它提供了动态修改函数的能力，而在于它把影响函数的装饰行为移到了函数头部，降低了代码的阅读与理解成本。 

> （1） 运行时校验：在执行阶段进行特定校验，当校验通不过时终止执行。· 适合原因：装饰器可以方便地在函数执行前介入，并且可以读取所有参数辅助校验。· 代表样例：Django框架中的用户登录态校验装饰器@login_required。（2） 注入额外参数：在函数被调用时自动注入额外的调用参数。· 适合原因：装饰器的位置在函数头部，非常靠近参数被定义的位置，关联性强。· 代表样例：unittest.mock模块的装饰器@patch。（3） 缓存执行结果：通过调用参数等输入信息，直接缓存函数执行结果。· 适合原因：添加缓存不需要侵入函数内部逻辑，并且功能非常独立和通用。· 代表样例：functools模块的缓存装饰器@lru_cache。（4） 注册函数：将被装饰函数注册为某个外部流程的一部分。· 适合原因：在定义函数时可以直接完成注册，关联性强。· 代表样例：Flask框架的路由注册装饰器@app.route。（5）替换为复杂对象：将原函数（方法）替换为更复杂的对象，比如类实例或特殊的描述符对象（见12.1.3节）。· 适合原因：在执行替换操作时，装饰器语法天然比foo = staticmethod(foo)的写法要直观得多。· 代表样例：静态类方法装饰器@staticmethod。在设计新的装饰器时，你可以先参考上面的常见装饰器功能列表，琢磨琢磨自己的设计是否能很好地发挥装饰器的优势。切勿滥用装饰器技术，设计出一些天马行空但难以理解的API。吸取前人经验，同时在设计上保持克制，才能写出更好用的装饰器。 

> 私有属性是“君子协定” 

> 在Python里，所有的类属性和方法默认都是公开的，不过你可以通过添加双下划线前缀__的方式把它们标示为私有。 

> 和普通方法相比，静态方法不需要访问实例的任何状态，是一种与状态无关的方法，因此静态方法其实可以改写成脱离于类的外部普通函数。 

> 使用@property装饰器，你可以把上面的get_basename()方法变成一个虚拟属性，然后像使用普通属性一样使用它 

> @property是个非常有用的装饰器，它让我们可以基于方法定义类属性，精确地控制属性的读取、赋值和删除行为，灵活地实现动态属性等功能。 

> 在超过90%的情况下，你能找到的合理的Python代码就如上所示：没有任何类型检查，想做什么就直接做。你肯定想问，假如调用方提供的fp参数不是文件对象怎么办？答案是：不怎么办，直接报错就好。示例如下。 

> 总结一下，抽象类通过__subclasshook__钩子和.register()方法，实现了一种比继承更灵活、更松散的子类化机制，并以此改变了isinstance()的行为。 

> super()使用的其实不是当前类的父类，而是它在MRO链条里的上一个类。 

> 大多数情况下，你需要的并不是多重继承，而也许只是一个更准确的抽象模型，在该模型下，最普通的继承关系就能完美解决问题。 

> 元类控制着类的创建行为，就像普通类控制着实例的创建行为一样。 

> 但继承是一种类与类之间紧密的耦合关系。让子类继承父类，虽然看上去毫无成本地获取了父类的全部能力，但同时也意味着，从此以后父类的所有改动都可能影响子类。继承关系越复杂，这种影响就越容易超出人们的控制范围。 

> 针对事物的行为建模，而不是对事物本身建模。 

> 在多数情况下，基于事物的行为来建模，可以孵化出更好、更灵活的模型设计。 

> 即使B和A是同类，那它们真的需要用继承来表明类型关系吗？要知道，Python是鸭子类型的，你不用继承也能实现多态。 

> 多态（polymorphism）是面向对象编程的基本概念之一。它表示同一个方法调用，在运行时会因为对象类型的不同，产生不同效果。 

> SOLID单词里的5个字母，分别代表5条设计原则。· S：single responsibility principle（单一职责原则，SRP）。· O：open-closed principle（开放–关闭原则，OCP）。· L：Liskov substitution principle（里式替换原则，LSP）。· I：interface segregation principle（接口隔离原则，ISP）。· D：dependency inversion principle（依赖倒置原则，DIP）。 

> 单一职责是面向对象领域的设计原则，通常用来形容类。而在Python中，单一职责的适用范围不限于类——通过定义函数，我们同样能让上面的代码符合单一职责原则。 

> 这世间唯一不变的，只有变化本身。 

> 虽然继承功能强大，但它并非通往OCP的唯一途径。除了继承外，我们还可以采用另一种思路：组合（composition）。更具体地说，使用基于组合思想的依赖注入（dependency injection）技术 

> 但是，如果少了PostFilter抽象类，当编写HNTopPostsSpider类的__init__方式时，我就无法给post_filter增加类型注解了——post_filter: Optional[这里写什么？]，因为我根本找不到一个具体的类型。 

> 但数据驱动也有一个缺点：它的可定制性不如其他两种方式。举个例子，假如我想以“链接是否以某个字符串结尾”来进行过滤，现在的数据驱动代码就做不到。影响每种方案可定制性的根本原因在于，各方案所处的抽象级别不一样。比如，在依赖注入方案下，我选择抽象的内容是“条目过滤行为”；而在数据驱动方案下，抽象内容则是“条目过滤行为的有效站点地址”。很明显，后者的抽象级别更低，关注的内容更具体，所以灵活性不如前者。 

> LSP认为，所有子类（派生类）对象应该可以任意替代父类（基类）对象使用，且不会破坏程序原本的功能。 

> 在Python 3.8版本里，类型注解typing模块增加了一个名为“协议”（Protocol）的类型。从各种意义上来说，Protocol都比抽象类更接近传统的“接口”。 

> 更丰富的接口协议，意味着更高的实现成本，也更容易给实现方带来麻烦。 

> 描述符（descriptor）是Python对象模型里的一种特殊协议，它主要和4个魔法方法有关： __get__、__set__、__delete__和__set_name__。从定义上来说，除了最后一个方法__set_name__以外，任何一个实现了__get__、__set__或__delete__的类，都可以称为描述符类，它的实例则叫作描述符对象。 

> 现在你应该明白了，一个对象的__del__方法，并非在使用del语句时被触发，而是在它被作为垃圾回收时触发。del语句无法直接回收任何东西，它只是简单地删掉了指向当前对象的一个引用（变量名）而已 

> TDD（test-driven development，测试驱动开发）是由Kent Beck提出的一种软件开发方式。在TDD工作流下，要对软件做一个改动，你不会直接修改代码，而会先写出这个改动所需要的测试用例。TDD的工作流大致如下：（1）写测试用例（哪怕测试用例引用的模块根本不存在）；（2）执行测试用例，让其失败；（3）编写最简单的代码（此时只关心实现功能，不关心代码整洁度）；（4）执行测试用例，让测试通过；（5）重构代码，删除重复内容，让代码变得更整洁；（6）执行测试用例，验证重构；（7）重复整个过程。 

> 你应该了解这些理论，越多越好，但是千万不要陷入教条主义。因为在现实世界里，每个人参与的项目千差万别，别人的理论不一定适用于你，如果盲目遵从，反而会给自己增加麻烦。

## 笔记


> 编程最初带给我们的快乐已悄然远去，写代码这件事现在变得有些痛苦。更有甚者，一想到项目里的烂代码，每天起床后最想干的一件事就是辞职。

💭 哈哈哈真实

> 所以简单来说，抽象就是一种选择特征、简化认知的手段。接下来，我们看看抽象与软件开发的关系。

💭 抽离出来普遍具有的特征现象

> 如果某个函数的圈复杂度超过10，就代表它已经太复杂了，代码编写者应该想办法简化。优化写法或者拆分成子函数都是不错的选择。

💭 代码复杂度

> 当看到一只鸟走起来像鸭子、游泳起来像鸭子、叫起来也像鸭子，那么这只鸟就可以称为鸭子。
——来自“鸭子类型”的维基百科词条

💭 鸭子类型

> 所有与数据模型有关的方法，基本都以双下划线开头和结尾，它们通常被称为魔法方法（magic method）。

💭 魔法方法

> 所以，写单元测试不是浪费时间，也不会降低开发效率。你在单元测试上花费的那点儿时间，会在未来的日子里为项目的所有参与者节约不计其数的时间。

💭 重要的单元测试

> 不要掉进完美主义的陷阱。

💭 不要让完美主义成为你的绊脚石！

## 书评


## 点评
