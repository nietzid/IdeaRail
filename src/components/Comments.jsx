import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import supabase from "../Supabase";

export default function Comments({ sprintId }) {
  const { user } = useAuth();
  const [comments, setComments] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  async function postComment(e) {
    e.preventDefault();
    setIsLoading(true);
    await supabase
      .from("comments")
      .insert([
        {
          comment: e.target.comment.value,
          sprint_id: sprintId,
          uuid: user.id,
        },
      ])
      .select()
      .then((res) => {
        if (res.error) {
          console.log(res.error);
        }
        setIsLoading(false);
        e.target.comment.value = "";
      });
  }

  async function getComments() {
    if (sprintId != null) {
      await supabase
        .from("comments")
        .select("*")
        .eq("sprint_id", sprintId)
        .then((res) => {
          if (res.error) {
            console.log(res.error);
          }
          setComments(res.data);
        });
    }
  }

  function subscribeComments() {
    supabase
      .channel("comments-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "comments" },
        (payload) => {
          getComments();
        }
      )
      .subscribe();
  }

  useEffect(() => {
    getComments();
    subscribeComments();
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 px-8 antialiased">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Diskusi (20)
            </h2>
          </div>
          <form className="mb-6" onSubmit={postComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" className="sr-only">
                Komentarmu
              </label>
              <textarea
                id="comment"
                rows="6"
                className="px-0 w-full block mb-2 text-base font-medium text-gray-900 dark:text-white border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Tulis komentar kamu disini"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className={`inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 ${
                isLoading
                  ? "bg-blue-200 hover:bg-blue-200"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
              disabled={isLoading}
            >
              Post comment
            </button>
          </form>
          {comments.map((comment, index) =>
            comment.uuid == user.id ? (
              <div
                key={index}
                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col mb-2">
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-2">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${user.user_metadata.username}`}
                        alt={user.user_metadata.username}
                      />
                    </div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {user.user_metadata.username}
                    </div>
                    <div className="text-base text-gray-500 ml-2">
                    {new Date(comment.created_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  </div>
                </div>
                <div className="text-base text-gray-700 dark:text-white">
                  {comment.comment}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-2">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src={`https://api.dicebear.com/6.x/lorelei/svg?seed=${user.user_metadata.username}`}
                        alt={user.user_metadata.username}
                      />
                    </div>
                    <div className="text-base font-medium text-gray-900 dark:text-white">
                      {comment.username}
                    </div>
                  </div>
                  <div className="text-base text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {new Date(comment.created_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="text-base text-gray-700 dark:text-white">
                  {comment.comment}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}
