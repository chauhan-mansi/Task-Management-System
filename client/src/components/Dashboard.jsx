const Dashboard = () => {
  const stats = [
    { label: "Total Tasks", value: 24, bg: "bg-gradient-to-r from-blue-500 to-indigo-600", border: "border-blue-100" },
    { label: "Completed", value: 15, bg: "bg-gradient-to-r from-green-500 to-emerald-600", border: "border-green-100" },
    { label: "Pending", value: 9, bg: "bg-gradient-to-r from-amber-500 to-amber-600", border: "border-amber-100" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Task Dashboard</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        {stats.map((item, index) => (
          <div 
            key={index}
            className={`${item.bg} ${item.border} rounded-xl shadow-md border p-6 w-full sm:w-64 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="text-white">
              <p className="text-sm md:text-base font-medium opacity-90">{item.label}</p>
              <p className="text-2xl md:text-3xl font-bold mt-2">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;