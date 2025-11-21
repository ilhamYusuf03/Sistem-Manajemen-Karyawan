import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import KaryawanTable from '../components/KaryawanTable';
import KaryawanModal from '../components/KaryawanModal';

const Karyawan = () => {
  const { user } = useAuth();
  const [karyawan, setKaryawan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchKaryawan();
  }, []);

  const fetchKaryawan = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/karyawan`);
      setKaryawan(response.data.data);
      setError('');
    } catch  {
      setError('Gagal memuat data karyawan');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus karyawan ini?')) {
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/karyawan/${id}`);
      fetchKaryawan();
      alert('Karyawan berhasil dihapus');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus karyawan');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await axios.put(`${import.meta.env.VITE_API_URL}/karyawan/${editData.id}`, formData);
        alert('Karyawan berhasil diupdate');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/karyawan`, formData);
        alert('Karyawan berhasil ditambahkan');
      }
      
      setShowModal(false);
      fetchKaryawan();
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Gagal menyimpan data');
    }
  };

  const filteredKaryawan = karyawan.filter(k =>
    k.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    k.jabatan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Data Karyawan</h1>
        {user?.role === 'admin' && (
          <button onClick={handleAdd} className="btn btn-primary">
            <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tambah Karyawan
          </button>
        )}
      </div>

      {/* Search */}
      <div className="card">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama atau jabatan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input flex-1"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="card">
        <KaryawanTable
          data={filteredKaryawan}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={user?.role === 'admin'}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <KaryawanModal
          data={editData}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Karyawan;