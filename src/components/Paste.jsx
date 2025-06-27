import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import {
  ClipboardCopy,
  Eye,
  Pencil,
  Share2,
  Trash2,
} from 'lucide-react'; // Import icons

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="p-6">
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5 border border-gray-300"
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border p-4 rounded-xl shadow" key={paste?._id}>
                <div className="text-lg font-semibold mb-1">{paste.title}</div>
                <div className="text-gray-700 mb-4">{paste.content}</div>

                <div className="flex flex-row gap-5 justify-start items-center text-blue-600">
                  <a href={`/?pasteId=${paste?._id}`} title="Edit">
                    <Pencil className="cursor-pointer hover:text-blue-800" />
                  </a>

                  <Trash2
                    title="Delete"
                    className="cursor-pointer hover:text-red-600"
                    onClick={() => handleDelete(paste?._id)}
                  />

                  <a href={`/pastes/${paste?._id}`} title="View">
                    <Eye className="cursor-pointer hover:text-green-600" />
                  </a>

                  <ClipboardCopy
                    title="Copy"
                    className="cursor-pointer hover:text-purple-600"
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success('Copied to clipboard');
                    }}
                  />

                  <Share2
                    title="Share"
                    className="cursor-pointer hover:text-pink-600"
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: paste.title,
                            text: paste.content,
                            url:
                              window.location.origin + `/pastes/${paste._id}`,
                          })
                          .then(() => toast.success('Shared successfully'))
                          .catch(() => toast.error('Sharing failed'));
                      } else {
                        toast.error('Share not supported on this device');
                      }
                    }}
                  />
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  {paste.createdAt}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
