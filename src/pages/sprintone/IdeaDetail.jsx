import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import supabase from "../../Supabase";
import { useAuth } from "../../context/AuthProvider";
import NotificationDialog from "../../components/NotificationDialog";
import Comments from "../../components/Comments";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function IdeaDetail({ isOpen, setIsOpen, sprintData }) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                  <div className="px-6 py-6 lg:px-8">
                    <div className="flex flex-row justify-between">
                      <h1 className="text-2xl font-bold mb-2">Detail Ide</h1>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={closeModal}
                      >
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <p>
                      Silahkan ulas ide yang temanmu berikan, lalu berikan
                      komentar jika dirasa ada yang perlu diperbaiki.
                    </p>
                    <div className="border border-4 border-dashed p-2 rounded-xl mt-4">
                      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Pengusung Ide: {sprintData?.creator}
                      </h3>
                      <div>
                        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Spesific
                        </h1>
                        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                          {
                            sprintData?.sprint_details?.filter(
                              (item) => item.category == "spesific"
                            )[0]?.content
                          }
                        </p>
                      </div>
                      <div>
                        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Measurable
                        </h1>
                        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                          Sebelum:{" "}
                          {
                            sprintData?.sprint_details?.filter(
                              (item) => item.category == "measurable_before"
                            )[0]?.content
                          }
                        </p>
                        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                          Sesudah:{" "}
                          {
                            sprintData?.sprint_details.filter(
                              (item) => item.category == "measurable_after"
                            )[0]?.content
                          }
                        </p>
                      </div>
                      <div>
                        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Timely
                        </h1>
                        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                          {
                            sprintData?.sprint_details?.filter(
                              (item) => item.category == "timely"
                            )[0]?.content
                          }
                        </p>
                      </div>
                      <div>
                        <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                          Kalimat Challenge
                        </h1>
                        <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                          {
                            sprintData?.sprint_details.filter(
                              (item) => item.category == "challenge"
                            )[0]?.content
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  {sprintData && <Comments sprintId={sprintData?.id} />}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <NotificationDialog
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
        message={notificationMessage}
        title="Notification!"
      />
    </>
  );
}
