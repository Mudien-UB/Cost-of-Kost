import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../authentication/hooks/useAuth'
import { FaLeftLong } from 'react-icons/fa6'
import GeneralLoading from '../../components/GeneralLoading'

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()

  const { whoAmI, resetStatus } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await whoAmI()
        console.log(res)
        setProfile(res)
        setFormData(res)
      } catch (error) {
        navigate('/auth/login')
      } finally {
        resetStatus()
      }
    }
    loadData()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  function handleSave() {
    alert('saved, but no API integration')
    setProfile(profile);
    setIsEditing(false)
  }

  function handleCancel() {
    setFormData(profile)
    setIsEditing(false)
  }

  if (!profile || !formData) {
    return (
      <GeneralLoading />
    )
  }

  return (
    <section className="w-screen min-h-screen flex flex-col bg-blue-50 items-center justify-center gap-10 p-4">
      
      <div className=" w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-blue-950/20 p-6 sm:p-8 border border-blue-100">
      <button 
        className='text-blue-50 px-4  py-2 rounded-lg bg-blue-900/80 transition'
        onClick={() => window.history.back()}
      >
        <FaLeftLong className='text-xl' />
      </button>
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={profile.photoUrl || `https://i.pravatar.cc/150?img=3`}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md mb-4"
          />
          <h1 className="text-2xl font-bold text-blue-900">User Profile</h1>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <label className="text-blue-900 font-medium">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="sm:col-span-2 border-b-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="sm:col-span-2 mb-0.5 text-blue-800">{profile.fullname}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <label className="text-blue-900 font-medium">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="sm:col-span-2 border-b-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="sm:col-span-2 mb-0.5 text-blue-800">{profile.username}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <label className="text-blue-900 font-medium">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="sm:col-span-2 border-b-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="sm:col-span-2 mb-0.5 text-blue-800">{profile.email}</p>
            )}
          </div>
        </div>

        <div className={`mt-6 flex flex-col sm:flex-row gap-4 ${!isEditing ? "justify-center" : "justify-between"} `} >
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Cancel
              </button>
            </>
          )}
        </div>

      </div>

      <div className='w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-blue-950/20 p-6 sm:p-8 border border-blue-100'>
        <button
                onClick={() => navigate('/change-password')}
                className="w-full border-2 border-red-600 text-red-800 font-medium px-4 py-2 rounded-lg hover:bg-red-100 transition"
              >
                Change Password
              </button>
      </div>
    </section>
  )
}
