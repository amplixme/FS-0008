import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import Spinner from "../components/common/Spinner";
import Alert from "../components/ui/Alert";
import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/user.service";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

function User() {
  const { id } = useParams();
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProfile() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProfile(id);

        if (isMounted) {
          setProfile(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28">
        <Spinner icon={ProgressActivityIcon} message="Cargando perfil..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 max-w-7xl mx-auto px-6">
        <Alert type="error" message={error} />
      </div>
    );
  }

  const isOwnProfile = Number(user?.id) === Number(profile?.id);

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const posts = profile.posts ?? [];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      {successMessage && (
        <div className="mb-6">
          <Alert type="success" message={successMessage} />
        </div>
      )}
      <section className="bg-surface-container-lowest rounded-2xl p-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={profile.avatarUrl || "https://placehold.co/160x160"}
            alt={`Avatar de ${profile.name}`}
            className="w-32 h-32 rounded-full object-cover bg-surface-container"
          />

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-extrabold text-on-surface">
                {profile.name}
              </h1>

              {isOwnProfile && (
                <Link
                  to="/perfil/editar"
                  className="px-5 py-2 bg-primary text-on-primary font-bold rounded-full"
                >
                  Editar perfil
                </Link>
              )}
            </div>

            <p className="text-on-surface-variant mt-4">
              {profile.bio || "Este usuario todavía no agregó una biografía."}
            </p>

            <p className="text-sm text-outline mt-4">
              Miembro desde {memberSince}
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-on-surface mb-6">
          Posts de {profile.name} ({profile.postsCount})
        </h2>

        {posts.length === 0 ? (
          <p className="text-on-surface-variant">
            Este usuario todavía no publicó posts.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <article className="h-full bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={post.coverImage || "https://placehold.co/600x400"}
                    alt={`Portada de ${post.title}`}
                    className="w-full aspect-[16/9] object-cover"
                  />

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-on-surface line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-on-surface-variant mt-3 line-clamp-3">
                      {post.content}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default User;
