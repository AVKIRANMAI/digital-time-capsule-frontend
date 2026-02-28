import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ViewCapsule() {
  const { id } = useParams();

  const [capsule, setCapsule] = useState(null);
  const [secret, setSecret] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const fetchCapsule = async () => {
      const res = await API.get("/capsules");
      const found = res.data.find(
        (c) => c.id.toString() === id
      );

      setCapsule(found);

      if (found && !found.is_locked) {
        const secretRes = await API.get(
          `/capsules/secret/${id}`
        );
        setSecret(secretRes.data);
      }
    };

    fetchCapsule();
  }, [id]);

  // 🔥 Countdown Timer Logic
  useEffect(() => {
    if (!capsule) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const unlockTime = new Date(
        capsule.unlock_date
      ).getTime();

      const distance = unlockTime - now;

      if (distance <= 0) {
        setTimeLeft("Unlocked 🎉");
        clearInterval(interval);
        window.location.reload(); // auto refresh when unlocked
        return;
      }

      const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
          (1000 * 60)
      );
      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setTimeLeft(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [capsule]);

  if (!capsule) return null;

  const isLocked =
    capsule.is_locked &&
    new Date(capsule.unlock_date) > new Date();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-6">
          {capsule.title}
        </h1>

        {/* Image */}
        {capsule.media?.length > 0 && (
          <div className="mb-6 rounded-xl overflow-hidden">
            <img
              src={capsule.media[0].file_url}
              alt="Capsule"
              className={`w-full h-[400px] object-cover ${
                isLocked ? "blur-xl" : ""
              }`}
            />
          </div>
        )}

        {!isLocked ? (
          <>
            <div className="bg-gray-900 p-6 rounded mb-6">
              {capsule.message}
            </div>

            {secret && (
              <div>
                {!showSecret ? (
                  <button
                    onClick={() =>
                      setShowSecret(true)
                    }
                    className="bg-purple-600 px-4 py-2 rounded"
                  >
                    Reveal Secret 🔐
                  </button>
                ) : (
                  <div className="bg-purple-900/40 p-6 rounded mt-4">
                    {secret.secret_text}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <p className="text-yellow-400 text-lg mb-4">
              🔒 This capsule is still locked.
            </p>

            {/* 🔥 Countdown UI */}
            <div className="bg-gray-900 p-6 rounded-xl text-2xl font-semibold tracking-wide">
              {timeLeft}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewCapsule;