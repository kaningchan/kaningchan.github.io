---
title: Meta Quest 3 使用 WebXR 采集数据
date: 2026-09-29
description: 记录在 Meta Quest 3 上使用 WebXR 采集设备位姿与交互数据的方法
---

# Meta Quest 3 使用 WebXR 采集数据

### 在 Linux 中配置 USB 设备权限

- 查找设备 VendorID 及 ProductID
  ```bash
  $ lsusb
  ```

- 会有以下输出，记录 `Oculus VR, Inc. Quest 3` 的 ID 信息
  ```
  Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
  Bus 001 Device 002: ID 046d:c534 Logitech, Inc. Unifying Receiver
  Bus 001 Device 003: ID 8087:0026 Intel Corp. AX201 Bluetooth
  Bus 002 Device 001: ID 1d6b:0003 Linux Foundation 3.0 root hub
  Bus 002 Device 003: ID 2833:5013 Oculus VR, Inc. Quest 3
  ```

- 创建 `udev` 规则文件
  ```bash
  $ sudo gedit /etc/udev/rules.d/89-oculus.rules
  ```

- 添加规则
  ```ini
  SUBSYSTEM=="usb", ATTR{idVendor}=="VendorID", ATTR{idProduct}=="ProductID", MODE="0666", GROUP="plugdev"
  ```

- 重新加载 `udev` 规则
  ```bash
  $ sudo udevadm control --reload-rules
  $ sudo udevadm trigger
  ```

### 安装 ADB
  ```bash
  $ sudo apt-get install adb
  ```

### 启动 adb server
  ```bash
  $ adb start-server
  ```

