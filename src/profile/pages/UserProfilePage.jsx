import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../authentication/hooks/useAuth'
import { FaLeftLong } from 'react-icons/fa6'
import GeneralLoading from '../../components/GeneralLoading'
import { useProfile } from '../hooks/useProfile'
import { BiUserCircle } from 'react-icons/bi'

export default function UserProfilePage() {
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate();
  const { updateProfile, resetStatus: resetProfile } = useProfile();
  const { whoAmI, resetStatus } = useAuth()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await whoAmI()
        console.log('whoAmI response:', res)

        if (!res || !res.username || !res.email || !res.fullname) {
          throw new Error('Data profil tidak lengkap')
        }

        setProfile(res)
        setFormData(res)
      } catch (err) {
        console.error('Load profile failed:', err)
        setError('Gagal memuat profil. Silakan login kembali.')
        setTimeout(() => {
          navigate('/auth/login')
        }, 1500)
      } finally {
        resetStatus()
        setLoading(false)
      }
    }

    loadData()
  }, [whoAmI, resetStatus, navigate])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData.username, formData.email, formData.fullname)
      console.log('updateProfile response:', res)

      if (!res || !res.username) {
        throw new Error('Gagal menyimpan data')
      }

      setProfile(res)
      setFormData(res)
      setIsEditing(false)
    } catch (err) {
      console.error('Save failed:', err)
      alert('Gagal menyimpan perubahan. Silakan coba lagi.')
    } finally {
      resetProfile()
    }
  }

  function handleCancel() {
    setFormData(profile)
    setIsEditing(false)
  }

  if (loading) {
    return <GeneralLoading />
  }

  if (error) {
    return (
      <section className="w-screen min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="max-w-md bg-white shadow-lg rounded-xl p-6 text-center border border-blue-100">
          <h2 className="text-xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
          <p className="text-blue-800 mb-4">{error}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate('/auth/login')}
          >
            Login Ulang
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="w-screen min-h-screen flex flex-col bg-blue-50 items-center justify-center gap-10 p-4">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-blue-950/20 p-6 sm:p-8 border border-blue-100">
        <button
          className='text-blue-50 px-4 py-2 rounded-lg bg-blue-900/80 transition'
          onClick={() => navigate(-1)}
        >
          <FaLeftLong className='text-xl' />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <BiUserCircle className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md mb-4 opacity-60" />
          <h1 className="text-2xl font-bold text-blue-900">{formData.fullname}</h1>
        </div>

        <div className="space-y-4">
          {['fullname', 'username', 'email'].map((field) => (
            <div key={field} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <label className="text-blue-900 font-medium capitalize">{field}</label>
              {isEditing ? (
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="sm:col-span-2 border-b-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="sm:col-span-2 mb-0.5 text-blue-800">{profile[field]}</p>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-6 flex flex-col sm:flex-row gap-4 ${!isEditing ? "justify-center" : "justify-between"}`}>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Ubah Data
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Simpan
              </button>
              <button
                onClick={handleCancel}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
              >
                Batal
              </button>
            </>
          )}
        </div>
      </div>

      <div className='w-full max-w-xl bg-white flex flex-col gap-5 rounded-2xl shadow-xl shadow-blue-950/20 p-6 sm:p-8 border border-blue-100'>
        <button
          onClick={() => navigate('/profile/change-password')}
          className="w-full border-2 border-blue-800/50 text-blue-900/50 font-medium px-4 py-2 rounded-lg hover:bg-blue-100/50 transition"
        >
          Ubah Kata Sandi
        </button>
        <button
          onClick={() => navigate('/delete-account')}
          className="w-full border-2 text-red-100 bg-red-800 font-medium px-4 py-2 rounded-lg hover:bg-red-500 transition"
        >
          Hapus Akun
        </button>
      </div>
    </section>
  )
}
