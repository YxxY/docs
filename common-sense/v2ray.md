嗯，这年头科学上网很重要  

## 准备条件
1. 要有一台国外的云主机
2. 该云主机具备国内能访问的静态公网ip

购买云主机途径有很多
- 收费方案  
    阿里云，[平安云](https://yun.pingan.com/)等云厂商处购买香港，台湾或国外的云主机  
- 免费方案  
    [Openshift](https://www.openshift.com/) 可免费托管一个项目  
    Google, AWS也都有免费12个月的云服务试用方案


## v2ray
### 参考文档
- [v2ray 官方文档](https://www.v2ray.com/)
- [v2ray 白话文教程](https://toutyrater.github.io/)

### 使用
仅从使用角度来看，安装 v2ray 之后仅需完成一些配置项就可以了  

举例自己的配置如下
```json
{
    "log": {
        "loglevel": "warning"
    },
    "inbound": {
        "port": 1080,
        "listen": "0.0.0.0",
        "domainOverride": [
            "tls",
            "http"
        ],
        "protocol": "http",
        "settings": {
            "auth": "noauth",
            "udp": true,
            "ip": "0.0.0.0"
        }
    },
    "outbound": {
        "protocol": "vmess",
        "settings": {
            "vnext": [
                {
                    "address": "Server Domain",
                    "port": 39379,
                    "users": [
                        {
                            "id": "your uuid, keep the same as the server side",
                            "level": 1,
                            "security": "aes-128-gcm",
                            "alterId": 99
                        }
                    ]
                }
            ]
        },
        "mux": {
            "enabled": true
        },
        "proxySettings": {
            "tag": "gost"
        }
    },
    "routing": {
        "strategy": "rules",
        "settings": {
            "domainStrategy": "IPOnDemand",
            "rules": [
                {
                    "type": "field",
                    "ip": [
                        "0.0.0.0/8",
                        "10.0.0.0/8",
                        "100.64.0.0/10",
                        "127.0.0.0/8",
                        "169.254.0.0/16",
                        "172.16.0.0/12",
                        "192.0.0.0/24",
                        "192.0.2.0/24",
                        "192.168.0.0/16",
                        "198.18.0.0/15",
                        "198.51.100.0/24",
                        "203.0.113.0/24",
                        "::1/128",
                        "fc00::/7",
                        "fe80::/10",
                        "127.0.0.1"
                    ],
                    "outboundTag": "direct"
                },
                {
                    "domain": [
                        "amazon.com",
                        "microsoft.com",
                        "jd.com",
                        "youku.com",
                        "baidu.com"
                    ],
                    "type": "field",
                    "outboundTag": "direct"
                }
            ]
        }
    },
    "policy": {
        "levels": {
            "0": {
                "uplinkOnly": 0
            }
        }
    },
    "outboundDetour": [
        {
            "protocol": "socks",
            "settings": {
                "servers": [
                    {
                        "address": "127.0.0.1",
                        "port": 1085
                    }
                ]
            },
            "tag": "gost"
        },
        {
            "protocol": "freedom",
            "settings": {},
            "tag": "direct"
        }
    ]
}
```
### 代理
内网使用的时候一般都会有代理，这里使用了一个小工具`gost`配置代理并转发所有流量  
详情可Github搜索gost 关键字即可，使用十分简单  
如果无需代理，删掉`proxySettings`的配置即可