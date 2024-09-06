import React, { useEffect, useState } from 'react'; // Mengimpor React dan beberapa hooks yang dibutuhkan
import './index.css'; // Mengimpor stylesheet untuk styling

const App = () => {
  // Menginisialisasi state
  const [time, setTime] = useState(0); // State untuk menyimpan waktu saat ini (dalam milidetik)
  const [timerOn, setTimeOn] = useState(false); // State untuk menyimpan status apakah timer sedang berjalan atau tidak
  const [timeList, setTimeList] = useState([]); // State untuk menyimpan daftar waktu yang telah disimpan

  // useEffect untuk mengatur interval timer
  useEffect(() => {
    let interval = null;
    if (timerOn) {
      // Jika timerOn true, mulai interval yang memperbarui waktu setiap 10 milidetik
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      // Jika timerOn false, hentikan interval
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Membersihkan interval saat komponen unmount atau timerOn berubah
  }, [timerOn]); // Dependensi: useEffect akan berjalan saat timerOn berubah

  // Fungsi untuk menyimpan waktu ke dalam timeList
  const handleSaveTime = () => {
    setTimeList([...timeList, time]); // Menambahkan waktu saat ini ke dalam daftar timeList
  };
  // Fungsi untuk menghapus waktu yang disimpan dari timeList
  const handleDeleteTime = (indexToDelete) => {
    setTimeList(timeList.filter((_, index) => index !== indexToDelete)); // Menghapus waktu berdasarkan index
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3ee23e]">
      {/* Container untuk menampilkan timer */}
      <div className="flex flex-col justify-center h-[200px] w-[400px] p-8 bg-white/30 backdrop-blur-2xl border border-[#4cf9ff] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      
        <div className="text-center mb-4 text-3xl">
          {/* Menampilkan waktu dalam format mm:ss:ms */}
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
        </div>
        <div className="flex justify-center">
          {/* Tombol */}
          {!timerOn && time == 0 && (
            <button onClick={() => setTimeOn(true)} className="bg-blue-800 py-2 px-5 rounded-lg text-white text-sm">
              mulai
            </button>
          )}
          {timerOn && (
            <button onClick={() => setTimeOn(false)} className="bg-red-600 py-2 px-5 rounded-lg text-white text-sm">
              berhenti
            </button>
          )}
          {!timerOn && time !== 0 && (
            <>
              <button onClick={() => setTimeOn(true)} className="bg-[#433D8B] py-2 px-5 rounded-lg text-white text-sm mr-4">
                lanjutkan
              </button>
              <button onClick={() => setTime(0)} className="bg-gray-600 py-2 px-5 rounded-lg text-white text-sm">
                reset
              </button>
            </>
          )}
          {timerOn && (
            <button onClick={handleSaveTime} className="bg-green-600 py-2 px-5 rounded-lg text-white text-sm ml-4">
              simpan
            </button>
          )}
        </div>
      </div>
      {/* Tabel untuk menampilkan daftar waktu yang telah disimpan */}
      {timeList.length >= 0 && (
        <div className="mt-8 w-[400px]">
          <table className="table-auto w-full border-collapse border bg-white/30 backdrop-blur-2xl border-[#0B2F9F]">
            <thead>
              <tr>
                <th className="border border-[#0B2F9F] px-4 py-2">no</th>
                <th className="border border-[#0B2F9F] px-4 py-2">waktu</th>
                <th className="border border-[#0B2F9F] px-4 py-2">aksi</th>
              </tr>
            </thead>
            <tbody>
              {timeList.map((savedTime, index) => (
                <tr key={index}>
                  <td className="border border-[#0B2F9F] px-4 py-2 text-center">{index + 1}</td>
                  <td className="border border-[#0B2F9F] px-4 py-2 text-center">
                    {("0" + Math.floor((savedTime / 60000) % 60)).slice(-2)}:
                    {("0" + Math.floor((savedTime / 1000) % 60)).slice(-2)}:
                    {("0" + ((savedTime / 10) % 100)).slice(-2)}
                  </td>
                  <td className="border border-[#0B2F9F] px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteTime(index)}
                      className="bg-red-600 py-1 px-2 rounded-lg text-white text-sm"
                    >
                     hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
    </div>
  );
};

export default App;