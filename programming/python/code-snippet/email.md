
python 发邮件

```python
#!/usr/bin/env python2
# coding=utf8

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.header import Header

HEADER = 'Email Header'
SENDER = 'yourself@email.com'
RECEIVER = ['mail-list']
CC = []
SMTP_SERVER = '10.20.116.61'
SMTP_PORT = 8025

def send_email(html_content):
    sender = SENDER
    to_receiver = RECEIVER
    cc_receiver = CC

    receivers = to_receiver + cc_receiver

    message = MIMEMultipart()

    message['From'] = sender
    message['Subject'] = Header(HEADER, 'utf-8')

    message['To'] = ";".join(to_receiver)
    message['Cc'] = ";".join(cc_receiver)

    message.attach(MIMEText(html_content, 'html', 'utf-8'))

    ## attachment
    # attachment = MIMEText(open('test.txt', 'rb').read(), 'base64', 'utf-8')
    # attachment["Content-Type"] = 'application/octet-stream'
    # attachment["Content-Disposition"] = 'attachment; filename="失败详情.csv"'
    # message.attach(attachment)

    try:
        smtp_obj = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        smtp_obj.sendmail(sender, receivers, message.as_string())
        print "邮件发送成功"
    except smtplib.SMTPException as e:
        print "Error: 无法发送邮件"
        print e


if __name__ == "__main__":
    send_email()
```