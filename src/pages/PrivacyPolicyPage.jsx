import React from 'react'
import ResumePopUp from '../components/ResumePopUp'


const data = `
Privacy Policy

Last updated: January 1, 2025

Your privacy is important to us at Cost-of-Kost. This Privacy Policy explains what data we collect, how we use it, and how we protect it.

1. Information We Collect
- Account Information: Name, email, password (hashed).
- Expense Data: Categories, amounts, dates, notes.
- Usage Data: Device type, browser, IP address (for security/logging).

2. How We Use Information
- To provide the expense tracking service.
- To authenticate users and maintain account security.
- To improve app functionality and user experience.
- To communicate with you (e.g., updates, support).

3. Data Sharing
We do not sell your data. We may share it with:
- Service providers who help us operate the app (under confidentiality agreements).
- Authorities if required by law.

4. Data Security
We use industry-standard security practices (e.g., hashed passwords, HTTPS) to protect your data. However, no method of transmission is 100% secure.

5. Data Retention
We retain your data as long as your account is active. You may request deletion of your account and associated data at any time.

6. Children’s Privacy
Cost-of-Kost is not intended for users under 13 years of age. We do not knowingly collect data from children under 13.

7. Changes to This Policy
We may update this Privacy Policy. We will notify you of significant changes via the app or email.

8. Contact
For any questions about this Privacy Policy, please contact us at privacy@costofkost.com.


`
export default function PrivacyPolicyPage() {
  return (
    <ResumePopUp data={data} onClose={() => window.history.back()} title={`Privacy Policy`} />
  )
}
