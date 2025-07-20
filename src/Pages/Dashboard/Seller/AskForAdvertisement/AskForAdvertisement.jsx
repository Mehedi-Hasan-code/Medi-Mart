import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../Context/Auth/AuthContext';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import EmptyArray from '../../../../Components/Common/States/EmptyArray';

import DataLoading from '../../../../Components/Loaders/DataLoading';
import LoadingError from '../../../../Components/Common/States/LoadingError';
import Modal from './Modal';
import { Button } from '@headlessui/react';
import Table from './Table';

const AskForAdvertisement = () => {
  const { user, isUserLoading } = useContext(AuthContext);
  const { privateApi } = useAxiosSecure();

  const {
    data: ads = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['ads', user?.email],
    enabled: !isUserLoading && !!user?.email,
    queryFn: () => privateApi.get(`/ads/seller?email=${user.email}`),
  });

  // modal logic

  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  if (isLoading || isUserLoading) {
    return <DataLoading label="advertisements" />;
  }

  if (error) {
    return <LoadingError label="advertisements" showAction />;
  }

  return (
    <>
      {!ads || ads.length === 0 ? (
        <>
          <EmptyArray message="No advertisements found." />
          <div className="flex justify-center mb-6">
            <Button onClick={open} className="btn btn-primary">
              Add Advertise
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Table ads = { ads } />
          <div className="flex justify-center my-6">
            <Button onClick={open} className="btn btn-primary">
              Add Advertise
            </Button>
          </div>
        </div>
      )}
      {/* Modal rendered once, always present */}
      <Modal isOpen={isOpen} close={close} refetch={refetch} />
    </>
  );
};

export default AskForAdvertisement;
