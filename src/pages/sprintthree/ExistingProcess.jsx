import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import supabase from "../../Supabase";
import NotificationDialog from "../../components/NotificationDialog";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ExistingProcess({ isOpen, setIsOpen, projectId }) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();
  const [sprintDatas, setSprintDatas] = useState();

  useEffect(() => {
    getSprintData();
    subscribeSprints();
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  async function getSprintData() {
    await supabase
      .from("sprint")
      .select(
        `id, creator, category, sprint_details( category, content), project_id, status`
      )
      .eq(
        "project_id",
        typeof projectId === "object" ? projectId?.projectId : projectId
      )
      .eq("category", "2")
      .then((res) => {
        if (res.error) console.log(res.error);
        else setSprintDatas(res.data);
      });
  }

  const subscribeSprints = () =>
    supabase
      .channel("sprint-two-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sprint",
          filter: `project_id=eq.${
            typeof projectId === "object" ? projectId.projectId : projectId
          }`,
        },
        (payload) => {
          getSprintData();
        }
      )
      .subscribe();

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
                      <h1 className="text-2xl font-bold mb-2">
                        Existing Process
                      </h1>
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
                      Berikut merupakan existing process yang sudah kamu
                      definisikan pada sprint sebelumnya. Existing process
                      berikut dapat kamu jadikan acuan dalam membuat pertanyaan
                      wawancara yang dapat menemukan pain point dari pengguna.
                    </p>

                    {sprintDatas &&
                      sprintDatas.map((sprintData, index) => (
                        <div className="border border-4 border-dashed p-2 rounded-xl mt-4" key={index}>
                          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            Pengusung Ide: {sprintData?.creator}
                          </h3>
                          <div>
                            <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                              User:
                            </h1>
                            <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                              {
                                sprintData?.sprint_details.filter(
                                  (item) => item.category == "user"
                                )[0].content
                              }
                            </p>
                          </div>
                          <div>
                            <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                              Existing Process
                            </h1>
                            <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                              {
                                sprintData?.sprint_details.filter(
                                  (item) => item.category == "existing_process"
                                )[0].content
                              }
                            </p>
                          </div>
                          <div>
                            <h1 className="block mb-2 text-lg font-bold text-gray-900 dark:text-white">
                              Goals
                            </h1>
                            <p className="block mb-2 text-base font-medium text-gray-900 dark:text-white">
                              {
                                sprintData?.sprint_details.filter(
                                  (item) => item.category == "goals"
                                )[0].content
                              }
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
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
