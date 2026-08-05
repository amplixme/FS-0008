import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/user.service";
import Spinner from "../components/common/Spinner";
import Alert from "../components/ui/Alert";

function User() {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatarUrl: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProfile(id);
        setProfile(data);
        setFormData({
          name: data.name,
          bio: data.bio || "",
          avatarUrl: data.avatarUrl || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const updatedProfile = await updateProfile({
        name: formData.name,
        bio: formData.bio || undefined,
        avatarUrl: formData.avatarUrl || undefined,
      });

      setProfile((currentProfile) => ({
        ...currentProfile,
        ...updatedProfile,
      }));

      setFormData({
        name: updatedProfile.name,
        bio: updatedProfile.bio || "",
        avatarUrl: updatedProfile.avatarUrl || "",
      });

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-28">
        <Spinner icon="progress_activity" message="Cargando perfil..." />
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
    
  const handleCancelEdit = () => {
    setFormData({
      name: profile.name,
      bio: profile.bio || "",
      avatarUrl: profile.avatarUrl || "",
    });

    setIsEditing(false);
  };

  const posts = profile.posts ?? [];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <section className="bg-surface-container-lowest rounded-2xl p-8 mb-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={profile.avatarUrl || "https://placehold.co/160x160"}
            alt={`Avatar de ${profile.name}`}
            className="w-32 h-32 rounded-full object-cover bg-surface-container"
          />

          <div className="flex-1">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-on-surface">Nombre</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-on-surface">Biografía</span>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows="3"
                    className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-on-surface">
                    URL del avatar
                  </span>
                  <input
                    type="url"
                    name="avatarUrl"
                    value={formData.avatarUrl}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
                  />
                </label>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-primary text-on-primary font-bold rounded-full disabled:opacity-60"
                  >
                    {isSaving ? "Guardando..." : "Guardar cambios"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-5 py-2 border border-outline rounded-full font-bold"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h1 className="text-3xl font-extrabold text-on-surface">
                    {profile.name}
                  </h1>

                  {isOwnProfile && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-2 bg-primary text-on-primary font-bold rounded-full"
                    >
                      Editar perfil
                    </button>
                  )}
                </div>

                <p className="text-on-surface-variant mt-4">
                  {profile.bio || "Este usuario todavía no agregó una biografía."}
                </p>
              </>
            )}

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