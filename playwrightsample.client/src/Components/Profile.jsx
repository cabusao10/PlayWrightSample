// Profile.jsx
// Simple JSX profile card component with Tailwind styling.

import React from "react";

export default function Profile({ user }) {
  if (!user) {
    user = {
      name: "ERNI",
      email: "ERNI@example.com",
      avatar: "https://i.pravatar.cc/150?img=5",
      bio: "Frontend developer and coffee lover.",
    };
  }

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6 text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-24 h-24 rounded-full mx-auto border"
      />
      <h2 id="lblName" className="mt-4 text-xl font-semibold text-gray-800">{user.name}</h2>
      <p id="lblemail" className="text-gray-500 text-sm">{user.email}</p>
      <p id="lblbio" className="mt-3 text-gray-600 text-sm">{user.bio}</p>

      <div className="mt-4 flex justify-center gap-3">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700">
          Follow
        </button>
        <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-100">
          Message
        </button>
      </div>
    </div>
  );
}
