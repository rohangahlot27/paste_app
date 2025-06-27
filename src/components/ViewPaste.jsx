import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaRegClipboard } from 'react-icons/fa';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className="p-5 text-red-500">Paste not found</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success("Code copied to clipboard");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen rounded-xl shadow-md">
      <div className="flex flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          disabled
          value={paste.title}
          placeholder="Enter title here"
          className="p-3 rounded-xl w-full border border-purple-300 bg-purple-50 text-purple-800 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div className="mt-4 relative">
        <textarea
          disabled
          value={paste.content}
          placeholder="Enter content here"
          rows={20}
          className="rounded-xl w-full min-h-[300px] p-4 border border-gray-300 bg-gray-50 text-gray-800 font-mono focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white"
          title="Copy Code"
        >
          <FaRegClipboard className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;

