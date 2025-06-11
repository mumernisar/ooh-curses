import React, { useEffect, useState, useRef } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useUser } from "../UserContext";
import { Link } from "react-router-dom";
import { useToast } from "../utils/useToast";

/// test cloudflare worker

function Character() {
  const { user, updateUser, patchUser } = useUser();
  const { showLoading, updateToast, showSuccess, showError } = useToast();
  const loaderData = useLoaderData();
  const [name, setName] = useState("");
  const email = useRef("");
  const [charData, setCharData] = useState([]);
  const userSet = useRef(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(!user.github.Connected, searchParams.get("installation_id"));
    if (
      !user.github.Connected &&
      searchParams.get("installation_id") &&
      !userSet.current
    ) {
      userSet.current = true;
      console.log(loaderData, "loader data ");
      if (loaderData?.success) {
        patchUser({
          github: {
            ...user.github,
            Connected: true,
            Username: loaderData.username,
          },
        });
        showSuccess("GitHub connected 🚀");
      } else if (loaderData?.error) {
        showError(loaderData.error);
      }
    }
  }, [
    patchUser,
    loaderData,
    searchParams,
    user?.github,
    showError,
    showSuccess,
  ]);
  console.log("looping");
  useEffect(() => {
    if (user) {
      setName(user.name);
      email.current = user.email;
      setCharData(user.charData);
    }
  }, [user]);

  const addCharField = () => setCharData((prev) => [...prev, "New Trait"]);

  const handleCharChange = (index, value) => {
    const newCharData = [...charData];
    newCharData[index] = value;
    setCharData(newCharData);
  };

  const removeCharField = (index) =>
    setCharData((prev) => prev.filter((_, i) => i !== index));

  const handleSave = async () => {
    const mail = email.current;
    const updatedUser = { name, mail, charData };
    const id = showLoading("Please wait...");

    try {
      const result = await updateUser(updatedUser);
      if (result.success) {
        updateToast(id, {
          render: "User updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
      } else {
        updateToast(id, {
          render: `Failed to update user. ${result.error}`,
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    } catch (error) {
      updateToast(id, {
        render: `Something went wrong: ${error.message}`,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-start overflow-hidden bg-gray-900">
      <div className="fixed inset-0 top-0 left-0">
        <img
          src="/images.jpg"
          alt="Cursed Scroll Background"
          className="h-full w-full object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 mt-10 w-[90%] max-w-xl rounded-2xl border border-yellow-500/30 bg-gray-800/80 p-6 shadow-lg backdrop-blur-lg">
        <Link
          to="/"
          className="absolute top-4 left-4 text-sm font-bold text-white transition-all hover:text-yellow-600"
        >
          {`<- Back`}
        </Link>
        <h1 className="text-center text-3xl font-bold text-white">
          📝 Update Character
        </h1>
        <p className="mt-2 text-center text-white">
          Modify your details and character description.
        </p>

        {/* Name Field */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-yellow-500/40 bg-gray-900/60 p-2 text-white"
          />
        </div>

        {/* Email Field */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-white">Email</label>
          <input
            type="email"
            value={email.current}
            disabled
            className="mt-1 w-full cursor-not-allowed rounded-lg border border-gray-600 bg-gray-900/60 p-2 text-gray-400"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-white">GitHub</label>
          <input
            type="text"
            value={
              user?.github?.Connected ? user.github.Username : "Not Connected"
            }
            disabled
            className="mt-1 w-full cursor-not-allowed rounded-lg border border-gray-600 bg-gray-900/60 p-2 text-gray-400"
          />
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-white">
            Character Traits
          </label>
          {charData.map((trait, index) => (
            <div key={index} className="mt-2 flex items-center">
              <input
                type="text"
                value={trait}
                onChange={(e) => handleCharChange(index, e.target.value)}
                className="w-full rounded-lg border border-yellow-500/40 bg-gray-900/60 p-2 text-white"
              />
              <button
                onClick={() => removeCharField(index)}
                className="ml-2 text-red-400 hover:text-red-500"
              >
                ✖
              </button>
            </div>
          ))}

          <button
            onClick={addCharField}
            className="mt-4 w-full rounded-lg border border-yellow-500/40 bg-yellow-600 px-4 py-2 font-bold text-white transition-all hover:bg-yellow-700"
          >
            + Add More
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 w-full rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition-all hover:bg-green-700"
        >
          Save Changes
        </button>
        {!user?.github?.Connected && (
          <a
            href="https://github.com/apps/ooh-curses/installations/new"
            className="mt-4 block w-full rounded-lg border border-blue-500 bg-blue-600 px-4 py-2 text-center font-bold text-white transition-all hover:bg-blue-700"
          >
            🔗 Connect GitHub
          </a>
        )}
      </div>
    </div>
  );
}

export default Character;
