import React from "react";

const navItems = [
  { name: "Home", icon: "🏠" },
  { name: "Chat", icon: "📝" },
  { name: "Profile", icon: "👤" },
];

const Sidenav = () => {
  return (
    <div className="">
      <div className="flex flex-col w-64 h-screen bg-gray-800">
        <div className="flex items-center justify-center h-14 border-b border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-200">Chat App</h1>
        </div>
        <div className="flex flex-col p-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
              className="flex items-center p-2 text-gray-200 hover:bg-gray-700"
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
