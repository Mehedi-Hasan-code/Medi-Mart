import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import DataLoading from '../../../../Components/Loaders/DataLoading';
import LoadingError from '../../../../Components/Common/States/LoadingError';
import EmptyArray from '../../../../Components/Common/States/EmptyArray';
import AdsTable from './AdsTable';

const ManageAds = () => {
  const { privateApi } = useAxiosSecure();
  const {
    data: adsData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['ads'],
    queryFn: () => privateApi.get('/ads'),
  });

  const [ads, setAds] = React.useState([]);

  React.useEffect(() => {
    setAds(adsData);
  }, [adsData]);

  const handleStatusChange = (updatedAd) => {
    setAds(prevAds => prevAds.map(ad => ad._id === updatedAd._id ? updatedAd : ad));
  };

  if (isLoading) {
    return <DataLoading label="advertisements" />;
  }

  if (error) {
    return <LoadingError label="advertisements" showAction={true} />;
  }

  if (!ads.length) {
    return <EmptyArray message="No advertisements found" />;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Advertisements</h2>
      <AdsTable ads={ads} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default ManageAds;
