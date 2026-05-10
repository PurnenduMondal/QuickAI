import React, { useEffect } from "react";
import { dummyCreationData } from "../assets/assets";
import { Sparkle, Gem } from "lucide-react";
import { useSubscription } from '@clerk/react/experimental'
import CreateItem from "../components/CreateItem";


const Dashboard = () => {

  const { data, isLoading, error } = useSubscription()
  const [creations, setCreations] = React.useState([]);
  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-x1 border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center'>
            <Sparkle className="w-5 text-white" />
          </div>
        </div>

          {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-x1 border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              {data?.subscriptionItems?.[0]?.plan?.name}
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center'>
            <Gem className='w-5 text-white' />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creations</p>
        {
          creations.map((item) => (
            <CreateItem key={item.id} item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
