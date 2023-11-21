import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import supabase from "../../Supabase";
import { useAuth } from "../../context/AuthProvider";
import NotificationDialog from "../../components/NotificationDialog";

export default function SprintForm({
  isOpen,
  setIsOpen,
  projectId,
}) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState();

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await supabase
        .from("sprint")
        .insert([
          {
            project_id: projectId,
            creator: user.user_metadata.username,
            category: "1",
          },
        ])
        .select()
        .then(async (res) => {
          console.log(res);
          await supabase
            .from("sprint_details")
            .insert([
              {
                category: "spesific",
                content: e.target.spesific.value,
                sprint_id: res.data[0].id,
              },
              {
                category: "measurable_before",
                content: e.target.measurablebefore.value,
                sprint_id: res.data[0].id,
              },
              {
                category: "measurable_after",
                content: e.target.measurableafter.value,
                sprint_id: res.data[0].id,
              },
              {
                category: "timely",
                content: e.target.timely.value,
                sprint_id: res.data[0].id,
              },
              {
                category: "challenge",
                content: e.target.challenge.value,
                sprint_id: res.data[0].id,
              },
            ])
            .select()
            .then((res) => {
              setIsLoading(false);
              setNotificationMessage(`Ide berhasil dibuat!`);
              setIsOpenDialog(true);
              closeModal();
            });
        });
    } catch (error) {
      console.log(error);
    }
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
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                      Masukan Ide Baru
                    </h3>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label
                          htmlFor="spesific"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          Spesific
                        </label>
                        <textarea
                          name="spesific"
                          id="content"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Masalah spesifik yang ingin diselesaikan, contoh: Meningkatkan kedisiplinan siswa dalam hal kehadiran di SMA Bina Nusantara"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <p className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                          Measurable
                        </p>
                        <label
                          htmlFor="measurablebefore"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Sebelum
                        </label>
                        <textarea
                          name="measurablebefore"
                          id="measurable-before"
                          cols="30"
                          rows="2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Kondisi sebelum dilakukan project, contoh: Tingkat kehadiran 40%"
                          required
                        ></textarea>
                        <label
                          htmlFor="measurableafter"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Sesudah
                        </label>
                        <textarea
                          name="measurableafter"
                          id="measurable-after"
                          cols="30"
                          rows="2"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Kondisi setelah dilakukan project, contoh: Tingkat kehadiran 90%"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor="timely"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          Timely
                        </label>
                        <textarea
                          name="timely"
                          id="timely"
                          cols="30"
                          rows="3"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Durasi project yang akan dikerjakan, contoh: 2 Bulan"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label
                          htmlFor="challenge"
                          className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                        >
                          Kalimat Challenge
                        </label>
                        <textarea
                          name="challenge"
                          id="challenge"
                          cols="30"
                          rows="5"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          placeholder="Kalimat challenge/tantangan yang akan coba diselesaikan, contoh: Bagaimana cara meningkatkan kedisiplinan siswa dalam hal kehadiran di SMA Bina Nusantara dari 40% menjadi 90% dalam waktu 2 bulan ?"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className={`w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
                          isLoading
                            ? "bg-blue-200 hover-blue-200"
                            : "bg-blue-700 hover:bg-blue-800 "
                        }`}
                      >
                        {isLoading ? (
                          <div
                            role="status"
                            className="flex justify-center my-auto"
                          >
                            <p className="my-auto">Loading... </p>
                            <svg
                              aria-hidden="true"
                              className=" w-6 h-6 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : (
                          <p>Tambah Ide</p>
                        )}{" "}
                      </button>
                    </form>
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
