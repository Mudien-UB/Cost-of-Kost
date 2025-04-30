import React from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import FormExpence from '../components/molecules/FormExpence'

export default function FinanceRecordingPage() {
  return (
    <DashboardLayout className="flex flex-col items-center justify-center min-h-screen">
      <FormExpence />
    </DashboardLayout>
  )
}
