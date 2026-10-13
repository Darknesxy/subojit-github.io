# 📡 Lightweight Network Intrusion Detection System (NIDS)

A lightweight Python intrusion detection engine capable of analyzing network packet frequency, identifying rapid SYN flood attacks, and triggering automated defensive firewall drop rules.

## 🚀 Features
- **Sliding-Window Frequency Analysis**: Detects volumetric DDoS / SYN flood patterns within sub-second precision.
- **Automated Mitigation Triggers**: Formats immediate `iptables` drop rules to quarantine hostile attacking IPs.
- **Low Overhead**: Pure standard library implementation requiring zero third-party C dependencies.

## 💻 Usage
```bash
# Clone the repository
git clone https://github.com/Darknesxy/network-ids.git
cd network-ids

# Run the IDS detector
python ids_detector.py
```

## 👨‍💻 Author
**Subojit Das Sarkar**
- BCA (Cloud Computing & Cybersecurity, 2026–2029)
- GitHub: [@Darknesxy](https://github.com/Darknesxy)
- Portfolio: [https://Darknesxy.github.io/subojit-github.io/](https://Darknesxy.github.io/subojit-github.io/)