### 在 Quest 3 中允许 USB 调试
![](https://i.imgur.com/0J0uRP0.jpeg)

### 建立网络端口反向映射
  ```bash
  $ adb reverse tcp:8765 tcp:8765
  $ adb reverse tcp:8766 tcp:8766
  ```

### 启动 HTTP 服务器
  ```bash
  $ python3 -m http.server 8765
  ```

### 开启 Websocket 服务器接收数据
  ```bash
  $ python3 webxr_server.py
  ```

### Quest 3 中访问网页 `http://localhost:8765`
![](https://i.imgur.com/0mZ1I76.jpeg)

### 根据需求选择不同的网页
![](https://i.imgur.com/Yo21Quh.png)
![](https://i.imgur.com/uzHxrit.png)
![](https://i.imgur.com/LiRDD8R.png)

### Websocket 服务器终端会输出手部或手柄追踪数据

```
{"timestamp":1783592212310,"joints":[{"hand":"left","joint":"wrist","position":{"x":-0.144,"y":0.84,"z":-0.166},"orientation":{"x":0.093,"y":-0.243,"z":-0.008,"w":0.965},"radius":0.021},{"hand":"left","joint":"thumb-metacarpal","position":{"x":-0.103,"y":0.825,"z":-0.188},"orientation":{"x":0.203,"y":-0.444,"z":-0.671,"w":0.558},"radius":0.019},{"hand":"left","joint":"thumb-phalanx-proximal","position":{"x":-0.078,"y":0.813,"z":-0.205},"orientation":{"x":0.101,"y":-0.304,"z":-0.678,"w":0.662},"radius":0.012},{"hand":"left","joint":"thumb-phalanx-distal","position":{"x":-0.06,"y":0.803,"z":-0.232},"orientation":{"x":0.104,"y":-0.357,"z":-0.725,"w":0.579},"radius":0.01},{"hand":"left","joint":"thumb-tip","position":{"x":-0.045,"y":0.794,"z":-0.25},"orientation":{"x":0.104,"y":-0.357,"z":-0.725,"w":0.579},"radius":0.009},{"hand":"left","joint":"index-finger-metacarpal","position":{"x":-0.11,"y":0.834,"z":-0.192},"orientation":{"x":0.093,"y":-0.243,"z":-0.008,"w":0.965},"radius":0.021},{"hand":"left","joint":"index-finger-phalanx-proximal","position":{"x":-0.078,"y":0.848,"z":-0.239},"orientation":{"x":-0.094,"y":-0.177,"z":-0.076,"w":0.977},"radius":0.01},{"hand":"left","joint":"index-finger-phalanx-intermediate","position":{"x":-0.066,"y":0.84,"z":-0.274},"orientation":{"x":-0.614,"y":-0.112,"z":-0.135,"w":0.77},"radius":0.009},{"hand":"left","joint":"index-finger-phalanx-distal","position":{"x":-0.065,"y":0.817,"z":-0.279},"orientation":{"x":-0.817,"y":-0.04,"z":-0.162,"w":0.552},"radius":0.008},{"hand":"left","joint":"index-finger-tip","position":{"x":-0.07,"y":0.796,"z":-0.273},"orientation":{"x":-0.817,"y":-0.04,"z":-0.162,"w":0.552},"radius":0.007},{"hand":"left","joint":"middle-finger-metacarpal","position":{"x":-0.126,"y":0.838,"z":-0.197},"orientation":{"x":0.093,"y":-0.243,"z":-0.008,"w":0.965},"radius":0.021},{"hand":"left","joint":"middle-finger-phalanx-proximal","position":{"x":-0.098,"y":0.854,"z":-0.248},"orientation":{"x":-0.282,"y":-0.15,"z":-0.057,"w":0.946},"radius":0.011},{"hand":"left","joint":"middle-finger-phalanx-intermediate","position":{"x":-0.087,"y":0.831,"z":-0.282},"orientation":{"x":-0.788,"y":-0.087,"z":-0.121,"w":0.597},"radius":0.008},{"hand":"left","joint":"middle-finger-phalanx-distal","position":{"x":-0.089,"y":0.804,"z":-0.275},"orientation":{"x":-0.97,"y":0.024,"z":-0.084,"w":0.225},"radius":0.008},{"hand":"left","joint":"middle-finger-tip","position":{"x":-0.094,"y":0.792,"z":-0.253},"orientation":{"x":-0.97,"y":0.024,"z":-0.084,"w":0.225},"radius":0.007},{"hand":"left","joint":"ring-finger-metacarpal","position":{"x":-0.141,"y":0.841,"z":-0.204},"orientation":{"x":0.093,"y":-0.243,"z":-0.008,"w":0.965},"radius":0.019},{"hand":"left","joint":"ring-finger-phalanx-proximal","position":{"x":-0.118,"y":0.85,"z":-0.252},"orientation":{"x":-0.339,"y":-0.136,"z":-0.012,"w":0.931},"radius":0.01},{"hand":"left","joint":"ring-finger-phalanx-intermediate","position":{"x":-0.108,"y":0.826,"z":-0.28},"orientation":{"x":-0.854,"y":-0.101,"z":-0.05,"w":0.507},"radius":0.008},{"hand":"left","joint":"ring-finger-phalanx-distal","position":{"x":-0.108,"y":0.802,"z":-0.267},"orientation":{"x":-0.995,"y":-0.06,"z":-0.053,"w":0.062},"radius":0.007},{"hand":"left","joint":"ring-finger-tip","position":{"x":-0.11,"y":0.798,"z":-0.244},"orientation":{"x":-0.995,"y":-0.06,"z":-0.053,"w":0.062},"radius":0.006},{"hand":"left","joint":"pinky-finger-metacarpal","position":{"x":-0.148,"y":0.838,"z":-0.207},"orientation":{"x":0.023,"y":-0.119,"z":0.201,"w":0.972},"radius":0.018},{"hand":"left","joint":"pinky-finger-phalanx-proximal","position":{"x":-0.138,"y":0.843,"z":-0.252},"orientation":{"x":-0.358,"y":-0.123,"z":0.087,"w":0.921},"radius":0.008},{"hand":"left","joint":"pinky-finger-phalanx-intermediate","position":{"x":-0.129,"y":0.823,"z":-0.274},"orientation":{"x":-0.839,"y":-0.11,"z":0.07,"w":0.529},"radius":0.007},{"hand":"left","joint":"pinky-finger-phalanx-distal","position":{"x":-0.125,"y":0.805,"z":-0.265},"orientation":{"x":-0.981,"y":-0.154,"z":0.051,"w":0.105},"radius":0.006},{"hand":"left","joint":"pinky-finger-tip","position":{"x":-0.121,"y":0.8,"z":-0.244},"orientation":{"x":-0.981,"y":-0.154,"z":0.051,"w":0.105},"radius":0.005},{"hand":"right","joint":"wrist","position":{"x":0.156,"y":0.844,"z":-0.162},"orientation":{"x":-0.043,"y":0.154,"z":-0.017,"w":0.987},"radius":0.021},{"hand":"right","joint":"thumb-metacarpal","position":{"x":0.119,"y":0.822,"z":-0.186},"orientation":{"x":0.109,"y":0.429,"z":0.607,"w":0.66},"radius":0.019},{"hand":"right","joint":"thumb-phalanx-proximal","position":{"x":0.097,"y":0.81,"z":-0.206},"orientation":{"x":0.037,"y":0.327,"z":0.586,"w":0.741},"radius":0.012},{"hand":"right","joint":"thumb-phalanx-distal","position":{"x":0.079,"y":0.799,"z":-0.233},"orientation":{"x":0.052,"y":0.388,"z":0.635,"w":0.666},"radius":0.01},{"hand":"right","joint":"thumb-tip","position":{"x":0.064,"y":0.789,"z":-0.249},"orientation":{"x":0.052,"y":0.388,"z":0.635,"w":0.666},"radius":0.009},{"hand":"right","joint":"index-finger-metacarpal","position":{"x":0.128,"y":0.83,"z":-0.191},"orientation":{"x":-0.043,"y":0.154,"z":-0.017,"w":0.987},"radius":0.021},{"hand":"right","joint":"index-finger-phalanx-proximal","position":{"x":0.105,"y":0.83,"z":-0.245},"orientation":{"x":-0.177,"y":0.154,"z":0.038,"w":0.971},"radius":0.01},{"hand":"right","joint":"index-finger-phalanx-intermediate","position":{"x":0.094,"y":0.817,"z":-0.279},"orientation":{"x":-0.33,"y":0.139,"z":0.036,"w":0.933},"radius":0.009},{"hand":"right","joint":"index-finger-phalanx-distal","position":{"x":0.088,"y":0.802,"z":-0.297},"orientation":{"x":-0.403,"y":0.107,"z":0.039,"w":0.908},"radius":0.008},{"hand":"right","joint":"index-finger-tip","position":{"x":0.085,"y":0.786,"z":-0.312},"orientation":{"x":-0.403,"y":0.107,"z":0.039,"w":0.908},"radius":0.007},{"hand":"right","joint":"middle-finger-metacarpal","position":{"x":0.144,"y":0.833,"z":-0.194},"orientation":{"x":-0.043,"y":0.154,"z":-0.017,"w":0.987},"radius":0.021},{"hand":"right","joint":"middle-finger-phalanx-proximal","position":{"x":0.126,"y":0.834,"z":-0.252},"orientation":{"x":-0.261,"y":0.093,"z":0.001,"w":0.961},"radius":0.011},{"hand":"right","joint":"middle-finger-phalanx-intermediate","position":{"x":0.118,"y":0.812,"z":-0.288},"orientation":{"x":-0.454,"y":0.086,"z":0.009,"w":0.887},"radius":0.008},{"hand":"right","joint":"middle-finger-phalanx-distal","position":{"x":0.114,"y":0.79,"z":-0.304},"orientation":{"x":-0.532,"y":0.064,"z":-0.031,"w":0.844},"radius":0.008},{"hand":"right","joint":"middle-finger-tip","position":{"x":0.111,"y":0.768,"z":-0.315},"orientation":{"x":-0.532,"y":0.064,"z":-0.031,"w":0.844},"radius":0.007},{"hand":"right","joint":"ring-finger-metacarpal","position":{"x":0.16,"y":0.835,"z":-0.199},"orientation":{"x":-0.043,"y":0.154,"z":-0.017,"w":0.987},"radius":0.019},{"hand":"right","joint":"ring-finger-phalanx-proximal","position":{"x":0.146,"y":0.83,"z":-0.25},"orientation":{"x":-0.276,"y":0.046,"z":-0.048,"w":0.959},"radius":0.01},{"hand":"right","joint":"ring-finger-phalanx-intermediate","position":{"x":0.141,"y":0.809,"z":-0.283},"orientation":{"x":-0.462,"y":0.048,"z":-0.075,"w":0.882},"radius":0.008},{"hand":"right","joint":"ring-finger-phalanx-distal","position":{"x":0.137,"y":0.788,"z":-0.298},"orientation":{"x":-0.564,"y":0.078,"z":-0.092,"w":0.817},"radius":0.007},{"hand":"right","joint":"ring-finger-tip","position":{"x":0.132,"y":0.766,"z":-0.309},"orientation":{"x":-0.564,"y":0.078,"z":-0.092,"w":0.817},"radius":0.006},{"hand":"right","joint":"pinky-finger-metacarpal","position":{"x":0.168,"y":0.831,"z":-0.2},"orientation":{"x":-0.094,"y":0.002,"z":-0.212,"w":0.973},"radius":0.018},{"hand":"right","joint":"pinky-finger-phalanx-proximal","position":{"x":0.166,"y":0.823,"z":-0.245},"orientation":{"x":-0.277,"y":-0.017,"z":-0.129,"w":0.952},"radius":0.008},{"hand":"right","joint":"pinky-finger-phalanx-intermediate","position":{"x":0.165,"y":0.806,"z":-0.271},"orientation":{"x":-0.486,"y":-0.035,"z":-0.175,"w":0.855},"radius":0.007},{"hand":"right","joint":"pinky-finger-phalanx-distal","position":{"x":0.162,"y":0.789,"z":-0.282},"orientation":{"x":-0.529,"y":0.019,"z":-0.2,"w":0.825},"radius":0.006},{"hand":"right","joint":"pinky-finger-tip","position":{"x":0.157,"y":0.771,"z":-0.292},"orientation":{"x":-0.529,"y":0.019,"z":-0.2,"w":0.825},"radius":0.005}]}
```

```
{"timestamp":1783652050794,"controllers":[{"handedness":"right","position":{"x":0.111,"y":-0.293,"z":-0.349},"orientation":{"x":0.096,"y":-0.214,"z":-0.349,"w":0.907},"gamepad":{"buttons":[{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0.702},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0}],"axes":[0,0,0,0]}},{"handedness":"left","position":{"x":-0.031,"y":-0.295,"z":-0.399},"orientation":{"x":-0.083,"y":-0.23,"z":0.338,"w":0.909},"gamepad":{"buttons":[{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0.894},{"pressed":false,"value":0.49},{"pressed":false,"value":1},{"pressed":false,"value":0},{"pressed":false,"value":0},{"pressed":false,"value":0}],"axes":[0,0,0,0]}}]}
```

### 浏览器 Debug
  在地址栏中输入 `chrome://inspect/#devices` 即可通过电脑的浏览器进行 Debug
  ![](https://i.imgur.com/0H47qcr.png)
  ![](https://i.imgur.com/tx5J5mX.png)