import React from 'react'
import ResumePopUp from '../components/ResumePopUp'

const data = `
Terms of Service

Last updated: January 1, 2025

Welcome to Cost-of-Kost! Please read these Terms of Service ("Terms") carefully before using our application.

1. Acceptance of Terms
By creating an account or using Cost-of-Kost, you agree to be bound by these Terms. If you do not agree, please do not use the service.

2. Service Description
Cost-of-Kost is an expense management tool for boarding-house (kost) residents, helping you track and analyze your financial spending.

3. User Accounts
To access features, you need to register an account. You are responsible for maintaining the confidentiality of your login information and any activity under your account.

4. User Responsibilities
- You agree to provide accurate, current, and complete information.
- You will not use the service for unlawful purposes.
- You will not attempt to disrupt or compromise the security of the service.

5. Data and Content
You retain ownership of the expense data you enter. We do not claim ownership of your financial records. However, you grant us a license to store and process this data as needed to provide the service.

6. Termination
We may suspend or terminate your account if you violate these Terms.

7. Limitation of Liability
Cost-of-Kost is provided "as is". We are not liable for any indirect or consequential damages arising from your use of the service. Use the service at your own risk.

8. Changes to Terms
We may update these Terms. We will notify users through the app or email if significant changes are made.

9. Governing Law
These Terms are governed by the laws of your jurisdiction.

10. Contact
If you have questions about these Terms, please contact us at support@costofkost.com.

`

export default function TermsOfServicePage() {


  return (
    <ResumePopUp data={data} onClose={() => window.history.back()} title={`Terms of Service`} />
  )
}
