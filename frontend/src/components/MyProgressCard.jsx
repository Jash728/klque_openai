const MyProgressCard = () => {
    return (
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto md:mx-0 md:max-w-none">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Progress</h2>
          <span className="text-xs text-gray-500">Past 7 days</span> 
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-purple-500">10</p>
            <p className="text-gray-500 text-sm">Content Posted</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-500">3567</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
        </div>
      </div>
    );
  };
export default MyProgressCard;
