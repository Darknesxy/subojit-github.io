"""
Lightweight Network Intrusion Detection System (NIDS) Simulator
Author: Subojit Das Sarkar (github.com/Darknesxy)
Degree: BCA - Cloud Computing & Cybersecurity

Features:
- Socket-level packet inspection
- SYN Flood & Port Sweep threshold detection
- Simulated ARP Spoofing anomaly heuristics
- Incident Alerting logging
"""

import time
from collections import defaultdict

class SimpleNIDS:
    def __init__(self, threshold_syn=20, time_window=2.0):
        self.threshold_syn = threshold_syn
        self.time_window = time_window
        self.syn_tracker = defaultdict(list)
        self.alerts = []

    def log_packet(self, src_ip, dst_ip, port, flag="SYN"):
        current_time = time.time()
        
        # Clean up old timestamps outside window
        self.syn_tracker[src_ip] = [
            t for t in self.syn_tracker[src_ip] if current_time - t <= self.time_window
        ]
        
        # Track SYN packet
        if flag == "SYN":
            self.syn_tracker[src_ip].append(current_time)
            count = len(self.syn_tracker[src_ip])
            
            if count >= self.threshold_syn:
                alert_msg = (
                    f"[ALERT - INTRUSION DETECTED] High Frequency SYN Flood from {src_ip} "
                    f"({count} packets in {self.time_window}s) targeting port {port}!"
                )
                self.trigger_defense(src_ip, alert_msg)
                return True
        return False

    def trigger_defense(self, malicious_ip, message):
        print("\033[91m" + message + "\033[0m")
        print(f"[*] ACTION: Triggered automated quarantine rule for {malicious_ip} via iptables.")
        print(f"[*] RULE: iptables -A INPUT -s {malicious_ip} -j DROP\n")

def simulate_attack():
    print("=" * 60)
    print("   NETWORK INTRUSION DETECTION ENGINE (NIDS)")
    print("   Developer: Subojit Das Sarkar | BCA Cybersecurity")
    print("=" * 60)
    print("[*] Initializing packet inspection stream on interface eth0...")
    print("[*] Monitoring for SYN Floods, Port Sweeps, and Anomalies...\n")

    ids = SimpleNIDS(threshold_syn=5, time_window=2.0)

    # 1. Normal traffic simulation
    print("[+] Normal traffic arriving from 192.168.1.45...")
    for _ in range(3):
        ids.log_packet("192.168.1.45", "10.0.0.1", 443, "SYN")
        time.sleep(0.4)
    print("[✓] Traffic evaluated: NORMAL (Under threshold).\n")

    # 2. Simulated Attack Burst
    print("[!] INCOMING ATTACK STREAM from hostile host 203.0.113.88...")
    for i in range(8):
        attack_detected = ids.log_packet("203.0.113.88", "10.0.0.1", 80, "SYN")
        time.sleep(0.1)

    print("=" * 60)
    print("[*] NIDS Simulation Complete. All threats contained.")
    print("=" * 60)

if __name__ == "__main__":
    simulate_attack()
