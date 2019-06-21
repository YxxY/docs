[requests](https://2.python-requests.org/en/master/) 是 Python的第三方 HTTP库, 封装良好, 提供了易用
的API.  
学习这个库可以使用 [https://httpbin.org](https://httpbin.org) 来 mock测试, 但国内的访问有点慢, 可以本地部署后使用

## 发送请求
`requests.METHOD(url: str) -> response_obj`  
`METHOD` 即对应 HTTP协议里的请求方法
```python
>>> import requests
>>> r = requests.get('https://httpbin.org/get')
```

### 传递URL参数
`requests.METHOD(url: str, params=dict) -> response_obj`  
`params` 参数是给 URL传参, 如果传递的字典值为 None, 则**不会传递**
```python
>>> payload = {'key1': 'value1', 'key2': ['value2', 'value3']}
>>> r = requests.get('https://httpbin.org/get', params=payload)
>>> r.url
'https://httpbin.org/get?key1=value1&key2=value2&key2=value3'
>>> r = requests.get('https://httpbin.org/get', params={'key1': 'value1', 'key2': None})
>>> r.url
'https://httpbin.org/get?key1=value1'
```

### 传递请求参数
`POST` 等请求方法需要使用 `data`参数来传递额外的请求参数  
`requests.METHOD(url: str, data=params) -> response_obj`  
- data 参数为 list, tuple, dict等时默认以 form形式编码
    ```python
>>> payload_tuples = [('key1', 'value1'), ('key1', 'value2')]
>>> r1 = requests.post('https://httpbin.org/post', data=payload_tuples)
>>> payload_dict = {'key1': ['value1', 'value2']}
>>> r2 = requests.post('https://httpbin.org/post', data=payload_dict)
>>> print(r1.text)
{
  ...
  "form": {
    "key1": [
      "value1",
      "value2"
    ]
  },
  ...
}
>>> r1.text == r2.text
True
    ```
- data 为字符串时, 会被直接发送
    ```python
>>> payload = {'some': 'data'}
>>> r = requests.post('https://httpbin.org/post', data=json.dumps(payload))
>>> print(r.text)
{
  "args": {},
  "data": "{\"some\": \"data\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Content-Length": "16",
    "Host": "httpbin.org",
    "User-Agent": "python-requests/2.22.0"
  },
  "json": {
    "some": "data"
  },
  "url": "https://httpbin.org/post"
}
    ```
    如果字符串为json格式编码的, 也可以直接使用 json参数:     
    `requests.post(url, json=payload)`

### 定制请求头


## 解析响应
