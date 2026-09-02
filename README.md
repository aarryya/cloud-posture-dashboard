# Cloud Posture Dashboard

An interactive Cloud Security Posture Dashboard designed to help security engineers quickly identify, prioritize, and investigate cloud misconfigurations across multiple cloud accounts.

## 📌 Problem Statement

Cloud environments often contain multiple accounts, services, and resources. Security teams can struggle to quickly identify which misconfigurations require immediate attention.

This dashboard provides a simple way to:

- View security findings across multiple cloud accounts
- Identify critical and high-risk misconfigurations
- Filter findings by account, severity, and cloud service
- Investigate individual findings
- Understand security impact and recommended fixes
- Assign an owner to a finding
- Mark findings as resolved

The goal is to help security teams focus on the most important risks first.

---

## 👤 User Persona

### Security Engineer

The primary user is a security engineer responsible for monitoring cloud security across multiple environments.

The user needs to:

- Quickly identify critical risks
- Understand which cloud accounts need attention
- Investigate security findings
- Assign findings to the appropriate team
- Track remediation progress

The dashboard is designed to reduce the time required to move from identifying a security issue to taking action.

---

## ✨ Features

### Dashboard Overview
<img width="958" height="385" alt="image" src="https://github.com/user-attachments/assets/7d7d7a11-a31a-4e12-8d96-4f693586a199" />

The overview provides a high-level view of the cloud security posture.

It includes:

- Total security findings
- Critical findings
- High-risk findings
- Resolved findings
- Risk distribution across cloud accounts

### Misconfigurations Explorer
<img width="956" height="399" alt="image" src="https://github.com/user-attachments/assets/6fc115dc-4da9-4796-8c3c-0e3b7ab218e2" />


Users can explore cloud security findings and filter them by:

- Cloud Account
- Severity
- Cloud Service

### Finding Details

Each finding provides:

- Severity
- Cloud Account
- Cloud Service
- Affected Resource
- Risk Score
- Security Impact
- Recommended Fix

### Finding Actions

Users can:
<img width="580" height="356" alt="image" src="https://github.com/user-attachments/assets/98f8139c-b2b7-45b9-98a0-e23d3e20765e" />


- Assign an owner to a finding
- Mark a finding as resolved

---

## 🎯 Feature Prioritization

The features were prioritized based on the security engineer's primary workflow.

### Priority 1 — Identify Critical Risks

Security engineers need to quickly understand which issues require immediate attention.

Features:

- Needs Attention section
- Critical findings count
- Risk by cloud account

### Priority 2 — Investigate Findings

Users need enough context to understand a security issue.

Features:

- Finding details
- Risk score
- Security impact
- Recommended remediation

### Priority 3 — Take Action

The dashboard supports basic remediation workflow.

Features:

- Assign Owner
- Mark as Resolved

---

## 📊 Success Metrics

The success of the dashboard could be measured using:

- Time required to identify critical findings
- Time required to investigate a finding
- Percentage of findings assigned to an owner
- Number of findings resolved
- Reduction in unresolved critical findings

---

## 🛠️ Technologies Used

- HTML
- CSS
- JavaScript

---

## 🚀 How to Run

1. Clone the repository

```bash
git clone https://github.com/aarryya/cloud-posture-dashboard.git
