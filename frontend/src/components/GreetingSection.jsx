const GreetingSection = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div>
        <p className="text-gray-500">{today}</p>
        <h1 className="text-2xl md:text-3xl font-bold">Hi, Akshita</h1>
        <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">What are we creating today?</p>
      </div>

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-500 hover:to-pink-600">
          ⚡ Ask AI
        </button>
        <button className="px-4 py-2 bg-white border-2 border-transparent font-semibold rounded-lg shadow-md hover:bg-gray-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 hover:from-blue-500 hover:to-pink-600">
          Start new content
        </button>
      </div>
    </div>
  );
};

export default GreetingSection;
