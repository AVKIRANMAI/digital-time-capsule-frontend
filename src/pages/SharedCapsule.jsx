import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Lock, ArrowLeft } from "lucide-react";

function SharedCapsule() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCapsule();
  }, []);

  const fetchCapsule = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/share/${token}`
      );

      const data = await res.json();
      setCapsule(data);
    } catch (err) {
      alert("Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading capsule...
      </div>
    );
  }

  if (!capsule) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Capsule not found
      </div>
    );
  }

  const isLocked =
    new Date(capsule.unlockDate) > new Date();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Header */}
      <header className="border-b border-gray-800 p-4 flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="hover:text-yellow-400"
        >
          <ArrowLeft />
        </button>
        <h1 className="font-serif text-xl flex items-center gap-2">
          <Clock className="text-yellow-400" />
          Shared Capsule
        </h1>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-lg w-full shadow-xl">

          <h2 className="text-2xl font-serif font-bold mb-4">
            {capsule.title}
          </h2>

          {isLocked ? (
            <div className="flex items-center gap-2 text-yellow-400">
              <Lock className="w-4" />
              <span>
                This capsule is sealed until{" "}
                {new Date(
                  capsule.unlockDate
                ).toLocaleDateString()}
              </span>
            </div>
          ) : (
            <>
              <p className="mb-6 text-gray-300">
                {capsule.message}
              </p>

              {/* Media Preview */}
              {capsule.mediaUrl && (
                <div>
                  {capsule.mediaUrl.endsWith(".mp4") ? (
                    <video
                      src={capsule.mediaUrl}
                      controls
                      className="rounded-xl"
                    />
                  ) : (
                    <img
                      src={capsule.mediaUrl}
                      alt="media"
                      className="rounded-xl"
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default SharedCapsule;