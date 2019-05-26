当基本类型的整数和浮点数不能满足使用时，那么还可以使用
`java.math`包中的两个类，`BigInteger`, `BigDecimal`。

BigInteger 实现了任意精度的整数运算。  
BigDecimal 实现了任意精度的浮点数运算。

- 使用静态方法`valueOf`方法，可以将基本类型转化为`大数值`。
```java
BigInteger a = BigIntger.valveOf(100);
```
- 算数运算时无法使用算数运算符，需使用具体对象方法。  

```java
BigInteger c = a.add(b);  //c = a + b

BigInteger d = c.multiply(b.add(BigIntger.valveOf(100))); 
//d = c * (b + 100);
```

