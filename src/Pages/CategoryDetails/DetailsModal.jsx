import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'

const DetailsModal = ({ isOpen, close, medicine }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              Medicine Details
            </DialogTitle>
            {medicine && (
              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={medicine.image}
                        alt={medicine.itemName}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{medicine.itemName}</div>
                    <div className="text-sm opacity-50">{medicine.genericName}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm opacity-50">Company</div>
                  <div className="text-white">{medicine.company}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm opacity-50">Price</div>
                  <div className="text-white">${medicine.price}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm opacity-50">Discount</div>
                  <div className="text-white">{medicine.discount}%</div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                onClick={close}
              >
                Close
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default DetailsModal